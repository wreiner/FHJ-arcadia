import { Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';
import { Urlpath } from './entities/urlpath.entity';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([Play, Urlpath]), GamesModule],
  controllers: [PlaysController],
  providers: [PlaysService],
})
export class PlaysModule {}
