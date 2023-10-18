import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Play } from './entities/play.entity';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play)
    private playRepository: Repository<Play>,
  ) {}

  async findAll(): Promise<Play[]> {
    return this.playRepository.find();
  }

  async findOne(id: number): Promise<Play> {
    return this.playRepository.findOne({ where: { id } });
  }

  async create(play: Partial<Play>): Promise<Play> {
    const newplay = this.playRepository.create(play);
    return this.playRepository.save(newplay);
  }

  async update(id: number, play: Partial<Play>): Promise<Play> {
    await this.playRepository.update(id, play);
    return this.playRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.playRepository.delete(id);
  }
}
