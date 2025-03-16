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
import { AttractionService } from './attraction.service';
import { Attraction } from './entities/attraction.entity';
import { CreateAttractionDto, UpdateAttractionDto } from './dto/attraction.dto';

@Controller('attraction')
export class AttractionController {
  constructor(private readonly attractionService: AttractionService) {}

  @Get('init-data')
  async initData() {
    await this.attractionService.initData();
    return '景点数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Attraction[]> {
    return await this.attractionService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Attraction[]> {
    return await this.attractionService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attraction> {
    return await this.attractionService.findOne(+id);
  }

  @Post()
  async create(
    @Body()
    createAttractionDto: CreateAttractionDto,
  ): Promise<Attraction> {
    return await this.attractionService.create(createAttractionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateAttractionDto: UpdateAttractionDto,
  ) {
    const result = await this.attractionService.update(
      +id,
      updateAttractionDto,
    );
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.attractionService.remove(+id);
    return '删除成功';
  }
}
