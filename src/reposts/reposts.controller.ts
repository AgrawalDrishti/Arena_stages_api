import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { RepostsService } from './reposts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // Protect routes with JWT authentication

@Controller('reposts')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class RepostsController {
  constructor(private readonly repostsService: RepostsService) {}

  // Repost a stage
  @Post('stage/:stageId')
  async repost(
    @Param('stageId') stageId: string,   // Get stageId from URL
    @Request() req: any,                  // Get current user's ID from JWT
  ) {
    const userId = req.user.userId;  // Extract userId from JWT payload
    return this.repostsService.repostStage(stageId, userId);
  }

  // Get the total number of reposts for a stage
  @Get('stage/:stageId')
  async getReposts(@Param('stageId') stageId: string) {
    return this.repostsService.getRepostsForStage(stageId);
  }
}
