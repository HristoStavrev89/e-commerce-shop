import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async addItem(userId: number, productId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item || item.cartId !== cart.id) {
      throw new NotFoundException('Cart item not found or does not belong to user');
    }

    return this.prisma.cartItem.delete({ where: { id: itemId } });
  }
}