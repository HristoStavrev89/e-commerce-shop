import { 
    IsEmail, 
    IsNotEmpty, 
    MinLength,
    IsEnum
} from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;


}