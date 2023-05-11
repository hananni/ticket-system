import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './ticket.model';
import { TicketDTO } from './dtos/ticket.dto';
import { RedeemTicketDTO } from './dtos/redeem-ticket.dto';
import { UsersService } from '../users/users.service';
import { RedeemLogsService } from '../redeem-logs/redeem-logs.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
    private usersService: UsersService,
    private redeemLogsService: RedeemLogsService,
  ) {}

  findByCode(code: string): Promise<Ticket> {
    return this.ticketModel.findOne({
      where: {
        code,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.findAll();
  }

  async createTicket(ticket: TicketDTO): Promise<Ticket> {
    const hasTicket = await this.findByCode(ticket.code);

    if (hasTicket) {
      throw new BadRequestException('Ticket code already exists');
    }
    return this.ticketModel.create(ticket);
  }

  async redeemTicket(redeemTicketDTO: RedeemTicketDTO): Promise<boolean> {
    const ticket = await this.findByCode(redeemTicketDTO.code);

    if (!ticket || !ticket.isActive) {
      await this.redeemLogsService.create({
        codeInput: redeemTicketDTO.code,
        success: false,
      });

      throw new NotFoundException('Ticket code not available');
    }

    const user = await this.usersService.findById(redeemTicketDTO.userId);

    if (!user) {
      await this.redeemLogsService.create({
        codeInput: redeemTicketDTO.code,
        ticketId: ticket.id,
        success: false,
      });

      throw new NotFoundException('User not found');
    }

    await this.redeemLogsService.create({
      codeInput: redeemTicketDTO.code,
      ticketId: ticket.id,
      userId: user.id,
      success: true,
    });

    return !!ticket;
  }
}
