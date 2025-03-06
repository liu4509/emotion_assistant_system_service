import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optionsi } from './entities/optioni.entity';
import { Question } from './entities/question.entity';
import { Questionnaire } from './entities/questionnaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire, Question, Optionsi])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
