import { 
    IsEmail, 
    IsNotEmpty, 
    MinLength,
    IsEnum
} from 'class-validator';
import { Role } from '@prisma/client';


export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    readonly role?: Role;

}