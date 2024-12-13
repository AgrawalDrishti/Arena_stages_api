import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './like.entity';
import { Stage } from '../stages/stage.entity';  // Import the Stage entity

@Module({
  imports: [TypeOrmModule.forFeature([Like, Stage])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
