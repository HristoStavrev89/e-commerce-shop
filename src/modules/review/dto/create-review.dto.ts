import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';


export class CreateReviewDto {
@IsInt()
productId: number;


@IsInt()
@Min(1)
@Max(5)
rating: number;


@IsString()
@IsNotEmpty()
comment: string;
}