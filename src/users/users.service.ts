import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  private static users = [
    {
      id: 1,
      email: 'roberto@gmail.com',
      family: 'Araneda',
      isActive: true,
      name: 'Roberto',
      password: 'randompassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);

    console.log(user);

    /*
    const id = UsersService.users
      .map((user) => user.id)
      .sort((a, b) => a - b)
      .pop();

    const user = {
      ...createUserDto,
      id: id + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    UsersService.users.push(user);
    */

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFounded = await this.usersRepository.findOneBy({
      id,
    });

    const user = this.usersRepository.merge(userFounded, updateUserDto);

    this.usersRepository.save(user);

    return user;
  }

  remove(id: number): void {
    this.usersRepository.delete(id);
  }
}
