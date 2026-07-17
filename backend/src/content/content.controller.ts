import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: Prisma.PageContentCreateInput) {
    return this.contentService.create(data);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.contentService.findOne(slug);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() data: Prisma.PageContentUpdateInput,
  ) {
    return this.contentService.update(slug, data);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.contentService.remove(slug);
  }
}
