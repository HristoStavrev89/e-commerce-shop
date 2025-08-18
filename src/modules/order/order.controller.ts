import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req) {
    return this.orderService.createOrder(req.user.id);
  }

  @Get()
  getMyOrders(@Req() req) {
    return this.orderService.getUserOrders(req.user.id);
  }
}
