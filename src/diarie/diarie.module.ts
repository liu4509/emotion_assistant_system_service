import { Module } from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { DiarieController } from './diarie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diarie } from './entities/diarie.entity';
import { Mood } from './entities/mood.entity';
import { User } from 'src/user/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diarie, Mood, User])],
  controllers: [DiarieController],
  providers: [DiarieService],
})
export class DiarieModule {}
