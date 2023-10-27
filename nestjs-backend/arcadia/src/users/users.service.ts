import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // unused - use register_user instead
  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async ausername_taken(name: string): Promise<User> {
    const foundExistingUser = await this.userRepository.findOneBy({ name });

    if (!foundExistingUser) {
      throw new NotFoundException();
    }
    return foundExistingUser;
  }

  async username_taken(name: string): Promise<any> {
    const foundExistingUser = await this.userRepository.findOneBy({ name });

    if (!foundExistingUser) {
      throw new NotFoundException();
    }
    return { status: 'exists' };
  }

  async register_user(user: Partial<User>): Promise<User> {
    const name = user.name;
    const foundExistingUser = await this.userRepository.findOneBy({ name });

    if (foundExistingUser) {
      throw new ConflictException('A user with the same name already exists');
    }

    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }
}
