import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { Logger } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.register_user(user);
  }

  //update user
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: CreateUserDto,
  ): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }

  @Post('register_user')
  async register_user(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.register_user(user);
  }

  //create user
  @HttpCode(200)
  @Get('username_taken/:name')
  async username_taken(@Param('name') name: string): Promise<any> {
    return this.usersService.username_taken(name);
  }
}
