import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,CreateDateColumn } from 'typeorm';
import { Stage } from '../stages/stage.entity'; // Assuming you're using Stage entity for relationship

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({ nullable: true }) // Nullable for top-level comments
  parentCommentId: string;

  @Column()
  content: string; // The actual content of the comment

  @ManyToOne(() => Stage, (stage) => stage.comments, { onDelete: 'CASCADE' })
  stage: Stage;

  @Column()
  user_id: string; // The user who created the comment

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; // The timestamp when the comment was created
}
