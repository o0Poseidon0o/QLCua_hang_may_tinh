import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InventoryCreateInput) {
    return this.prisma.inventory.create({ data });
  }

  async findAll() {
    return this.prisma.inventory.findMany({ include: { product: true } });
  }

  async findOne(id: string) {
    return this.prisma.inventory.findUnique({ where: { id }, include: { product: true } });
  }

  async update(id: string, data: Prisma.InventoryUpdateInput) {
    return this.prisma.inventory.update({ where: { id }, data });
  }
}
