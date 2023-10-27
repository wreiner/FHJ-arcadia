import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Play {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game)
  @JoinColumn()
  game: Game;

  @ManyToMany(() => User)
  @JoinTable()
  players: User[];

  @Column('jsonb')
  game_state: any;

  @ManyToOne(() => User)
  @JoinColumn()
  next_to_move: User;

  @Column()
  players_needed: number;

  @BeforeInsert()
  beforeInsertActions() {
    this.game_state = '{}';
  }
}
