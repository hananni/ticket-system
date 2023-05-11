import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Ticket } from '../tickets/ticket.model';
import { User } from '../users/user.model';

@Table
export class RedeemLog extends Model<RedeemLog> {
  @Column
  codeInput: string;

  @Column
  success: boolean;

  @Column('userId')
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column('ticketId')
  @ForeignKey(() => Ticket)
  ticketId: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;
}
