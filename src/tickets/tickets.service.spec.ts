import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { RedeemTicketDTO } from './dtos/redeem-ticket.dto';
import { UsersService } from '../users/users.service';
import { RedeemLogsService } from '../redeem-logs/redeem-logs.service';
import { Ticket } from './ticket.model';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { RedeemLog } from '../redeem-logs/redeem-log.model';
import { TicketDTO } from './dtos/ticket.dto';

describe('TicketsService', () => {
  let ticketsService: TicketsService;
  let usersService: UsersService;
  let redeemLogsService: RedeemLogsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TicketsService,
        UsersService,
        RedeemLogsService,
        {
          provide: getModelToken(Ticket),
          useFactory: () => ({}),
        },
        {
          provide: getModelToken(User),
          useFactory: () => ({}),
        },
        {
          provide: getModelToken(RedeemLog),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    ticketsService = moduleRef.get<TicketsService>(TicketsService);
    usersService = moduleRef.get<UsersService>(UsersService);
    redeemLogsService = moduleRef.get<RedeemLogsService>(RedeemLogsService);
  });

  describe('createTicket', () => {
    it('should throw BadRequestException if ticket code already exists', async () => {
      const ticketDTO: TicketDTO = {
        code: 'code',
      };

      jest.spyOn(ticketsService, 'findByCode').mockResolvedValue({
        code: 'code',
      } as Ticket);

      await expect(ticketsService.createTicket(ticketDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('redeemTicket', () => {
    it('should throw NotFoundException if ticket is not found', async () => {
      const redeemTicketDTO: RedeemTicketDTO = {
        code: 'invalidCode',
        userId: 1,
      };

      jest.spyOn(ticketsService, 'findByCode').mockResolvedValue(null);

      jest.spyOn(redeemLogsService, 'create').mockResolvedValue(null);

      await expect(
        ticketsService.redeemTicket(redeemTicketDTO),
      ).rejects.toThrow(NotFoundException);

      expect(redeemLogsService.create).toHaveBeenCalledWith({
        codeInput: 'invalidCode',
        success: false,
      });
    });

    it('should throw NotFoundException if ticket is inactive', async () => {
      const redeemTicketDTO: RedeemTicketDTO = {
        code: 'validCode',
        userId: 1,
      };

      jest
        .spyOn(ticketsService, 'findByCode')
        .mockResolvedValue({ isActive: false } as Ticket);

      jest.spyOn(redeemLogsService, 'create').mockResolvedValue(null);

      await expect(
        ticketsService.redeemTicket(redeemTicketDTO),
      ).rejects.toThrow(NotFoundException);

      expect(redeemLogsService.create).toHaveBeenCalledWith({
        codeInput: 'validCode',
        success: false,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const redeemTicketDTO: RedeemTicketDTO = {
        code: 'validCode',
        userId: 1,
      };

      const ticket = { id: 1, isActive: true };
      jest
        .spyOn(ticketsService, 'findByCode')
        .mockResolvedValue(ticket as Ticket);
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);
      jest.spyOn(redeemLogsService, 'create').mockResolvedValue(null);

      await expect(
        ticketsService.redeemTicket(redeemTicketDTO),
      ).rejects.toThrow(NotFoundException);

      expect(redeemLogsService.create).toHaveBeenCalledWith({
        codeInput: 'validCode',
        ticketId: 1,
        success: false,
      });
    });

    it('should create redeem log with success and return true if ticket and user are valid', async () => {
      const redeemTicketDTO: RedeemTicketDTO = {
        code: 'validCode',
        userId: 1,
      };

      const ticket = { id: 1, isActive: true };
      const user = { id: 1 };

      jest
        .spyOn(ticketsService, 'findByCode')
        .mockResolvedValue(ticket as Ticket);
      jest.spyOn(usersService, 'findById').mockResolvedValue(user as User);
      jest.spyOn(redeemLogsService, 'create').mockResolvedValue(null);

      const redeemLogsCreateSpy = jest.spyOn(redeemLogsService, 'create');

      const result = await ticketsService.redeemTicket(redeemTicketDTO);

      expect(redeemLogsCreateSpy).toHaveBeenCalledWith({
        codeInput: 'validCode',
        ticketId: 1,
        userId: 1,
        success: true,
      });

      expect(result).toBe(true);
    });
  });
});
