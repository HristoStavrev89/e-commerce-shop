import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: number, dto: CreateReviewDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.review.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: dto.productId } },
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

  async getReviewsForProduct(productId: number) {
    return this.prisma.review.findMany({
      where: { productId },
      include: { 
        user: {
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // returning pass is not nacessary
            }
        }
       },
      
    });
  }
}
