import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stage } from '../stages/stage.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  deviceToken: string;

  @ManyToOne(() => Stage, (stage) => stage.notifications, { onDelete: 'CASCADE' })
  stage: Stage;
}
