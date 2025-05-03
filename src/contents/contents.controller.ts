import { Controller, Get, Post, Put, Delete, Patch, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard }      from '@nestjs/passport';
import { RolesGuard }     from '../common/guards/roles.guard';
import { Roles }          from '../common/decorators/roles.decorator';

import { ContentsService } from './contents.service';
import { Content }         from './schema/content.schema';
import { ContentGateway }  from '../gateway/content.gateway';

@Controller('contents')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('editor','admin')
export class ContentsController {
  constructor(
    private svc: ContentsService,
    private gateway: ContentGateway,
  ) {}

  @Get()
  findAll(): Promise<Content[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Content> {
    const content = await this.svc.findOne(id);
    if (!content) {
      throw new NotFoundException(`Content with id=${id} not found`);
    }
    return content;
  }
  

  @Post()
  create(@Body() data: Partial<Content>): Promise<Content> {
    return this.svc.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Content>,
  ): Promise<Content> {
    const updated = await this.svc.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Content with id=${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  @Post(':id/submit')
  async submit(@Param('id') id: string): Promise<Content> {
    const updated = await this.svc.submit(id);
    if (!updated) {
      throw new NotFoundException(`Content with id=${id} not found`);
    }
    this.gateway.notifyUpdate(updated);
    return updated;
  }
}
