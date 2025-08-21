import { IsNotEmpty, IsNumber, IsString, Min, MinLength, ArrayNotEmpty, IsInt } from 'class-validator';


export class CreateComboDto {
@IsNotEmpty()
@IsString()
@MinLength(5)
name: string;


@IsNotEmpty()
@IsNumber({ maxDecimalPlaces: 2 })
@Min(0)
discountPrice: number;


@ArrayNotEmpty()
@IsInt({ each: true })
productIds: number[];
}