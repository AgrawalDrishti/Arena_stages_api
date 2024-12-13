import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { Stage } from './stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  providers: [StagesService],
  controllers: [StagesController],
  exports: [TypeOrmModule],
})
export class StagesModule {}
