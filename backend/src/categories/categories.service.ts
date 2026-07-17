import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { children: true },
    });
  }

  async getTree() {
    const allCategories = await this.prisma.category.findMany();
    
    // Build tree
    const categoryMap = new Map<string, any>();
    const tree: any[] = [];

    allCategories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    allCategories.forEach(cat => {
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(categoryMap.get(cat.id));
        }
      } else {
        tree.push(categoryMap.get(cat.id));
      }
    });

    return tree;
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
