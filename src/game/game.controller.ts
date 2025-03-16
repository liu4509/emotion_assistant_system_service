import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.gameService.initData();
    return '游戏数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get('category')
  async findByCategory(@Query('value') categoryValue: string): Promise<Game[]> {
    return this.gameService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(+id);
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gameService.create(createGameDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.gameService.remove(+id);
  }
}
