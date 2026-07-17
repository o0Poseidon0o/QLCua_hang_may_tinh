import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CategoryCreateInput): Promise<{
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    })[]>;
    getTree(): Promise<any[]>;
    findOne(id: string): Promise<({
        parent: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }) | null>;
    update(id: string, data: Prisma.CategoryUpdateInput): Promise<{
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }>;
}
