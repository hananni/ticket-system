import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedeemLog } from './redeem-log.model';
import { RedeemLogsController } from './redeem-logs.controller';
import { RedeemLogsService } from './redeem-logs.service';

@Module({
  imports: [SequelizeModule.forFeature([RedeemLog])],
  providers: [RedeemLogsService],
  controllers: [RedeemLogsController],
  exports: [RedeemLogsService],
})
export class RedeemLogsModule {}
