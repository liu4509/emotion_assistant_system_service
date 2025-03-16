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
  HttpException,
  HttpStatus,
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
    return '打卡照片数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Clock[]> {
    return await this.clockService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Clock[]> {
    return await this.clockService.findByCategory(categoryValue);
  }

  @Get('my')
  @RequireLogin()
  async findMyClocks(@UserInfo('userId') userId: number): Promise<Clock[]> {
    return await this.clockService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clock> {
    return await this.clockService.findOne(+id);
  }

  @Post()
  @RequireLogin()
  async create(
    @UserInfo('userId') userId: number,
    @Body() createClockDto: CreateClockDto,
  ): Promise<Clock> {
    return await this.clockService.create(userId, createClockDto);
  }

  @Patch(':id')
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Param('id') id: string,
    @Body() updateClockDto: UpdateClockDto,
  ) {
    const result = await this.clockService.update(+id, userId, updateClockDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @RequireLogin()
  async remove(@UserInfo('userId') userId: number, @Param('id') id: string) {
    await this.clockService.remove(+id, userId);
    return '删除成功';
  }
}
