import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Category } from 'src/attraction/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
