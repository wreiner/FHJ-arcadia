import { Module } from '@nestjs/common';
import { PlaysController } from './plays.controller';
import { PlaysService } from './plays.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Play])],
  controllers: [PlaysController],
  providers: [PlaysService],
})
export class PlaysModule {}
