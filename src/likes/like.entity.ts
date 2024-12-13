import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stage } from '../stages/stage.entity'; 

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  like_id: string;

  @ManyToOne(() => Stage, (stage) => stage.likes)
  stage: Stage; 

  @Column()
  user_id: string; // The user who liked the stage

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; 
}
