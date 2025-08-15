import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(categoryId: number) {

    //TODO: Maybe throw exception here if there is no category with such id
    return this.prisma.product.findMany({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        rating: true,
        image: true,
      }
    })
  }

  async create(dto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: dto.name,
          slug: dto.slug ?? dto.name.toLowerCase().replace(/\s+/g, '-'),
          description: dto.description,
          image: dto.image,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {

        // Prisma unique constraint error - Throw ConflictException if category name or slug already exists
        // console.error('Category name or slug already exists!');
        throw new ConflictException('Category name or slug already exists');
      }
      throw error;
    }
  }
}
