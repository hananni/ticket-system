import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketDTO } from './dtos/ticket.dto';
import { RedeemTicketDTO } from './dtos/redeem-ticket.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Res() response, @Body() ticket: TicketDTO) {
    const newTicket = await this.ticketsService.createTicket(ticket);
    return response.status(HttpStatus.CREATED).json(newTicket);
  }

  @Post('/redeem')
  //Rate limiting the endpoint, each user (origin request) can try 10 redemptions in 1 hour
  @Throttle(10, 3600)
  async redeemTicket(@Body() ticket: RedeemTicketDTO) {
    return await this.ticketsService.redeemTicket(ticket);
  }
}
