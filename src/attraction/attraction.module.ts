import { Module } from '@nestjs/common';
import { AttractionService } from './attraction.service';
import { AttractionController } from './attraction.controller';
import { Attraction } from './entities/attraction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attraction])],
  controllers: [AttractionController],
  providers: [AttractionService],
})
export class AttractionModule {}
