import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { v4 as uuidv4 } from 'uuid';
import { SendPushNotificationDto } from './dto/send-push-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('register')
  async registerDevice(@Body() registerDeviceDto: RegisterDeviceDto) {
    if (!registerDeviceDto.deviceToken) {
      registerDeviceDto.deviceToken = uuidv4();
      console.log('Generated deviceToken:', registerDeviceDto.deviceToken);
    }

    return this.notificationsService.registerDevice(registerDeviceDto);
  }

  @Post('send')
  async sendPushNotification(@Body() sendPushNotificationDto: SendPushNotificationDto) {
    return this.notificationsService.sendPushNotification(sendPushNotificationDto);
  }
}
