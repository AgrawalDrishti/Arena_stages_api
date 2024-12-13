import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repost } from './repost.entity';
import { Stage } from '../stages/stage.entity';

@Injectable()
export class RepostsService {
  constructor(
    @InjectRepository(Repost)
    private readonly repostsRepository: Repository<Repost>,
    @InjectRepository(Stage)
    private readonly stagesRepository: Repository<Stage>,
  ) {}

  // Repost a stage
  async repostStage(stageId: string, userId: string): Promise<Repost> {
    const stage = await this.stagesRepository.findOne({ where: { stage_id: stageId } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    const existingRepost = await this.repostsRepository.findOne({
      where: { stage: { stage_id: stageId }, user_id: userId },
    });

    if (existingRepost) {
      throw new Error('You have already reposted this stage');
    }

    const repost = this.repostsRepository.create({
      stage,
      user_id: userId,
    });

    return this.repostsRepository.save(repost);
  }

  // Get the total number of reposts for a stage
  async getRepostsForStage(stageId: string): Promise<number> {
    const stage = await this.stagesRepository.findOne({ where: { stage_id: stageId } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    const reposts = await this.repostsRepository.count({
      where: { stage: { stage_id: stageId } },
    });

    return reposts;
  }
}
