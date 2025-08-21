import { Controller, Post, Get, Delete, Param, ParseIntPipe, Body, UseGuards } from '@nestjs/common';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';


@Controller('combos')
export class ComboController {
constructor(private readonly comboService: ComboService) {}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Post()
create(@Body() dto: CreateComboDto) {
return this.comboService.create(dto);
}


@Get()
findAll() {
return this.comboService.findAll();
}


@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
return this.comboService.findOne(id);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
return this.comboService.remove(id);
}
}