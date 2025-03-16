import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ClockService } from './clock.service';
import { Clock } from './entities/clocks.entity';
import { CreateClockDto, UpdateClockDto } from './dto/clock.dto';
import { RequireLogin, UserInfo } from 'src/decorator/custom.decorator';

@Controller('clock')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  // 初始数据
  @Get('init-data')
  async initData() {
    await this.clockService.initData();
    return 'done';
  }

  @Get()
  async findAll(): Promise<Clock[]> {
    return this.clockService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Clock[]> {
    return this.clockService.findByCategory(categoryValue);
  }

  @Get('my')
  @RequireLogin()
  async findMyClocks(@UserInfo('userId') userId: number): Promise<Clock[]> {
    return this.clockService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clock> {
    return this.clockService.findOne(+id);
  }

  @Post()
  @RequireLogin()
  async create(
    @UserInfo('userId') userId: number,
    @Body() createClockDto: CreateClockDto,
  ): Promise<Clock> {
    return this.clockService.create(userId, createClockDto);
  }

  @Patch(':id')
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Param('id') id: string,
    @Body() updateClockDto: UpdateClockDto,
  ): Promise<Clock> {
    return this.clockService.update(+id, userId, updateClockDto);
  }

  @Delete(':id')
  async remove(
    @UserInfo('userId') userId: number,
    @Param('id') id: string,
  ): Promise<void> {
    return this.clockService.remove(+id, userId);
  }
}
