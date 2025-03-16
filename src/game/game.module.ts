import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Category } from 'src/attraction/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Category])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
