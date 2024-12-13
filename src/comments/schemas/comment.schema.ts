import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: String, ref: 'Stage' })
  stageId: string;

  @Prop({ type: String, ref: 'Comment', default: null })
  parentCommentId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
