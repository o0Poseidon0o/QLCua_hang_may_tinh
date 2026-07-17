import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        categoryId: string | null;
    }>;
    findAll(categoryId?: string): Promise<({
        category: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        } | null;
        inventory: {
            id: string;
            updatedAt: Date;
            quantity: number;
            productId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        categoryId: string | null;
    })[]>;
    findOne(id: string): Promise<({
        category: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        } | null;
        inventory: {
            id: string;
            updatedAt: Date;
            quantity: number;
            productId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        categoryId: string | null;
    }) | null>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        categoryId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        categoryId: string | null;
    }>;
}
