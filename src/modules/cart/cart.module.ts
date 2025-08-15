import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';

@Module({
  controllers: [CartController, CartItemController],
  providers: [CartService, CartItemService],
})
export class CartModule {}
