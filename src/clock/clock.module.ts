import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { Clock } from './entities/clocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Clock])],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule {}
