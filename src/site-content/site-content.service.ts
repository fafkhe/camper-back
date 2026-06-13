import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SiteContentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.siteContent.findMany();
  }

  async findByKey(key: string) {
    return this.prisma.siteContent.findUnique({ where: { key } });
  }

  async update(key: string, value: string) {
    return this.prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
