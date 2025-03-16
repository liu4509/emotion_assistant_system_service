import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Diarie } from './entities/diarie.entity';
import { Mood } from './entities/mood.entity';
import { User } from 'src/user/entities/User.entity';
import { CreateDiarieDto, UpdateDiarieDto } from './dto/diarie.dto';

@Injectable()
export class DiarieService {
  constructor(
    @InjectRepository(Diarie)
    private diarieRepository: Repository<Diarie>,
    @InjectRepository(Mood)
    private moodRepository: Repository<Mood>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 初始化数据方法
  async initData(): Promise<void> {
    // 创建情绪数据
    const happy = this.moodRepository.create({
      value: 'happy',
      label: '😊 快乐',
      score: 4,
    });
    const bliss = this.moodRepository.create({
      value: 'bliss',
      label: '😇 幸福',
      score: 5,
    });
    const excited = this.moodRepository.create({
      value: 'excited',
      label: '🤩 兴奋',
      score: 4,
    });
    const content = this.moodRepository.create({
      value: 'content',
      label: '😌 满足',
      score: 3,
    });
    const relaxed = this.moodRepository.create({
      value: 'relaxed',
      label: '🛀 轻松',
      score: 3,
    });
    const calm = this.moodRepository.create({
      value: 'calm',
      label: '🧘 平静',
      score: 1,
    });
    const tired = this.moodRepository.create({
      value: 'tired',
      label: '😴 疲惫',
      score: -1,
    });
    const anxious = this.moodRepository.create({
      value: 'anxious',
      label: '😰 焦虑',
      score: -2,
    });
    const frustrated = this.moodRepository.create({
      value: 'frustrated',
      label: '😞 沮丧',
      score: -2,
    });
    const sad = this.moodRepository.create({
      value: 'sad',
      label: '😢 难过',
      score: -3,
    });
    const grief = this.moodRepository.create({
      value: 'grief',
      label: '😭 悲伤',
      score: -5,
    });
    const angry = this.moodRepository.create({
      value: 'angry',
      label: '😠 愤怒',
      score: -5,
    });

    await this.moodRepository.save([
      happy,
      bliss,
      excited,
      content,
      relaxed,
      calm,
      tired,
      anxious,
      frustrated,
      sad,
      grief,
      angry,
    ]);

    // 查找用户（假设ID为1的用户存在）
    const user = await this.userRepository.findBy({
      username: 'lzb',
    });
    console.log(user);

    if (user) {
      // 创建日记数据
      const diarie1 = this.diarieRepository.create({
        content:
          '今天是美好的一天，完成了所有工作，还有时间去健身房锻炼。感觉充满活力！',
        user: user[0],
        moods: [happy],
      });

      const diarie2 = this.diarieRepository.create({
        content:
          '今天和朋友一起吃了午餐，聊了很多有趣的事情。下午工作效率也很高。',
        user: user[0],
        moods: [happy],
      });

      const diarie3 = this.diarieRepository.create({
        content: '今天是普通的一天，没有特别的事情发生。按部就班地完成了工作。',
        user: user[0],
        moods: [content],
      });

      const diarie4 = this.diarieRepository.create({
        content: '今天工作中遇到了一些问题，花了很长时间才解决。感觉有点疲惫。',
        user: user[0],
        moods: [sad],
      });

      const diarie5 = this.diarieRepository.create({
        content: '今天收到了一个坏消息，心情非常低落。希望明天会好起来。',
        user: user[0],
        moods: [grief],
      });

      await this.diarieRepository.save([
        diarie1,
        diarie2,
        diarie3,
        diarie4,
        diarie5,
      ]);
    }
  }

  async findAll(): Promise<Diarie[]> {
    return this.diarieRepository.find({
      relations: ['moods', 'user'],
    });
  }

  async findOne(id: number): Promise<Diarie> {
    const diarie = await this.diarieRepository.findOne({
      where: { id },
      relations: ['moods', 'user'],
    });

    if (!diarie) {
      throw new NotFoundException(`ID为 ${id} 的日记未找到`);
    }

    return diarie;
  }

  async findByMood(moodValue: string): Promise<Diarie[]> {
    return this.diarieRepository
      .createQueryBuilder('diarie')
      .leftJoinAndSelect('diarie.moods', 'mood')
      .leftJoinAndSelect('diarie.user', 'user')
      .where('mood.value = :moodValue', { moodValue })
      .getMany();
  }

  async findByUser(userId: number): Promise<Diarie[]> {
    return this.diarieRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['moods', 'user'],
    });
  }

  async create(
    userId: number,
    createDiarieDto: CreateDiarieDto,
  ): Promise<Diarie> {
    const { content, moodValues } = createDiarieDto;

    // 查找用户
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`ID为 ${userId} 的用户未找到`);
    }

    // 查找情绪
    const moods = await this.moodRepository.findBy({
      value: In(moodValues),
    });

    // 创建新日记
    const diarie = this.diarieRepository.create({
      content,
      user,
      moods,
    });

    return this.diarieRepository.save(diarie);
  }

  async update(
    id: number,
    userId: number,
    updateDiarieDto: UpdateDiarieDto,
  ): Promise<Diarie> {
    const diarie = await this.diarieRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['moods', 'user'],
    });

    if (!diarie) {
      throw new NotFoundException(`ID为 ${id} 的日记未找到或不属于该用户`);
    }

    // 更新基本字段
    if (updateDiarieDto.content) {
      diarie.content = updateDiarieDto.content;
    }

    // 如果提供了情绪，则更新情绪
    if (updateDiarieDto.moodValues && updateDiarieDto.moodValues.length > 0) {
      const moods = await this.moodRepository.findBy({
        value: In(updateDiarieDto.moodValues),
      });
      diarie.moods = moods;
    }

    return this.diarieRepository.save(diarie);
  }

  async remove(id: number, userId: number): Promise<void> {
    const diarie = await this.diarieRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!diarie) {
      throw new NotFoundException(`ID为 ${id} 的日记未找到或不属于该用户`);
    }

    await this.diarieRepository.remove(diarie);
  }
}
