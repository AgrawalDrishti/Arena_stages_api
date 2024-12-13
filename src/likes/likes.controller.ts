import { Controller, Post, Get, Param, UseGuards, Body, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Protect routes with JWT authentication
import { CreateLikeDto } from './dto/create-like.dto'; // Create DTO for input validation

@Controller('likes')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Add a like to a stage
  @Post('stage/:stageId')
  async addLike(
    @Param('stageId') stageId: string,     // Get stageId from URL
    @Request() req: any,                   // Get current user's ID from JWT
  ) {
    const userId = req.user.userId; // Extract userId from JWT payload
    return this.likesService.addLike(stageId, userId);
  }

  // Get the total number of likes for a stage
  @Get('stage/:stageId')
  async getLikes(@Param('stageId') stageId: string) {
    return this.likesService.getLikesForStage(stageId);
  }
}
