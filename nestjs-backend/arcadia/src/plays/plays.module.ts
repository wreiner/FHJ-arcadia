import { Module } from '@nestjs/common';
import { PlaysController } from './plays.controller';
import { PlaysService } from './plays.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';
import { UsersModule } from '../users/users.module';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([Play]), UsersModule, GamesModule],
  controllers: [PlaysController],
  providers: [PlaysService],
})
export class PlaysModule {}
