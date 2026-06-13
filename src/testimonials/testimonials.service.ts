import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: { name: string; role: string; content: string; avatar?: string; rating?: number }) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async update(id: string, dto: any) {
    await this.prisma.testimonial.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('Testimonial not found');
    });
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.testimonial.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw new NotFoundException('Testimonial not found');
    });
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
