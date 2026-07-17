import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { ContentModule } from './content/content.module';
import { CategoriesModule } from './categories/categories.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule, 
    ProductsModule, 
    InventoryModule, 
    ContentModule, 
    CategoriesModule, 
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: uploadDir,
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
