"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    deleteImageFile(imageUrl) {
        if (!imageUrl)
            return;
        const parts = imageUrl.split('/uploads/');
        if (parts.length > 1) {
            const filename = parts[1];
            const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                }
                catch (e) {
                    console.error(`Failed to delete image file: ${filePath}`, e);
                }
            }
        }
    }
    async create(data) {
        return this.prisma.pageContent.create({ data });
    }
    async findAll() {
        return this.prisma.pageContent.findMany();
    }
    async findOne(slug) {
        return this.prisma.pageContent.findUnique({ where: { slug } });
    }
    async update(slug, data) {
        const oldPage = await this.prisma.pageContent.findUnique({ where: { slug } });
        if (oldPage &&
            oldPage.coverImage &&
            data.coverImage !== undefined &&
            oldPage.coverImage !== data.coverImage) {
            this.deleteImageFile(oldPage.coverImage);
        }
        return this.prisma.pageContent.update({ where: { slug }, data });
    }
    async remove(slug) {
        const page = await this.prisma.pageContent.findUnique({ where: { slug } });
        if (page && page.coverImage) {
            this.deleteImageFile(page.coverImage);
        }
        return this.prisma.pageContent.delete({ where: { slug } });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map