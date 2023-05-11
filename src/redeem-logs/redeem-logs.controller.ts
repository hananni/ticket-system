import { Controller, Get } from '@nestjs/common';
import { RedeemLogsService } from './redeem-logs.service';

@Controller('/redeem-logs')
export class RedeemLogsController {
  constructor(private readonly redeemLogsService: RedeemLogsService) {}

  @Get()
  async findAll() {
    return await this.redeemLogsService.findAll();
  }
}
