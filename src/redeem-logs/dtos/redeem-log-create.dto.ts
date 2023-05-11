import { IsOptional } from 'class-validator';

export class RedeemLogCreateDTO {
  public codeInput: string;

  public success: boolean;

  @IsOptional()
  public userId?: number;

  @IsOptional()
  public ticketId?: number;
}
