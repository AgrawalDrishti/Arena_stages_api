import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Stage } from '../stages/stage.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    @InjectRepository(Stage)
    private readonly stagesRepository: Repository<Stage>,
  ) {}

  // Add a like to a stage
  async addLike(stageId: string, userId: string): Promise<Like> {
    const stage = await this.stagesRepository.findOne({ where: { stage_id: stageId } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    const existingLike = await this.likesRepository.findOne({
      where: { stage: { stage_id: stageId }, user_id: userId },
    });

    if (existingLike) {
      throw new Error('You have already liked this stage');
    }

    const like = this.likesRepository.create({
      stage,
      user_id: userId,
    });

    return this.likesRepository.save(like);
  }

  // Get the total number of likes for a stage
  async getLikesForStage(stageId: string): Promise<number> {
    const stage = await this.stagesRepository.findOne({ where: { stage_id: stageId } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    const likes = await this.likesRepository.count({
      where: { stage: { stage_id: stageId } },
    });

    return likes;
  }
}
