import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(req.user.id, dto);
  }

  @Get('product/:id')
  getByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getReviewsForProduct(id);
  }
}
