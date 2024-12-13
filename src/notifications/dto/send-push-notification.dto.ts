import { IsString, IsUUID, IsIn } from 'class-validator';

export class SendPushNotificationDto {
  @IsUUID()
  stage_id: string;

  @IsString()
  @IsIn(['scheduled', 'live'])
  event_type: string;

  @IsString()
  message: string;
}
