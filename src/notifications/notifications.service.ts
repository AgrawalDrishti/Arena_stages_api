import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { Stage } from '../stages/stage.entity';
import { SendPushNotificationDto } from './dto/send-push-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  async registerDevice(registerDeviceDto: RegisterDeviceDto): Promise<{ message: string }> {
    const { deviceToken, stage_id } = registerDeviceDto;
  
    // Validate stage existence
    const stage = await this.stageRepository.findOne({ where: { stage_id } });
    if (!stage) {
      throw new NotFoundException('Stage not found.');
    }
  
    // Check if the device is already registered for this stage
    const existingToken = await this.notificationRepository.findOne({
      where: { deviceToken, stage },
    });
  
    if (existingToken) {
      throw new ConflictException('Device is already registered for notifications for this stage.');
    }
  
    // Register the device for the stage
    const notification = this.notificationRepository.create({ deviceToken, stage });
    await this.notificationRepository.save(notification);
  
    return { message: 'Device registered for notifications for the stage.' };
  }
  

  async sendPushNotification(sendPushNotificationDto: SendPushNotificationDto): Promise<{ message: string }> {
    const { stage_id, event_type, message } = sendPushNotificationDto;

    // Validate stage existence
    const stage = await this.stageRepository.findOne({ where: { stage_id }, relations: ['notifications'] });
    if (!stage) {
      throw new NotFoundException('Stage not found.');
    }

    // Fetch all registered device tokens for the stage
    const registeredTokens = await this.notificationRepository.find({ where: { stage } });
    if (registeredTokens.length === 0) {
      return { message: 'No registered devices to send notifications to.' };
    }

    registeredTokens.forEach((notification) => {
      console.log(`Sending push notification to token: ${notification.deviceToken}`);
      console.log(`Message: ${message}`);
    });

    return { message: `Push notifications sent to ${registeredTokens.length} devices.` };
  }
}
