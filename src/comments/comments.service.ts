import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Stage } from '../stages/stage.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Stage)
    private readonly stagesRepository: Repository<Stage>,
  ) {}

  // Add a new comment
  async createComment(stageId: string, userId: string, content: string , parentCommentId?: string,): Promise<Comment> {
    const stage = await this.stagesRepository.findOne({ where: { stage_id: stageId } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    const comment = this.commentsRepository.create({
      content,
      stage,
      user_id: userId, // From JWT or current user
      parentCommentId: parentCommentId || null,
    });

    return this.commentsRepository.save(comment);
  }

  // Get comments for a specific stage
  async getCommentsForStage(stageId: string): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { stage: { stage_id: stageId } }, relations: ['stage'] });
  }

  async getPaginatedChildComments(
    parentCommentId: string,
    limit: number,
    offset: number,
  ): Promise<{ parentComment: Comment; totalComments: number; comments: Comment[] }> {
    const parentComment = await this.commentsRepository.findOne({ where: { comment_id: parentCommentId } });
  
    const [comments, totalComments] = await this.commentsRepository.findAndCount({
      where: { parentCommentId },
      order: { created_at: 'ASC' },
      skip: offset,
      take: limit,
    });
  
    return { parentComment, totalComments, comments };
  }
  

  async getParentComment(parentCommentId: string): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { comment_id: parentCommentId },
    });
  }

  async getCommentCountForStage(stageId: string): Promise<number> {
    // Count comments associated with the given stage
    const count = await this.commentsRepository.count({
      where: { stage: { stage_id: stageId } },
    });
    return count;
  }
  
  
}
