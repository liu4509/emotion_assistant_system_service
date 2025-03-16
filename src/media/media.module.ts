import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Category } from 'src/attraction/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media, Category])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
