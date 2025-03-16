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
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.articleService.initData();
    return '心理文章数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Article[]> {
    return await this.articleService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return await this.articleService.findOne(+id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const result = await this.articleService.update(+id, updateArticleDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.articleService.remove(+id);
    return '删除成功';
  }
}
