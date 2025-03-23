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
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { generateParseIntPipe } from '@/utils';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.videoService.initData();
    return '视频数据初始化完成';
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
    return await this.videoService.findAll(pageNo, pageSize);
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Video[]> {
    return await this.videoService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return await this.videoService.findOne(+id);
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return await this.videoService.create(createVideoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    const result = await this.videoService.update(+id, updateVideoDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.videoService.remove(+id);
    return '删除成功';
  }
}
