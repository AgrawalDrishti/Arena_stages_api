import { Controller, Post, Get, Body, Query, Req, UseGuards } from '@nestjs/common';
import { StagesService } from './stages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('stages')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post('schedule')
  async scheduleStage(@Body() body: any, @Req() req: any) {
    const host_user_id = req.user.userId; // Extracted from JWT payload
    const { stage_name, time } = body;
    return this.stagesService.scheduleStage(stage_name, new Date(time), host_user_id);
  }

  @Get('upcoming')
  async getScheduledStages(
    @Query('host_user_id') host_user_id: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.stagesService.getScheduledStages(host_user_id, Number(limit), Number(offset));
  }
}
