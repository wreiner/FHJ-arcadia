import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post('start_game')
  async create(@Body() createPlayDto: CreatePlayDto) {
    return this.playsService.create(createPlayDto);
  }

  @Get('get_game_state/:path')
  async getPlayByPath(@Param('path') path: string) {
    return this.playsService.getPlayByPath(path);
  }

  @Patch('player_move/:path')
  async playerMove(
    @Param('path') path: string,
    @Body() updatePlayDto: UpdatePlayDto,
  ) {
    return this.playsService.player_move(path, updatePlayDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playsService.findOne(+id);
  }

  @Get()
  async findAll() {
    return this.playsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayDto: UpdatePlayDto) {
    return this.playsService.update(+id, updatePlayDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playsService.remove(+id);
  }
}
