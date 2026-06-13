import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { fullName: string; phone: string; vehicleType: string; description?: string; budget?: string; city?: string }) {
    const { fullName, ...rest } = dto;
    return this.prisma.consultationRequest.create({ data: { name: fullName, ...rest } });
  }

  async findAll(status?: string) {
    const where = status ? { status: status as RequestStatus } : {};
    return this.prisma.consultationRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.consultationRequest.update({
      where: { id },
      data: { status: status as RequestStatus },
    });
  }

  async getStats() {
    const [total, pending, contacted, completed] = await Promise.all([
      this.prisma.consultationRequest.count(),
      this.prisma.consultationRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.consultationRequest.count({ where: { status: 'CONTACTED' } }),
      this.prisma.consultationRequest.count({ where: { status: 'COMPLETED' } }),
    ]);
    return { total, pending, contacted, completed };
  }
}
