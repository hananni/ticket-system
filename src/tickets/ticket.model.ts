import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Ticket extends Model<Ticket> {
  @Column
  name: string;

  @Column
  code: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
