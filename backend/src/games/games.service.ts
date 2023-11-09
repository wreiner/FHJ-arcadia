import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const name = createGameDto.name;
    const foundExistingGame = await this.gameRepository.findOneBy({ name });
    if (foundExistingGame) {
      throw new ConflictException('A game with the same name already exists');
    }

    const newgame = this.gameRepository.create(createGameDto);
    await this.entityManager.save(newgame);
    return newgame;
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    // FIXME check if game exists before going further
    const name = updateGameDto.name;
    const foundExistingGame = await this.gameRepository.findOneBy({ name });
    if (foundExistingGame.id != id) {
      throw new ConflictException('A game with the same name already exists');
    }

    await this.gameRepository.update(id, updateGameDto);
    // return this.gameRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async findActiveGames(): Promise<Game[]> {
    const active = true;
    const games = await this.gameRepository
      .createQueryBuilder('g')
      .where('g.active = :active', { active })
      .getMany();
    return games;
  }
}
