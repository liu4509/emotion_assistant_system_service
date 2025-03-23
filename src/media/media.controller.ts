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
  DefaultValuePipe,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { CreateMediaDto, UpdateMediaDto } from './dto/media.dto';
import { generateParseIntPipe } from '@/utils';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.mediaService.initData();
    return '音频数据初始化完成';
  }

  @Get()
  async findAll(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
  ) {
    return await this.mediaService.findAll(pageNo, pageSize);
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
