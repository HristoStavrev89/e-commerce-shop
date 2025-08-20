import { Controller, Post, Get, Body, UseGuards, Query, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { OfferService } from './offer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateOfferDto } from './dto/create-offer.dto';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('offers')
export class OfferController {
constructor(private readonly offerService: OfferService) {}


@Roles(Role.ADMIN)
@Post()
create(@Body() dto: CreateOfferDto) {
return this.offerService.create(dto);
}

@Get('active')
findAllActive() {
return this.offerService.findAllActive();
}


@Roles(Role.ADMIN)
@Get()
findAll() {
return this.offerService.findAll();
}


@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
return this.offerService.findOne(id);
}

@Roles(Role.ADMIN)
@Delete(':id')
removeOne(@Param('id', ParseIntPipe) id: number) {
return this.offerService.removeOne(id);
}
}