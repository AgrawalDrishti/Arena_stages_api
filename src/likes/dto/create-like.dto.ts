import { IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  stageId: string; // The ID of the stage to like
}
