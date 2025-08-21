import { Module } from '@nestjs/common';
import { ComboService } from './combo.service';
import { ComboController } from './combo.controller';

@Module({
  providers: [ComboService],
  controllers: [ComboController]
})
export class ComboModule {}
