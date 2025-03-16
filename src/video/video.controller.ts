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
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.videoService.initData();
    return '视频数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Video[]> {
    return this.videoService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(+id);
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.create(createVideoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.videoService.remove(+id);
  }
}
