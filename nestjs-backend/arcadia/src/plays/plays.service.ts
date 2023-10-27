import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Play } from './entities/play.entity';
import { NewPlayDto } from './dto/new-play.dto';
import { UsersService } from '../users/users.service';
import { GamesService } from '../games/games.service';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play)
    private playRepository: Repository<Play>,
    private usersService: UsersService,
    private gamesService: GamesService,
  ) {}

  async findAll(): Promise<Play[]> {
    return this.playRepository.find();
  }

  async findOne(id: number): Promise<Play> {
    return this.playRepository.findOne({ where: { id } });
  }

  async create(play: Partial<Play>): Promise<Play> {
    const newplay = this.playRepository.create(play);
    return this.playRepository.save(newplay);
  }

  async update(id: number, play: Partial<Play>): Promise<Play> {
    await this.playRepository.update(id, play);
    return this.playRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.playRepository.delete(id);
  }

  async new_game(newPlay: NewPlayDto): Promise<any> {
    Logger.error(
      'new_game with [U' + newPlay.user_id + ':G' + newPlay.game_id + ']',
    );

    const foundExistingUser = await this.usersService.findOne(newPlay.user_id);

    if (!foundExistingUser) {
      throw new NotFoundException('Supplied user is not found');
    }

    Logger.error('found user: ' + foundExistingUser.name);

    const foundExistingGame = await this.gamesService.findOne(newPlay.game_id);

    if (!foundExistingGame) {
      throw new NotFoundException('Supplied game is not found');
    }

    Logger.error('found game: ' + foundExistingGame.name);

    const newPlayEntity = this.playRepository.create({
      players: [foundExistingUser],
      game: foundExistingGame,
      players_needed: (foundExistingGame.number_of_players -= 1),
    });

    const createdPlay = await this.playRepository.save(newPlayEntity);
    return { new_play_id: createdPlay.id };
  }
}
