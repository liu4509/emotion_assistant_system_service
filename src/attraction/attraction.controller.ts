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
import { AttractionService } from './attraction.service';
import { Attraction } from './entities/attraction.entity';
import { CreateAttractionDto, UpdateAttractionDto } from './dto/attraction.dto';

@Controller('attraction')
export class AttractionController {
  constructor(private readonly attractionService: AttractionService) {}

  @Get('init-data')
  async initData() {
    await this.attractionService.initData();
    return 'done';
  }

  @Get()
  async findAll(): Promise<Attraction[]> {
    return this.attractionService.findAll();
  }

  @Get('category')
  async findByCategory(
    @Query('value') categoryValue: string,
  ): Promise<Attraction[]> {
    return this.attractionService.findByCategory(categoryValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attraction> {
    return this.attractionService.findOne(+id);
  }

  @Post()
  async create(
    @Body()
    createAttractionDto: CreateAttractionDto,
  ): Promise<Attraction> {
    return this.attractionService.create(createAttractionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateAttractionDto: UpdateAttractionDto,
  ): Promise<Attraction> {
    return this.attractionService.update(+id, updateAttractionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.attractionService.remove(+id);
  }
}
