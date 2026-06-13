import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

class CreateVideoDto {
  title: string;
  url: string;
  thumbnail?: string;
}

class UpdateVideoDto {
  title?: string;
  url?: string;
  thumbnail?: string;
}

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Public()
  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateVideoDto) {
    return this.videosService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoDto) {
    return this.videosService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
