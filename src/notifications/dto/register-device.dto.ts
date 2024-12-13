import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @IsUUID()
  stage_id: string; // Add stage_id to link the device to a stage
}
