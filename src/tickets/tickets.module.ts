import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './ticket.model';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { UsersModule } from '../users/users.module';
import { RedeemLogsModule } from '../redeem-logs/redeem-logs.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Ticket]),
    UsersModule,
    RedeemLogsModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
