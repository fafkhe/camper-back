import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: { title: string; url: string; thumbnail?: string }) {
    return this.prisma.video.create({ data: dto });
  }

  async update(id: string, dto: any) {
    await this.prisma.video.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('Video not found');
    });
    return this.prisma.video.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.video.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('Video not found');
    });
    return this.prisma.video.delete({ where: { id } });
  }
}
