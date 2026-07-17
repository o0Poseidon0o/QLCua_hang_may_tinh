import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  private deleteImageFile(imageUrl: string | null) {
    if (!imageUrl) return;
    
    // imageUrl format is likely http://localhost:3000/uploads/filename.jpg
    const parts = imageUrl.split('/uploads/');
    if (parts.length > 1) {
      const filename = parts[1];
      const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
      const filePath = path.join(uploadDir, filename);
      
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error(`Failed to delete image file: ${filePath}`, e);
        }
      }
    }
  }

  async create(data: Prisma.PageContentCreateInput) {
    return this.prisma.pageContent.create({ data });
  }

  async findAll() {
    return this.prisma.pageContent.findMany();
  }

  async findOne(slug: string) {
    return this.prisma.pageContent.findUnique({ where: { slug } });
  }

  async update(slug: string, data: Prisma.PageContentUpdateInput) {
    const oldPage = await this.prisma.pageContent.findUnique({ where: { slug } });
    
    // If the cover image is being changed or removed, delete the old one from disk
    if (
      oldPage && 
      oldPage.coverImage && 
      data.coverImage !== undefined && 
      oldPage.coverImage !== data.coverImage
    ) {
      this.deleteImageFile(oldPage.coverImage);
    }

    return this.prisma.pageContent.update({ where: { slug }, data });
  }

  async remove(slug: string) {
    const page = await this.prisma.pageContent.findUnique({ where: { slug } });
    
    if (page && page.coverImage) {
      this.deleteImageFile(page.coverImage);
    }

    return this.prisma.pageContent.delete({ where: { slug } });
  }
}
