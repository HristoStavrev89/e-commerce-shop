import {
  Min,
  IsDateString,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsArray,
  ArrayUnique,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateOfferDto {
@IsNotEmpty()
@IsString()
@MinLength(7)
title: string;


@IsNotEmpty()
@IsString()
@MinLength(7)
description: string;


@IsNotEmpty()
@IsNumber({ maxDecimalPlaces: 2 })
@Min(0)
discountPercent: number;


@IsDateString()
startDate: string;


@IsDateString()
endDate: string;


@IsArray()
@ArrayNotEmpty()
@ArrayUnique()
productIds: number[];
}
