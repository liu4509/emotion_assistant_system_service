import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clock } from './entities/clocks.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { User } from 'src/user/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clock, Category, User])],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule {}
