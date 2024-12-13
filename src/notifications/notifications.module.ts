import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notification.entity';
import { StagesModule } from '../stages/stages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    StagesModule, // Import StagesModule to access Stage repository
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
