import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { Urlpath } from './urlpath.entity';

@Entity()
export class Play {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game)
  @JoinColumn()
  game: Game;

  @OneToMany(() => Urlpath, (urlpath) => urlpath.play, { cascade: true })
  urls: Urlpath[];

  @Column('jsonb')
  game_state: any;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(play: Partial<Play>) {
    Object.assign(this, play);
  }
}
