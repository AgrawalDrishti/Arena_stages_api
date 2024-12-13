import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepostsService } from './reposts.service';
import { RepostsController } from './reposts.controller';
import { Repost } from './repost.entity';
import { Stage } from '../stages/stage.entity';  // Import the Stage entity

@Module({
  imports: [TypeOrmModule.forFeature([Repost, Stage])],
  providers: [RepostsService],
  controllers: [RepostsController],
})
export class RepostsModule {}
