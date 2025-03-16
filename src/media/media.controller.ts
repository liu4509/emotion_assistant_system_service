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
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { CreateMediaDto, UpdateMediaDto } from './dto/media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.mediaService.initData();
    return '音频数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Media[]> {
    return await this.mediaService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Media[]> {
    return await this.mediaService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Media> {
    return await this.mediaService.findOne(+id);
  }

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return await this.mediaService.create(createMediaDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const result = await this.mediaService.update(+id, updateMediaDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.mediaService.remove(+id);
    return '删除成功';
  }
}
