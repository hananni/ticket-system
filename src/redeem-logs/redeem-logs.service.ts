import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RedeemLog } from './redeem-log.model';
import { RedeemLogDTO } from './dtos/redeem-log.dto';
import { RedeemLogCreateDTO } from './dtos/redeem-log-create.dto';

@Injectable()
export class RedeemLogsService {
  constructor(
    @InjectModel(RedeemLog)
    private redeemLogModel: typeof RedeemLog,
  ) {}

  async findAll(): Promise<RedeemLogDTO[]> {
    return this.redeemLogModel.findAll();
  }

  async create(redeemLog: RedeemLogCreateDTO): Promise<RedeemLog> {
    return this.redeemLogModel.create(redeemLog);
  }
}
