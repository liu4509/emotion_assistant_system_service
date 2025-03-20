import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import {
  CreateQuestionnaireDto,
  UpdateQuestionnaireDto,
} from './dto/questionnaire.dto';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.questionnaireService.initData();
    return '问卷数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Questionnaire[]> {
    return await this.questionnaireService.findAll();
  }

  @Get('random')
  async findRandom(): Promise<Questionnaire> {
    return await this.questionnaireService.findRandom();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Questionnaire> {
    return await this.questionnaireService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    return await this.questionnaireService.create(createQuestionnaireDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    const result = await this.questionnaireService.update(
      +id,
      updateQuestionnaireDto,
    );
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.questionnaireService.remove(+id);
    return '删除成功';
  }
}
