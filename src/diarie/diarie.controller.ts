import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { CreateDiarieDto, UpdateDiarieDto } from './dto/diarie.dto';
import { User } from 'src/user/entities/User.entity';
import { RequireLogin, UserInfo } from 'src/decorator/custom.decorator';

@Controller('diarie')
export class DiarieController {
  constructor(private readonly diarieService: DiarieService) {}

  @Get('init-data')
  async initData() {
    await this.diarieService.initData();
    return { message: '日记数据初始化成功' };
  }

  @Get()
  async findAll() {
    return await this.diarieService.findAll();
  }

  @Get('mood')
  async findByMood(@Query('value') moodValue: string) {
    return await this.diarieService.findByMood(moodValue);
  }

  @Get('user')
  @RequireLogin()
  async findByUser(@UserInfo('userId') userId: number) {
    return await this.diarieService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.diarieService.findOne(id);
  }

  @Post()
  @RequireLogin()
  async create(
    @UserInfo('userId') userId: number,
    @Body() createDiarieDto: CreateDiarieDto,
  ) {
    return await this.diarieService.create(userId, createDiarieDto);
  }

  @Patch(':id')
  @RequireLogin()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('userId') userId: number,
    @Body() updateDiarieDto: UpdateDiarieDto,
  ) {
    const result = await this.diarieService.update(id, userId, updateDiarieDto);
    return '更新成功';
  }

  @Delete(':id')
  @RequireLogin()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('userId') userId: number,
  ) {
    await this.diarieService.remove(id, userId);
    return '删除成功';
  }
}
