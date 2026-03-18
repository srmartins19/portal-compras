# BidFlow — Operations Runbook

## Quick Reference

| Service          | Port | Health Check URL                                |
|------------------|------|-------------------------------------------------|
| API              | 4000 | `GET /api/v1/billing/plans`                     |
| Buyer Portal     | 3000 | `GET /`                                         |
| Supplier Portal  | 3001 | `GET /`                                         |
| PostgreSQL       | 5432 | `pg_isready -U bidflow -d bidflow_db`           |
| Redis            | 6379 | `redis-cli ping`                                |

---

## Common Operations

### Start everything locally
```bash
cd infra && docker-compose up -d
npm run dev
```

### Check container health
```bash
docker-compose ps
docker-compose logs api --tail=50 -f
```

### Run database migrations
```bash
# Development
npm run db:migrate

# Production (safe — no data loss)
npm run db:migrate:prod
```

### Reset development database
```bash
cd packages/database
npx prisma migrate reset --force   # drops + recreates + seeds
```

### Open Prisma Studio
```bash
npm run db:studio   # → http://localhost:5555
```

---

## Debugging

### API not starting
1. Check `DATABASE_URL` is correct: `psql $DATABASE_URL -c "SELECT 1"`
2. Check migrations ran: `npx prisma migrate status`
3. Check port 4000 is free: `lsof -i :4000`
4. View logs: `docker logs bidflow_api -f`

### JWT auth failing
- Verify `JWT_SECRET` matches between api `.env` and token issuer
- Check token expiry: decode at jwt.io
- Confirm `Authorization: Bearer <token>` header is set

### Database connection pool exhausted
```bash
# Check active connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';"
# Add to DATABASE_URL: ?connection_limit=10&pool_timeout=20
```

### Supplier can't login to portal
1. Confirm `portalAccess = true` in database
2. Confirm `passwordHash` is set (enablePortal was true at creation)
3. Check supplier email matches exactly
4. Reset password via Prisma Studio if needed

---

## Monitoring

### Key metrics to watch
- API response time P95 > 500ms → investigate slow queries
- Error rate > 1% → check logs for 5xx errors
- DB connection count > 80% of max → scale connection pool
- Disk usage > 80% → clean old audit logs or expand storage

### Log format
```
[HTTP] POST /api/v1/rfqs → 201 [142ms]
[HTTP] GET  /api/v1/rfqs → 200 [38ms]
[ERROR] [AllExceptionsFilter] 500 POST /api/v1/rfqs
```

### Useful queries
```sql
-- Audit log last 24h
SELECT action, entity_type, created_at, user_id
FROM audit_logs
WHERE created_at > now() - interval '24 hours'
ORDER BY created_at DESC LIMIT 100;

-- Top companies by RFQ count
SELECT c.name, count(r.id) as rfq_count
FROM companies c
LEFT JOIN rfqs r ON r.company_id = c.id
GROUP BY c.id, c.name
ORDER BY rfq_count DESC;

-- Supplier performance summary
SELECT s.name, sp.overall_score, sp.total_orders
FROM suppliers s
JOIN supplier_performance sp ON sp.supplier_id = s.id
ORDER BY sp.overall_score DESC;
```

---

## Disaster Recovery

### Database backup
```bash
# Manual backup
docker exec bidflow_postgres pg_dump -U bidflow bidflow_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
docker exec -i bidflow_postgres psql -U bidflow bidflow_db < backup_20240101_120000.sql
```

### Roll back a deployment
```bash
# API: redeploy previous image
railway rollback --service bidflow-api

# Frontend: revert in Vercel dashboard → Deployments → previous → Promote to Production
```

### Emergency: disable supplier portal
```sql
-- Block all supplier logins
UPDATE suppliers SET portal_access = false WHERE company_id = 'COMPANY_ID';
```

---

## Maintenance Windows

### Before maintenance
1. Put up maintenance page (update nginx.conf)
2. Notify users via email (use EmailService)
3. Take DB snapshot

### Database migration checklist
- [ ] Run `npx prisma migrate status` — confirm no drift
- [ ] Test migration on staging first
- [ ] Take backup before deploying
- [ ] Run `npx prisma migrate deploy` (not `migrate dev`)
- [ ] Verify application startup after migration

### After maintenance
1. Remove maintenance page
2. Verify health checks pass
3. Check error rates in first 5 minutes
4. Notify users via email

---

## Security Incidents

### Suspected compromised JWT secret
```bash
# 1. Immediately rotate JWT_SECRET in production env
# 2. Restart API — all existing tokens instantly invalid
# 3. Users will need to re-login — this is expected
# 4. Audit: check audit_logs for suspicious activity
```

### Rate limiting (Throttler)
Current limit: 100 requests / 60 seconds per IP.
To tighten: update `ThrottlerModule.forRoot` in `app.module.ts`.

### CORS violations
Check `CORS_ORIGINS` env var includes all legitimate frontend origins.
