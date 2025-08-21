import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComboDto } from './dto/create-combo.dto';

@Injectable()
export class ComboService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateComboDto) {
    const products = await this.prisma.product.findMany({
      where: { id: { in: dto.productIds } },
    });

    if (products.length !== dto.productIds.length) {
      const notFoundProducts = dto.productIds.filter(
        (id) => !products.find((p) => p.id === id),
      );
      throw new NotFoundException(
        `Products with following IDs not found: ${notFoundProducts.join(', ')}`,
      );
    }

    return this.prisma.combo.create({
      data: {
        name: dto.name,
        discountPrice: dto.discountPrice,
        products: {
          connect: dto.productIds.map((id) => ({ id })),
        },
      },
      include: { products: true },
    });
  }

  async findAll() {
    return this.prisma.combo.findMany({
      include: { products: true },
    });
  }

  async findOne(id: number) {
    const combo = await this.prisma.combo.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!combo) throw new NotFoundException('Combo not found');
    return combo;
  }

  async remove(id: number) {
    const exists = await this.prisma.combo.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Combo not found');
    await this.prisma.combo.update({
      where: { id },
      data: { products: { set: [] } },
    });
    return this.prisma.combo.delete({ where: { id } });
  }
}
