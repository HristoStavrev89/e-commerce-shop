import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.category.findMany();
    }

    create(dto: CreateCategoryDto) {
        return this.prisma.category.create({data: dto})
    }
}
