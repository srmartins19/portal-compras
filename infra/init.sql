-- BidFlow — PostgreSQL initialization
-- Runs once when the postgres container starts for the first time.
-- Prisma migrations handle the actual schema — this just sets up extensions and roles.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- for fast ILIKE search
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- for accent-insensitive search

-- Create app role with limited privileges (principle of least privilege)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'bidflow_app') THEN
    CREATE ROLE bidflow_app WITH LOGIN PASSWORD 'bidflow_app_pass';
  END IF;
END
$$;

-- Grant connect
GRANT CONNECT ON DATABASE bidflow_db TO bidflow_app;
GRANT USAGE ON SCHEMA public TO bidflow_app;

-- Will be granted after Prisma creates tables:
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO bidflow_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO bidflow_app;

-- Useful index hint: Prisma will create compound indexes but we add full-text helpers
-- (run after migration):
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_rfqs_title_trgm ON rfqs USING gin(title gin_trgm_ops);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_suppliers_name_trgm ON suppliers USING gin(name gin_trgm_ops);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_items_name_trgm ON items USING gin(name gin_trgm_ops);
