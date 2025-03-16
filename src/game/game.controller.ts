import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
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
    return await this.gameService.findAll();
  }

  @Get('category')
  async findByCategory(@Query('value') categoryValue: string): Promise<Game[]> {
    return await this.gameService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Game> {
    return await this.gameService.findOne(+id);
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return await this.gameService.create(createGameDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    const result = await this.gameService.update(+id, updateGameDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.gameService.remove(+id);
    return '删除成功';
  }
}
