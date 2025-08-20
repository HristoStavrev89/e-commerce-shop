import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOfferDto) {
    // Making sure that the products existing
    const products = await this.prisma.product.findMany({
      where: { id: { in: dto.productIds } },
    });

    if (products.length !== dto.productIds.length) {
      // Check exactly which products arent found
      const notFoundIds = dto.productIds.filter(
        (id) => !products.find((p) => p.id === id),
      );
      throw new NotFoundException(
        'Some products were not found - ' + notFoundIds.join(', '),
      );
    }

    return this.prisma.offer.create({
      data: {
        title: dto.title,
        description: dto.description,
        discountPercent: dto.discountPercent,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        products: {
          connect: dto.productIds.map((id) => ({ id })),
        },
      },
      include: { products: true },
    });
  }

  async findAllActive() {
    const now = new Date();

    return this.prisma.offer.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: { products: true },
    });
  }

  async findAll() {
    return this.prisma.offer.findMany({
      include: { products: true },
    });
  }

  async findOne(id: number) {
    const doesExist = await this.prisma.offer.findUnique({
      where: { id: id },
      include: { products: true },
    });

    if (!doesExist) {
      throw new NotFoundException('Offer ID is not found');
    }

    return doesExist;
  }

  
  async removeOne(id: number) {
    const doesExist = await this.prisma.offer.findUnique({
      where: { id: id }
    });

    if (!doesExist) {
      throw new NotFoundException("Can't remove not existing offer.");
    }

    await this.prisma.offer.delete({
      where: { id: id }
    });

    return doesExist;
  }
}
