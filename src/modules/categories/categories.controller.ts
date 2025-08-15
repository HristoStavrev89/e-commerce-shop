import { Controller, Body, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}


    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @Get(':id/products')
    getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getCategoryById(id);
    }
}
