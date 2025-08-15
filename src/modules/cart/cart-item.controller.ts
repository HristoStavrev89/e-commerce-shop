import { Controller, Post, Delete, Body, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart/items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  addItem(
    @Req() req,
    @Body() body: { productId: number; quantity: number },
  ) {
    return this.cartItemService.addItem(req.user.id, body.productId, body.quantity);
  }

  @Delete(':id')
  removeItem(@Req() req, @Param('id', ParseIntPipe) itemId: number) {
    return this.cartItemService.removeItem(req.user.id, itemId);
  }
}