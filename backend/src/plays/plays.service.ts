import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';
import { GamesService } from '../games/games.service';
import { generate_urlpath } from 'src/utils/helpers';
import { Repository } from 'typeorm';
import { Urlpath } from './entities/urlpath.entity';
import { GamesPlugin } from './plugins/plugin.interface';
import { URNext } from './plugins/URNext/main';
import { TicTacToe } from './plugins/TicTacToe/main';
import { GameNotImplementedException } from './exceptions/gamenotimplemented';
import { IllegalMoveException } from './exceptions/illegalmove';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play)
    private readonly playRepository: Repository<Play>,
    @InjectRepository(Urlpath)
    private readonly urlpathRepository: Repository<Urlpath>,
    private gamesService: GamesService,
  ) {}

  async create_urlpaths(numberOfUrls: number): Promise<Urlpath[]> {
    const urlPaths: Urlpath[] = [];

    for (let i = 1; i <= numberOfUrls; i++) {
      const newURLPath = this.urlpathRepository.create({
        path: generate_urlpath(),
      });

      urlPaths.push(await this.urlpathRepository.save(newURLPath));
    }

    return urlPaths;
  }

  async create(createPlayDto: CreatePlayDto) {
    Logger.debug(`new_game with [G:${createPlayDto.game_id}]`);

    const foundExistingGame = await this.gamesService.findOne(
      createPlayDto.game_id,
    );

    if (!foundExistingGame || !foundExistingGame.active) {
      throw new NotFoundException('Supplied game is not found');
    }

    const newPlay = this.playRepository.create({
      urls: await this.create_urlpaths(foundExistingGame.number_of_players),
      game: foundExistingGame,
    });

    const gamePlugin = this.loadPlugin(foundExistingGame.name);
    if (!gamePlugin) {
      throw new GameNotImplementedException(
        `Game ${foundExistingGame.name} not implemented`,
      );
    }

    const init_game_state = (await gamePlugin).init_state(newPlay.urls);
    newPlay.game_state = init_game_state;

    await this.playRepository.save(newPlay);
    return newPlay.game_state;
  }

  async findAll() {
    return `This action returns all plays`;
  }

  async findOne(id: number) {
    return this.playRepository.findOne({
      where: { id },
      relations: { urls: true },
    });
  }

  async getPlayByPath(path: string): Promise<Play | undefined> {
    const play = await this.playRepository
      .createQueryBuilder('play')
      .leftJoin('play.urls', 'url')
      .where('url.path = :path', { path })
      .leftJoinAndSelect('play.game', 'game')
      .getOne();

    return play;
  }

  loadPlugin(className: string): Promise<GamesPlugin | null> {
    const classMap: { [key: string]: any } = {
      URNext,
      TicTacToe,
    };

    const selectedClass = classMap[className];

    if (selectedClass) {
      return new selectedClass();
    } else {
      Logger.error(
        `Cannot load gameclass for game ${className} - game class not found`,
      );
      return undefined;
    }
  }

  async player_move(
    path: string,
    updatePlayDto: UpdatePlayDto,
  ): Promise<Play | undefined> {
    const play = await this.playRepository
      .createQueryBuilder('play')
      .leftJoin('play.urls', 'url')
      .where('url.path = :path', { path })
      .leftJoinAndSelect('play.game', 'game')
      .getOne();

    const gamePlugin = this.loadPlugin(play.game.name);
    if (!gamePlugin) {
      throw new GameNotImplementedException(
        `Game ${play.game.name} not implemented`,
      );
    }

    (await gamePlugin).import_state(play.game_state);
    if (!(await gamePlugin).update_state(path, updatePlayDto.move)) {
      throw new IllegalMoveException(`Your move is not allowed`);
    }

    // move was valid, save new state
    const newState = (await gamePlugin).get_state();
    play.game_state = newState;

    if (!(await this.playRepository.save(play))) {
      // fixme throw some exception because save failed
      return undefined;
    }

    return play.game_state;
  }

  async update(id: number, updatePlayDto: UpdatePlayDto) {
    Logger.log(updatePlayDto);
    return `This action updates a #${id} play`;
  }

  async remove(id: number) {
    return `This action removes a #${id} play`;
  }
}
