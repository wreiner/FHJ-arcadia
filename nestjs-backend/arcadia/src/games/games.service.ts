import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id } });
  }

  async create(game: Partial<Game>): Promise<Game> {
    const newgame = this.gameRepository.create(game);
    return this.gameRepository.save(newgame);
  }

  async update(id: number, game: Partial<Game>): Promise<Game> {
    await this.gameRepository.update(id, game);
    return this.gameRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
