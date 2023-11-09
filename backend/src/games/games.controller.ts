import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll() {
    return this.gamesService.findAll();
  }

  // keep before more precise get definitions because of express router order
  // https://stackoverflow.com/questions/32603818/order-of-router-precedence-in-express-js
  @Get('get_active_games')
  // async findAll(): Promise<Game[]> {
  async findActiveGames(): Promise<Game[]> {
    return this.gamesService.findActiveGames();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.gamesService.delete(+id);
  }
}
