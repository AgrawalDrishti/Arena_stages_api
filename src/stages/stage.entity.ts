import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity'; 
import { Like } from '../likes/like.entity';
import { Repost } from '../reposts/repost.entity';
import { Notification } from '../notifications/notification.entity'; 

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  stage_id: string;

  @Column()
  stage_name: string;

  @Column()
  host_user_id: string;

  @Column({ type: 'timestamp' })
  scheduled_time: Date;

  @Column({ default: 'scheduled' })
  status: string;

  @OneToMany(() => Comment, (comment) => comment.stage)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.stage)
  likes: Like[];
  
  @OneToMany(() => Repost, (repost) => repost.stage)
  reposts: Repost[];

  @OneToMany(() => Notification, (notification) => notification.stage)
  notifications: Notification[];
}
