import { Controller, Post, Body, Get, Param, UseGuards, Request, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto'; // Create DTO for input validation

@Controller('comments')
@UseGuards(JwtAuthGuard) // Protect routes with JWT authentication
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a new comment
  @Post('stage/:stageId')
  async addComment(
    @Param('stageId') stageId: string,
    @Body() body: CreateCommentDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId; // Get the user ID from JWT
    return this.commentsService.createComment(
      stageId,
      userId,
      body.content,
      body.parentCommentId, // Accept parentCommentId from the request body
    );
  }

  // Get all comments for a stage
  @Get('stage/:stageId')
  async getComments(@Param('stageId') stageId: string) {
    return this.commentsService.getCommentsForStage(stageId);
  }

  @Get('stage/:stageId/expand')
  async getPaginatedChildComments(
    @Param('stageId') stageId: string,
    @Query('parent_comment_id') parentCommentId: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const result = await this.commentsService.getPaginatedChildComments(
      parentCommentId,
      Number(limit),
      Number(offset),
    );

    const nextOffset = Number(offset) + Number(limit) < result.totalComments ? Number(offset) + Number(limit) : null;
    const previousOffset = Number(offset) - Number(limit) >= 0 ? Number(offset) - Number(limit) : null;

    return {
      parent_comment: result.parentComment,
      total_comments: result.totalComments,
      comments: result.comments,
      next_offset: nextOffset,
      previous_offset: previousOffset,
    };
  }


  @Get(':parentCommentId')
  async getParentComment(@Param('parentCommentId') parentCommentId: string) {
    return this.commentsService.getParentComment(parentCommentId);
  }

  @Get('stage/:stageId/count')
  async getCommentCount(@Param('stageId') stageId: string) {
    const totalComments = await this.commentsService.getCommentCountForStage(stageId);
    return {
      stageId,
      totalComments,
    };
  }


}
