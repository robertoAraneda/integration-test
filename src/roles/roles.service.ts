import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  private static roles = [
    {
      id: 1,
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  create(createRoleDto: CreateRoleDto) {
    const id = RolesService.roles
      .map((role) => role.id)
      .sort((a, b) => a - b)
      .pop();

    const role = {
      ...createRoleDto,
      id: id + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    RolesService.roles.push(role);

    return role;
  }

  findAll() {
    return RolesService.roles;
  }

  findOne(id: number) {
    return RolesService.roles.find((role) => role.id === id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = RolesService.roles.find((role) => role.id === id);
    if (role) {
      Object.assign(role, updateRoleDto);
    }
    return role;
  }

  remove(id: number) {
    const index = RolesService.roles.findIndex((role) => role.id === id);
    if (index >= 0) {
      RolesService.roles.splice(index, 1);
    }
  }
}
