import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  create(createUserDto: CreateUserDto) {
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

    return user;
  }

  findAll() {
    return UsersService.users;
  }

  findOne(id: number) {
    return UsersService.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = UsersService.users.find((user) => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  remove(id: number): void {
    const index = UsersService.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      UsersService.users.splice(index, 1);
    }
  }
}
