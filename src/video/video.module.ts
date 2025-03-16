import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Category } from 'src/attraction/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Category])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
