import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stage } from '../stages/stage.entity';  // Assuming you're using Stage entity for relationship

@Entity('reposts')
export class Repost {
  @PrimaryGeneratedColumn('uuid')
  repost_id: string;

  @ManyToOne(() => Stage, (stage) => stage.reposts)
  stage: Stage;  // Associate this repost with a stage

  @Column()
  user_id: string;  // The user who reposted the stage

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;  // Timestamp when the repost was created
}
