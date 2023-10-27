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
import { PlaysService } from './plays.service';
import { Play } from './entities/play.entity';
import { NewPlayDto } from './dto/new-play.dto';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  //get all plays
  @Get()
  async findAll(): Promise<Play[]> {
    return this.playsService.findAll();
  }

  //get play by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Play> {
    const play = await this.playsService.findOne(id);
    if (!play) {
      throw new NotFoundException('Play does not exist!');
    } else {
      return play;
    }
  }

  //create play
  @Post()
  async create(@Body() play: Play): Promise<Play> {
    return this.playsService.create(play);
  }

  //update play
  @Put(':id')
  async update(@Param('id') id: number, @Body() play: Play): Promise<any> {
    return this.playsService.update(id, play);
  }

  //delete play
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if play does not exist
    const play = await this.playsService.findOne(id);
    if (!play) {
      throw new NotFoundException('Play does not exist!');
    }
    return this.playsService.delete(id);
  }

  @Post('start_new_game')
  async start_new_game(@Body() newPlay: NewPlayDto): Promise<any> {
    return this.playsService.new_game(newPlay);
  }
}
