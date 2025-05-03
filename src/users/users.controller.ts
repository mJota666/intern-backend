import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard }      from '@nestjs/passport';
import { RolesGuard }     from '../common/guards/roles.guard';
import { Roles }          from '../common/decorators/roles.decorator';

import { UsersService }   from './users.service';
import { User }           from './schema/user.schema';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const content = await this.usersService.findOne(id);
        if (!content) {
            throw new NotFoundException(`Content with id=${id} not found`);
        }
        return content;
    }

  @Post()
  create(@Body() data: Partial<User>): Promise<User> {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(
      @Param('id') id: string,
      @Body() data: Partial<User>
  ): Promise<User> {
      const updated = await this.usersService.update(id, data);
      if (!updated) {
        throw new NotFoundException(`Content with id=${id} not found`);
      }
      return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/role')
  changeRole(@Param('id') id: string, @Body('role') role: User['role']): Promise<User> {
    return this.usersService.changeRole(id, role);
  }
}
