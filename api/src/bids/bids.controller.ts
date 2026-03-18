import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, CurrentUser, CompanyId } from '../common/decorators';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@ApiTags('bids')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rfqs/:rfqId/bids')
export class BidsController {
  constructor(private readonly bids: BidsService) {}

  @Post()
  @Roles('SUPPLIER')
  @ApiOperation({ summary: 'Submit bid (supplier)' })
  submit(@CurrentUser() user: { id: string; companyId: string }, @Param('rfqId') rfqId: string, @Body() dto: CreateBidDto) {
    return this.bids.submit(user.id, user.companyId, rfqId, dto);
  }

  @Get()
  @Roles('ADMIN', 'BUYER', 'APPROVER')
  @ApiOperation({ summary: 'Get bids for RFQ' })
  findByRfq(@CompanyId() companyId: string, @Param('rfqId') rfqId: string) {
    return this.bids.findByRfq(companyId, rfqId);
  }
}
