import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    private deleteImageFile;
    create(data: Prisma.PageContentCreateInput): Promise<{
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        coverImage: string | null;
        content: string;
        isMenuItem: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        coverImage: string | null;
        content: string;
        isMenuItem: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(slug: string): Promise<{
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        coverImage: string | null;
        content: string;
        isMenuItem: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(slug: string, data: Prisma.PageContentUpdateInput): Promise<{
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        coverImage: string | null;
        content: string;
        isMenuItem: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(slug: string): Promise<{
        id: string;
        slug: string;
        title: string;
        excerpt: string | null;
        coverImage: string | null;
        content: string;
        isMenuItem: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
