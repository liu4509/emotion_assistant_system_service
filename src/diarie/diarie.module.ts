import { Module } from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { DiarieController } from './diarie.controller';
import { Diarie } from './entities/diarie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diarie])],
  controllers: [DiarieController],
  providers: [DiarieService],
})
export class DiarieModule {}
