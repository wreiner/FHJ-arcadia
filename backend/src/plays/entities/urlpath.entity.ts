import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Play } from './play.entity';

@Entity()
export class Urlpath {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Play, (play) => play.urls)
  play: Play;

  @Column({ unique: true })
  path: string;

  @UpdateDateColumn()
  created_at: Date;
}
