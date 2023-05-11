import { IsDefined } from 'class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RedeemTicketDTO {
  @IsString()
  @IsNotEmpty()
  public code: string;

  @IsNumber()
  @IsDefined()
  public userId: number;
}
