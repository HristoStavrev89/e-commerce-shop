import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { connect } from 'http2';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const doesExist = await this.prismaService.product.findUnique({
        where: { id },
        include: { category: true }
    })

    if (!doesExist) {
        throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return doesExist;
  }

  async create(createProductDto: CreateProductDto) {

    // Check if the category exist, before creating the product
    await this.prismaService.category.findFirstOrThrow({
      where: { id: createProductDto.categoryId },
    });

    return this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        discount: createProductDto.discount,
        rating: createProductDto.rating,
        image: createProductDto.image,
        category: { connect: { id: createProductDto.categoryId } },
      },
    });
  }
}
