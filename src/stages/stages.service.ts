import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './stage.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stagesRepository: Repository<Stage>,
  ) {}

  async scheduleStage(stage_name: string, scheduled_time: Date, host_user_id: string) {
    const stage = this.stagesRepository.create({
      stage_name,
      scheduled_time,
      host_user_id,
    });
    return this.stagesRepository.save(stage);
  }

  async getScheduledStages(host_user_id: string, limit: number, offset: number) {
    const [results, count] = await this.stagesRepository.findAndCount({
      where: { host_user_id },
      take: limit,
      skip: offset,
      order: { scheduled_time: 'ASC' },
    });
    return { count, results };
  }
}
