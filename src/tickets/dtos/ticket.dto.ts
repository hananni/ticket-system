import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TicketDTO {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public code: string;
}
