import { IsInt, IsNotEmpty, IsNumber, IsOptional, isPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    description: string;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    // @isPositive()
   
    price: number;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    discount: number;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    rating: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    image: string;

    @IsNotEmpty()
    @IsInt()
    categoryId: number;


}