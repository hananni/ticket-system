import { TicketDTO } from '../../tickets/dtos/ticket.dto';
import { UserDTO } from '../../users/dtos/user.dto';

export class RedeemLogDTO {
  public codeInput: string;

  public success: boolean;

  public user: UserDTO;

  public ticket: TicketDTO;
}
