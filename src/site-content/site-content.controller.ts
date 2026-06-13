import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { SiteContentService } from './site-content.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('site-content')
export class SiteContentController {
  constructor(private siteContentService: SiteContentService) {}

  @Public()
  @Get()
  findAll() {
    return this.siteContentService.findAll();
  }

  @Public()
  @Get(':key')
  findByKey(@Param('key') key: string) {
    return this.siteContentService.findByKey(key);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':key')
  update(@Param('key') key: string, @Body('value') value: string) {
    return this.siteContentService.update(key, value);
  }
}
