import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Attraction } from './entities/attraction.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // 初始数据
  async initData() {
    // 景点
    const attraction1 = new Attraction();
    attraction1.title = '美丽的西湖';
    attraction1.image =
      'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png';
    attraction1.details =
      '西湖景区包含了丰富的自然和人文景观，是杭州市的标志性景点之一。景区内有断桥残雪、平湖秋月等著名景点...';
    const attraction2 = new Attraction();
    attraction2.title = '美丽的西湖';
    attraction2.image = 'https://cdn.picui.cn/vip/2025/02/16/67b1f3d628c67.jpg';
    attraction2.details =
      '西湖景区包含了丰富的自然和人文景观，是杭州市的标志性景点之一。景区内有断桥残雪、平湖秋月等著名景点...';
    const attraction3 = new Attraction();
    attraction3.title = '美丽的西湖';
    attraction3.image = 'https://cdn.picui.cn/vip/2025/01/24/679332c414c07.jpg';
    attraction3.details =
      '西湖景区包含了丰富的自然和人文景观，是杭州市的标志性景点之一。景区内有断桥残雪、平湖秋月等著名景点...';
    const attraction4 = new Attraction();
    attraction4.title = '美丽的西湖';
    attraction4.image =
      'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png';
    attraction4.details =
      '西湖景区包含了丰富的自然和人文景观，是杭州市的标志性景点之一。景区内有断桥残雪、平湖秋月等著名景点...';
    // 分类
    const category1 = new Category();
    category1.value = 'very_positive';
    category1.label = '非常积极';
    const category2 = new Category();
    category2.value = 'positive';
    category2.label = '积极';
    const category3 = new Category();
    category3.value = 'neutral';
    category3.label = '中立';
    const category4 = new Category();
    category4.value = 'negative';
    category4.label = '消极';
    const category5 = new Category();
    category5.value = 'very_negative';
    category5.label = '非常消极';

    // 将分类放入景点
    attraction1.categorys = [category1];
    attraction2.categorys = [category2];
    attraction3.categorys = [category3];
    attraction4.categorys = [category4];

    // 保存分类
    await this.categoryRepository.save([
      category1,
      category2,
      category3,
      category4,
      category5,
    ]);
    // 保存景点
    await this.attractionRepository.save([
      attraction1,
      attraction2,
      attraction3,
      attraction4,
    ]);
  }

  async findAll(): Promise<Attraction[]> {
    return this.attractionRepository.find({
      relations: ['categorys'],
    });
  }

  async findOne(id: number): Promise<Attraction> {
    const attraction = await this.attractionRepository.findOne({
      where: { id },
      relations: ['categorys'],
    });

    if (!attraction) {
      throw new NotFoundException(`ID为 ${id} 的景点未找到`);
    }

    return attraction;
  }

  async findByCategory(categoryValue: string): Promise<Attraction[]> {
    return this.attractionRepository
      .createQueryBuilder('attraction')
      .leftJoinAndSelect('attraction.categorys', 'category')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async create(createAttractionDto: {
    title: string;
    details: string;
    image: string;
    categoryValues: string[];
  }): Promise<Attraction> {
    const { title, details, image, categoryValues } = createAttractionDto;

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新景点
    const attraction = this.attractionRepository.create({
      title,
      details,
      image,
      categorys: categories,
    });

    return this.attractionRepository.save(attraction);
  }

  async update(
    id: number,
    updateAttractionDto: {
      title?: string;
      details?: string;
      image?: string;
      categoryValues?: string[];
    },
  ): Promise<Attraction> {
    const attraction = await this.findOne(id);

    // 更新基本字段
    if (updateAttractionDto.title) attraction.title = updateAttractionDto.title;
    if (updateAttractionDto.details)
      attraction.details = updateAttractionDto.details;
    if (updateAttractionDto.image) attraction.image = updateAttractionDto.image;

    // 如果提供了分类，则更新分类
    if (
      updateAttractionDto.categoryValues &&
      updateAttractionDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateAttractionDto.categoryValues),
      });
      attraction.categorys = categories;
    }

    return this.attractionRepository.save(attraction);
  }

  async remove(id: number): Promise<void> {
    const attraction = await this.findOne(id);
    await this.attractionRepository.remove(attraction);
  }
}
