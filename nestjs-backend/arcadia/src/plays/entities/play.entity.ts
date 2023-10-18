import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Play {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Game)
  @JoinTable()
  games: Game[];

  @ManyToMany(() => User)
  @JoinTable()
  players: User[];

  @Column()
  game_state: string;

  @OneToOne(() => User)
  @JoinColumn()
  next_to_move: User;

  @Column()
  players_needed: number;
}
