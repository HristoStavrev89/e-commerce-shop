import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, UsersModule, AuthModule, CartModule, OrderModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
