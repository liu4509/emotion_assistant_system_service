import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Questionnaire> {
    return this.questionnaireService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ): Promise<Questionnaire> {
    return this.questionnaireService.update(+id, updateQuestionnaireDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.questionnaireService.remove(+id);
  }
}
