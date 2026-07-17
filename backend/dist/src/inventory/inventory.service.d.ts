import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.InventoryCreateInput): Promise<{
        id: string;
        updatedAt: Date;
        quantity: number;
        productId: string;
    }>;
    findAll(): Promise<({
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            price: number;
            sku: string;
            categoryId: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        quantity: number;
        productId: string;
    })[]>;
    findOne(id: string): Promise<({
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            price: number;
            sku: string;
            categoryId: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        quantity: number;
        productId: string;
    }) | null>;
    update(id: string, data: Prisma.InventoryUpdateInput): Promise<{
        id: string;
        updatedAt: Date;
        quantity: number;
        productId: string;
    }>;
}
