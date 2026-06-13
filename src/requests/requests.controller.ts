import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

class CreateRequestDto {
  fullName: string;
  phone: string;
  vehicleType: string;
  description?: string;
  budget?: string;
  city?: string;
}

@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateRequestDto) {
    return this.requestsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('status') status?: string) {
    return this.requestsService.findAll(status);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.requestsService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.requestsService.getStats();
  }
}
