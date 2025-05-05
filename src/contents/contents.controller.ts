import {
  Controller, Get, Post, Put, Delete, Param,
  Body, HttpCode, UseGuards
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentGateway } from '../gateway/content.gateway';

@Controller('contents')
export class ContentsController {
  constructor(private readonly svc: ContentsService, private gateway: ContentGateway) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateContentDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateContentDto
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  @Post(':id/submit')
  @HttpCode(200)
  async submit(@Param('id') id: string) {
    const updated = await this.svc.submit(id);
    this.gateway.notifyUpdate(updated);
    return updated;
  }
}
