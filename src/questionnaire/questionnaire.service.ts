import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { Question } from './entities/question.entity';
import { Optionsi } from './entities/optioni.entity';
import {
  CreateQuestionnaireDto,
  UpdateQuestionnaireDto,
} from './dto/questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Optionsi)
    private optionRepository: Repository<Optionsi>,
  ) {}

  // 初始化数据方法
  async initData(): Promise<void> {
    // 创建选项
    const option1 = this.optionRepository.create({
      content: '非常不同意',
      score: 1,
    });
    const option2 = this.optionRepository.create({
      content: '不同意',
      score: 2,
    });
    const option3 = this.optionRepository.create({
      content: '一般',
      score: 3,
    });
    const option4 = this.optionRepository.create({
      content: '同意',
      score: 4,
    });
    const option5 = this.optionRepository.create({
      content: '非常同意',
      score: 5,
    });

    const savedOption1 = await this.optionRepository.save(option1);
    const savedOption2 = await this.optionRepository.save(option2);
    const savedOption3 = await this.optionRepository.save(option3);
    const savedOption4 = await this.optionRepository.save(option4);
    const savedOption5 = await this.optionRepository.save(option5);

    // 创建问题
    const question1 = this.questionRepository.create({
      content: '我经常感到心情愉快？',
      options: [
        savedOption1,
        savedOption2,
        savedOption3,
        savedOption4,
        savedOption5,
      ],
    });
    const question2 = this.questionRepository.create({
      content: '我能够很好地控制自己的情绪？',
      options: [
        savedOption1,
        savedOption2,
        savedOption3,
        savedOption4,
        savedOption5,
      ],
    });
    const question3 = this.questionRepository.create({
      content: '我经常感到压力很大？',
      options: [
        savedOption1,
        savedOption2,
        savedOption3,
        savedOption4,
        savedOption5,
      ],
    });
    const question4 = this.questionRepository.create({
      content: '您对未来的态度是乐观的还是悲观的？',
      options: [
        savedOption1,
        savedOption2,
        savedOption3,
        savedOption4,
        savedOption5,
      ],
    });
    const question5 = this.questionRepository.create({
      content: '您现在是否有压力感？',
      options: [
        savedOption1,
        savedOption2,
        savedOption3,
        savedOption4,
        savedOption5,
      ],
    });

    const savedQuestion1 = await this.questionRepository.save(question1);
    const savedQuestion2 = await this.questionRepository.save(question2);
    const savedQuestion3 = await this.questionRepository.save(question3);
    const savedQuestion4 = await this.questionRepository.save(question4);
    const savedQuestion5 = await this.questionRepository.save(question5);

    // 创建问卷
    const questionnaire = this.questionnaireRepository.create({
      title: '情绪健康评估问卷',
      description: '这是一份用于评估情绪健康状况的问卷',
      questions: [
        savedQuestion1,
        savedQuestion2,
        savedQuestion3,
        savedQuestion4,
        savedQuestion5,
      ],
    });

    await this.questionnaireRepository.save(questionnaire);
  }

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireRepository.find({
      relations: ['questions', 'questions.options'],
    });
  }

  async findOne(id: number): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });

    if (!questionnaire) {
      throw new NotFoundException(`ID为 ${id} 的问卷未找到`);
    }

    return questionnaire;
  }

  async create(
    createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    const { title, description, questions } = createQuestionnaireDto;

    // 创建问卷
    const questionnaire = this.questionnaireRepository.create({
      title,
      description,
      questions: [],
    });

    // 保存问卷以获取ID
    const savedQuestionnaire =
      await this.questionnaireRepository.save(questionnaire);

    // 创建问题和选项
    const questionEntities = [];
    for (const questionDto of questions) {
      // 创建选项
      const optionEntities = [];
      for (const optionDto of questionDto.options) {
        const option = this.optionRepository.create({
          content: optionDto.content,
          score: optionDto.score,
        });
        const savedOption = await this.optionRepository.save(option);
        optionEntities.push(savedOption);
      }

      // 创建问题
      const question = this.questionRepository.create({
        content: questionDto.content,
        options: optionEntities,
      });
      const savedQuestion = await this.questionRepository.save(question);
      questionEntities.push(savedQuestion);
    }

    // 更新问卷的问题
    savedQuestionnaire.questions = questionEntities;
    return this.questionnaireRepository.save(savedQuestionnaire);
  }

  async update(
    id: number,
    updateQuestionnaireDto: UpdateQuestionnaireDto,
  ): Promise<Questionnaire> {
    const questionnaire = await this.findOne(id);

    // 更新基本字段
    if (updateQuestionnaireDto.title) {
      questionnaire.title = updateQuestionnaireDto.title;
    }
    if (updateQuestionnaireDto.description) {
      questionnaire.description = updateQuestionnaireDto.description;
    }

    // 如果提供了问题，则更新问题
    if (updateQuestionnaireDto.questions) {
      // 获取现有问题的ID列表，用于后续删除不再使用的问题
      const existingQuestionIds = questionnaire.questions.map(
        (question) => question.id,
      );
      const updatedQuestionIds = [];

      // 处理更新的问题
      const updatedQuestions = [];
      for (const questionDto of updateQuestionnaireDto.questions) {
        let question;
        // 如果问题有ID，则更新现有问题
        if ('id' in questionDto && typeof questionDto.id === 'number') {
          question = await this.questionRepository.findOne({
            where: { id: questionDto.id },
            relations: ['options'],
          });
          if (question) {
            if (questionDto.content) {
              question.content = questionDto.content;
            }
            updatedQuestionIds.push(question.id);

            // 如果提供了选项，则更新选项
            if (questionDto.options) {
              const existingOptionIds = question.options.map(
                (option) => option.id,
              );
              const updatedOptionIds = [];

              // 处理更新的选项
              const updatedOptions = [];
              for (const optionDto of questionDto.options) {
                let option;
                // 如果选项有ID，则更新现有选项
                if ('id' in optionDto && typeof optionDto.id === 'number') {
                  option = await this.optionRepository.findOne({
                    where: { id: optionDto.id },
                  });
                  if (option) {
                    if (optionDto.content) {
                      option.content = optionDto.content;
                    }
                    if (optionDto.score !== undefined) {
                      option.score = optionDto.score;
                    }
                    updatedOptionIds.push(option.id);
                    updatedOptions.push(
                      await this.optionRepository.save(option),
                    );
                  }
                } else {
                  // 创建新选项
                  option = this.optionRepository.create({
                    content: optionDto.content,
                    score: optionDto.score,
                  });
                  updatedOptions.push(await this.optionRepository.save(option));
                }
              }

              // 删除不再使用的选项
              for (const optionId of existingOptionIds) {
                if (!updatedOptionIds.includes(optionId)) {
                  await this.optionRepository.delete(optionId);
                }
              }

              question.options = updatedOptions;
            }

            updatedQuestions.push(await this.questionRepository.save(question));
          }
        } else {
          // 创建新问题和选项
          const optionEntities = [];
          for (const optionDto of questionDto.options) {
            const option = this.optionRepository.create({
              content: optionDto.content,
              score: optionDto.score,
            });
            optionEntities.push(await this.optionRepository.save(option));
          }

          question = this.questionRepository.create({
            content: questionDto.content,
            options: optionEntities,
          });
          updatedQuestions.push(await this.questionRepository.save(question));
        }
      }

      // 删除不再使用的问题
      for (const questionId of existingQuestionIds) {
        if (!updatedQuestionIds.includes(questionId)) {
          const questionToDelete = await this.questionRepository.findOne({
            where: { id: questionId },
            relations: ['options'],
          });
          if (questionToDelete) {
            // 删除问题的选项
            for (const option of questionToDelete.options) {
              await this.optionRepository.delete(option.id);
            }
            await this.questionRepository.delete(questionId);
          }
        }
      }

      questionnaire.questions = updatedQuestions;
    }

    return this.questionnaireRepository.save(questionnaire);
  }

  async remove(id: number): Promise<void> {
    const questionnaire = await this.findOne(id);

    // 删除问题和选项
    for (const question of questionnaire.questions) {
      // 删除问题的选项
      for (const option of question.options) {
        await this.optionRepository.delete(option.id);
      }
      await this.questionRepository.delete(question.id);
    }

    // 删除问卷
    await this.questionnaireRepository.remove(questionnaire);
  }
}
