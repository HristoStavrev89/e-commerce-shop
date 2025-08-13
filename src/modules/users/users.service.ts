import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashPass,
          role: createUserDto.role ?? Role.CUSTOMER,
        },
        select: { id: true, email: true, role: true, createdAt: true }, // No pass return!
      });
    } catch (error) {
      if (error.code === 'P2005') {
        throw new ConflictException('Email already exists!');
      }
      throw error;
    }
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true }, // hide password
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        password: true,
      },
    });
  }

  async validateUser(email: string, plainPassword: string) {
    const user = await this.findByEmail(email);

    // Check if there is such user with the given email
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(plainPassword, user.password);

    // There is such user but the password does not mach with the one in db
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...safe } = user;

    return safe;
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }
}
