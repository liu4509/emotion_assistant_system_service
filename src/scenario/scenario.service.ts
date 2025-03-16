import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from './entities/scenario.entity';
import { Problem } from './entities/problems.entity';
import { Solution } from './entities/solution.entity';
import { CreateScenarioDto, UpdateScenarioDto } from './dto/scenario.dto';

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(Scenario)
    private scenarioRepository: Repository<Scenario>,
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    @InjectRepository(Solution)
    private solutionRepository: Repository<Solution>,
  ) {}

  // 初始化数据方法
  async initData(): Promise<void> {
    // 创建解决方案
    const solution1 = this.solutionRepository.create({
      content: '深呼吸，数到10',
      is_correct: true,
    });
    const solution2 = this.solutionRepository.create({
      content: '大声喊叫发泄情绪',
      is_correct: false,
    });
    const solution3 = this.solutionRepository.create({
      content: '与朋友交流感受',
      is_correct: true,
    });
    const solution4 = this.solutionRepository.create({
      content: '独自一人回避问题',
      is_correct: false,
    });
    const solution5 = this.solutionRepository.create({
      content: '尝试转移注意力',
      is_correct: true,
    });
    const solution6 = this.solutionRepository.create({
      content: '沉浸在负面情绪中',
      is_correct: false,
    });

    const savedSolution1 = await this.solutionRepository.save(solution1);
    const savedSolution2 = await this.solutionRepository.save(solution2);
    const savedSolution3 = await this.solutionRepository.save(solution3);
    const savedSolution4 = await this.solutionRepository.save(solution4);
    const savedSolution5 = await this.solutionRepository.save(solution5);
    const savedSolution6 = await this.solutionRepository.save(solution6);

    // 创建问题
    const problem1 = this.problemRepository.create({
      content: '当你感到愤怒时，以下哪种方式更有效？',
      order: 1,
      options: [savedSolution1, savedSolution2],
    });
    const problem2 = this.problemRepository.create({
      content: '当你感到焦虑时，以下哪种方式更有效？',
      order: 2,
      options: [savedSolution3, savedSolution4],
    });
    const problem3 = this.problemRepository.create({
      content: '当你感到悲伤时，以下哪种方式更有效？',
      order: 3,
      options: [savedSolution5, savedSolution6],
    });

    const savedProblem1 = await this.problemRepository.save(problem1);
    const savedProblem2 = await this.problemRepository.save(problem2);
    const savedProblem3 = await this.problemRepository.save(problem3);

    // 创建场景
    const scenario = this.scenarioRepository.create({
      title: '日常情绪调节场景',
      description: '这是一个帮助你学习如何在日常生活中调节情绪的场景',
      questions: [savedProblem1, savedProblem2, savedProblem3],
    });

    await this.scenarioRepository.save(scenario);
  }

  async findAll(): Promise<Scenario[]> {
    return this.scenarioRepository.find({
      relations: ['questions', 'questions.options'],
    });
  }

  async findOne(id: number): Promise<Scenario> {
    const scenario = await this.scenarioRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });

    if (!scenario) {
      throw new NotFoundException(`ID为 ${id} 的情绪调节场景未找到`);
    }

    return scenario;
  }

  async create(createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    const { title, description, questions } = createScenarioDto;

    // 创建场景
    const scenario = this.scenarioRepository.create({
      title,
      description,
      questions: [],
    });

    // 保存场景以获取ID
    const savedScenario = await this.scenarioRepository.save(scenario);

    // 创建问题和解决方案
    const problemEntities = [];
    for (const problemDto of questions) {
      // 创建解决方案
      const solutionEntities = [];
      for (const solutionDto of problemDto.options) {
        const solution = this.solutionRepository.create({
          content: solutionDto.content,
          is_correct: solutionDto.is_correct,
        });
        const savedSolution = await this.solutionRepository.save(solution);
        solutionEntities.push(savedSolution);
      }

      // 创建问题
      const problem = this.problemRepository.create({
        content: problemDto.content,
        order: problemDto.order,
        options: solutionEntities,
      });
      const savedProblem = await this.problemRepository.save(problem);
      problemEntities.push(savedProblem);
    }

    // 更新场景的问题
    savedScenario.questions = problemEntities;
    return this.scenarioRepository.save(savedScenario);
  }

  async update(
    id: number,
    updateScenarioDto: UpdateScenarioDto,
  ): Promise<Scenario> {
    const scenario = await this.findOne(id);

    // 更新基本字段
    if (updateScenarioDto.title) {
      scenario.title = updateScenarioDto.title;
    }
    if (updateScenarioDto.description) {
      scenario.description = updateScenarioDto.description;
    }

    // 如果提供了问题，则更新问题
    if (updateScenarioDto.questions) {
      // 获取现有问题的ID列表，用于后续删除不再使用的问题
      const existingProblemIds = scenario.questions.map(
        (problem) => problem.id,
      );
      const updatedProblemIds = [];

      // 处理更新的问题
      const updatedProblems = [];
      for (const problemDto of updateScenarioDto.questions) {
        let problem;
        // 如果问题有ID，则更新现有问题
        if ('id' in problemDto && typeof problemDto.id === 'number') {
          problem = await this.problemRepository.findOne({
            where: { id: problemDto.id },
            relations: ['options'],
          });
          if (problem) {
            if (problemDto.content) {
              problem.content = problemDto.content;
            }
            if (problemDto.order) {
              problem.order = problemDto.order;
            }
            updatedProblemIds.push(problem.id);

            // 如果提供了解决方案，则更新解决方案
            if (problemDto.options) {
              const existingSolutionIds = problem.options.map(
                (solution) => solution.id,
              );
              const updatedSolutionIds = [];

              // 处理更新的解决方案
              const updatedSolutions = [];
              for (const solutionDto of problemDto.options) {
                let solution;
                // 如果解决方案有ID，则更新现有解决方案
                if ('id' in solutionDto && typeof solutionDto.id === 'number') {
                  solution = await this.solutionRepository.findOne({
                    where: { id: solutionDto.id },
                  });
                  if (solution) {
                    if (solutionDto.content) {
                      solution.content = solutionDto.content;
                    }
                    if (solutionDto.is_correct !== undefined) {
                      solution.is_correct = solutionDto.is_correct;
                    }
                    updatedSolutionIds.push(solution.id);
                    updatedSolutions.push(
                      await this.solutionRepository.save(solution),
                    );
                  }
                } else {
                  // 创建新解决方案
                  solution = this.solutionRepository.create({
                    content: solutionDto.content,
                    is_correct: solutionDto.is_correct,
                  });
                  updatedSolutions.push(
                    await this.solutionRepository.save(solution),
                  );
                }
              }

              // 删除不再使用的解决方案
              for (const solutionId of existingSolutionIds) {
                if (!updatedSolutionIds.includes(solutionId)) {
                  await this.solutionRepository.delete(solutionId);
                }
              }

              problem.options = updatedSolutions;
            }

            updatedProblems.push(await this.problemRepository.save(problem));
          }
        } else {
          // 创建新问题和解决方案
          const solutionEntities = [];
          for (const solutionDto of problemDto.options) {
            const solution = this.solutionRepository.create({
              content: solutionDto.content,
              is_correct: solutionDto.is_correct,
            });
            solutionEntities.push(await this.solutionRepository.save(solution));
          }

          problem = this.problemRepository.create({
            content: problemDto.content,
            order: problemDto.order,
            options: solutionEntities,
          });
          updatedProblems.push(await this.problemRepository.save(problem));
        }
      }

      // 删除不再使用的问题
      for (const problemId of existingProblemIds) {
        if (!updatedProblemIds.includes(problemId)) {
          const problemToDelete = await this.problemRepository.findOne({
            where: { id: problemId },
            relations: ['options'],
          });
          if (problemToDelete) {
            // 删除问题的解决方案
            for (const solution of problemToDelete.options) {
              await this.solutionRepository.delete(solution.id);
            }
            await this.problemRepository.delete(problemId);
          }
        }
      }

      scenario.questions = updatedProblems;
    }

    return this.scenarioRepository.save(scenario);
  }

  async remove(id: number): Promise<void> {
    const scenario = await this.findOne(id);

    // 删除问题和解决方案
    for (const problem of scenario.questions) {
      // 删除问题的解决方案
      for (const solution of problem.options) {
        await this.solutionRepository.delete(solution.id);
      }
      await this.problemRepository.delete(problem.id);
    }

    // 删除场景
    await this.scenarioRepository.remove(scenario);
  }
}
