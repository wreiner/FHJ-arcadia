import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  //get all games
  @Get()
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  //get game by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    const game = await this.gamesService.findOne(id);
    if (!game) {
      throw new NotFoundException('Game does not exist!');
    } else {
      return game;
    }
  }

  //create game
  @Post()
  async create(@Body() game: Game): Promise<Game> {
    return this.gamesService.create(game);
  }

  //update game
  @Put(':id')
  async update(@Param('id') id: number, @Body() game: Game): Promise<any> {
    return this.gamesService.update(id, game);
  }

  //delete game
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if game does not exist
    const game = await this.gamesService.findOne(id);
    if (!game) {
      throw new NotFoundException('Game does not exist!');
    }
    return this.gamesService.delete(id);
  }
}
