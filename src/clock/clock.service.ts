import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Clock } from './entities/clocks.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { User } from 'src/user/entities/User.entity';
import { CreateClockDto, UpdateClockDto } from './dto/clock.dto';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(Clock)
    private clockRepository: Repository<Clock>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 初始数据
  async initData() {
    const clock1 = new Clock();
    const clock2 = new Clock();
    const clock3 = new Clock();
    const clock4 = new Clock();
    const clock5 = new Clock();
    const clock6 = new Clock();
    const clock7 = new Clock();

    clock1.image = 'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png';
    clock2.image = 'https://img.picui.cn/free/2025/02/20/67b6eaddd1aa9.jpg';
    clock3.image = 'https://img.picui.cn/free/2025/01/25/679422be838f3.png';
    clock4.image = 'https://img.picui.cn/free/2024/11/04/6728a6c956362.png';
    clock5.image = 'https://img.picui.cn/free/2024/11/04/6728a6a145e9e.png';
    clock6.image = 'https://img.picui.cn/free/2025/01/25/679428ddcabd1.png';
    clock7.image = 'https://img.picui.cn/free/2025/01/25/6794231281d95.png';

    const very_positive = await this.categoryRepository.findBy({
      value: In(['very_positive']),
    });
    const positive = await this.categoryRepository.findBy({
      value: In(['positive']),
    });
    const neutral = await this.categoryRepository.findBy({
      value: In(['neutral']),
    });
    const negative = await this.categoryRepository.findBy({
      value: In(['negative']),
    });
    const very_negative = await this.categoryRepository.findBy({
      value: In(['very_negative']),
    });

    const user1 = await this.userRepository.findBy({
      id: 3,
    });
    const user2 = await this.userRepository.findBy({
      id: 4,
    });

    clock1.categorys = [very_positive[0]];
    clock2.categorys = [positive[0]];
    clock3.categorys = [neutral[0]];
    clock4.categorys = [negative[0]];
    clock5.categorys = [very_negative[0]];
    clock6.categorys = [positive[0]];
    clock7.categorys = [very_positive[0]];

    clock1.user = user1[0];
    clock2.user = user2[0];
    clock3.user = user1[0];
    clock4.user = user2[0];
    clock5.user = user1[0];
    clock6.user = user2[0];
    clock7.user = user1[0];

    await this.clockRepository.save([
      clock1,
      clock2,
      clock3,
      clock4,
      clock5,
      clock6,
      clock7,
    ]);
  }

  async findAll(): Promise<Clock[]> {
    return this.clockRepository.find({
      relations: ['categorys', 'user'],
    });
  }

  async findOne(id: number): Promise<Clock> {
    const clock = await this.clockRepository.findOne({
      where: { id },
      relations: ['categorys', 'user'],
    });

    if (!clock) {
      throw new NotFoundException(`ID为 ${id} 的打卡照片未找到`);
    }

    return clock;
  }

  async findByCategory(categoryValue: string): Promise<Clock[]> {
    return this.clockRepository
      .createQueryBuilder('clock')
      .leftJoinAndSelect('clock.categorys', 'category')
      .leftJoinAndSelect('clock.user', 'user')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async findByUser(userId: number): Promise<Clock[]> {
    return this.clockRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['categorys', 'user'],
    });
  }

  async create(userId: number, createClockDto: CreateClockDto): Promise<Clock> {
    const { image, categoryValues } = createClockDto;

    // 查找用户
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`ID为 ${userId} 的用户未找到`);
    }

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新打卡照片
    const clock = this.clockRepository.create({
      image,
      user,
      categorys: categories,
    });

    return this.clockRepository.save(clock);
  }

  async update(
    id: number,
    userId: number,
    updateClockDto: UpdateClockDto,
  ): Promise<Clock> {
    const clock = await this.clockRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['categorys', 'user'],
    });

    if (!clock) {
      throw new NotFoundException(`ID为 ${id} 的打卡照片未找到或不属于该用户`);
    }

    // 更新基本字段
    if (updateClockDto.image) {
      clock.image = updateClockDto.image;
    }

    // 如果提供了分类，则更新分类
    if (
      updateClockDto.categoryValues &&
      updateClockDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateClockDto.categoryValues),
      });
      clock.categorys = categories;
    }

    return this.clockRepository.save(clock);
  }

  async remove(id: number, userId: number): Promise<void> {
    const clock = await this.clockRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!clock) {
      throw new NotFoundException(`ID为 ${id} 的打卡照片未找到或不属于该用户`);
    }

    await this.clockRepository.remove(clock);
  }
}
