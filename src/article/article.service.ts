import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // 初始化数据方法
  async initData(): Promise<void> {
    // 查找分类
    const veryPositive = await this.categoryRepository.findBy({
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
    const veryNegative = await this.categoryRepository.findBy({
      value: In(['very_negative']),
    });

    // 创建文章数据
    const article1 = this.articleRepository.create({
      title: '如何缓解焦虑情绪',
      content: `焦虑是一种常见的情绪反应，当我们面对不确定的情况或压力时，会产生焦虑感。
    以下是几种有效的缓解方法：

    1. 深呼吸练习
    通过缓慢的深呼吸，可以帮助我们平静下来。具体步骤如下：
    - 找一个安静的地方，采取舒适的坐姿
    - 缓慢吸气，数到4
    - 屏住呼吸，数到4
    - 缓慢呼气，数到4
    - 重复以上步骤

    2. 正念冥想
    正念冥想可以帮助我们专注于当下，而不是沉浸在焦虑中：
    - 闭上眼睛，关注呼吸
    - 观察当下的感受，不做评判
    - 当注意力分散时，温和地把它带回到呼吸上

    3. 运动
    适度的运动可以：
    - 释放压力
    - 产生快乐激素
    - 改善睡眠质量

    4. 与人交流
    与信任的人分享你的感受，这样可以：
    - 获得情感支持
    - 得到新的视角
    - 减轻心理负担

    记住，焦虑是正常的情绪反应，关键是学会如何与之相处。如果焦虑严重影响到日常生活，建议寻求专业心理咨询师的帮助。`,
      cover:
        'https://img.freepik.com/free-photo/woman-meditating-beach_23-2148739082.jpg',
      description: '本文将介绍几种实用的焦虑情绪缓解方法...',
      categorys: veryPositive,
    });

    const article2 = this.articleRepository.create({
      title: '正念冥想入门指南',
      content: `正念冥想是一种源自古老佛教传统的练习，现在已被科学研究证明对心理健康有积极影响。

    什么是正念冥想？
    正念冥想是指有意识地、不带评判地关注当下的体验。它帮助我们摆脱对过去的遗憾和对未来的担忧，专注于此时此刻。

    基础练习步骤：
    1. 找一个安静的地方，采取舒适的坐姿
    2. 设定一个计时器（初学者可以从5分钟开始）
    3. 闭上眼睛或轻轻低垂目光
    4. 将注意力集中在呼吸上
    5. 当思绪漫游时，温和地将注意力带回呼吸

    科学证明的好处：
    - 减轻压力和焦虑
    - 改善注意力和集中力
    - 增强情绪调节能力
    - 提高自我意识

    坚持是关键。每天练习，即使只有几分钟，也会带来显著的变化。`,
      cover:
        'https://img.freepik.com/free-photo/woman-practicing-yoga-beach_23-2148739083.jpg',
      description:
        '正念冥想是一种有效的减压方法，本文将介绍基础的正念冥想技巧...',
      categorys: positive,
    });

    const article3 = this.articleRepository.create({
      title: '如何缓解焦虑情绪',
      content: `焦虑是一种常见的情绪反应，当我们面对不确定的情况或压力时，会产生焦虑感。
    以下是几种有效的缓解方法：

    1. 深呼吸练习
    通过缓慢的深呼吸，可以帮助我们平静下来。具体步骤如下：
    - 找一个安静的地方，采取舒适的坐姿
    - 缓慢吸气，数到4
    - 屏住呼吸，数到4
    - 缓慢呼气，数到4
    - 重复以上步骤

    2. 正念冥想
    正念冥想可以帮助我们专注于当下，而不是沉浸在焦虑中：
    - 闭上眼睛，关注呼吸
    - 观察当下的感受，不做评判
    - 当注意力分散时，温和地把它带回到呼吸上

    3. 运动
    适度的运动可以：
    - 释放压力
    - 产生快乐激素
    - 改善睡眠质量

    4. 与人交流
    与信任的人分享你的感受，这样可以：
    - 获得情感支持
    - 得到新的视角
    - 减轻心理负担

    记住，焦虑是正常的情绪反应，关键是学会如何与之相处。如果焦虑严重影响到日常生活，建议寻求专业心理咨询师的帮助。`,
      cover:
        'https://img.freepik.com/free-photo/woman-meditating-beach_23-2148739082.jpg',
      description: '本文将介绍几种实用的焦虑情绪缓解方法...',
      categorys: neutral,
    });

    const article4 = this.articleRepository.create({
      title: '正念冥想入门指南',
      content: `正念冥想是一种源自古老佛教传统的练习，现在已被科学研究证明对心理健康有积极影响。

    什么是正念冥想？
    正念冥想是指有意识地、不带评判地关注当下的体验。它帮助我们摆脱对过去的遗憾和对未来的担忧，专注于此时此刻。

    基础练习步骤：
    1. 找一个安静的地方，采取舒适的坐姿
    2. 设定一个计时器（初学者可以从5分钟开始）
    3. 闭上眼睛或轻轻低垂目光
    4. 将注意力集中在呼吸上
    5. 当思绪漫游时，温和地将注意力带回呼吸

    科学证明的好处：
    - 减轻压力和焦虑
    - 改善注意力和集中力
    - 增强情绪调节能力
    - 提高自我意识

    坚持是关键。每天练习，即使只有几分钟，也会带来显著的变化。`,
      cover:
        'https://img.freepik.com/free-photo/woman-practicing-yoga-beach_23-2148739083.jpg',
      description:
        '正念冥想是一种有效的减压方法，本文将介绍基础的正念冥想技巧...',
      categorys: negative,
    });

    const article5 = this.articleRepository.create({
      title: '如何缓解焦虑情绪',
      content: `焦虑是一种常见的情绪反应，当我们面对不确定的情况或压力时，会产生焦虑感。
    以下是几种有效的缓解方法：

    1. 深呼吸练习
    通过缓慢的深呼吸，可以帮助我们平静下来。具体步骤如下：
    - 找一个安静的地方，采取舒适的坐姿
    - 缓慢吸气，数到4
    - 屏住呼吸，数到4
    - 缓慢呼气，数到4
    - 重复以上步骤

    2. 正念冥想
    正念冥想可以帮助我们专注于当下，而不是沉浸在焦虑中：
    - 闭上眼睛，关注呼吸
    - 观察当下的感受，不做评判
    - 当注意力分散时，温和地把它带回到呼吸上

    3. 运动
    适度的运动可以：
    - 释放压力
    - 产生快乐激素
    - 改善睡眠质量

    4. 与人交流
    与信任的人分享你的感受，这样可以：
    - 获得情感支持
    - 得到新的视角
    - 减轻心理负担

    记住，焦虑是正常的情绪反应，关键是学会如何与之相处。如果焦虑严重影响到日常生活，建议寻求专业心理咨询师的帮助。`,
      cover:
        'https://img.freepik.com/free-photo/woman-meditating-beach_23-2148739082.jpg',
      description: '本文将介绍几种实用的焦虑情绪缓解方法...',
      categorys: veryNegative,
    });

    // 保存文章数据
    await this.articleRepository.save([
      article1,
      article2,
      article3,
      article4,
      article5,
    ]);
  }

  async findAll(pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;
    const [article, totalCount] = await this.articleRepository.findAndCount({
      skip: skipCount,
      take: pageSize,
      relations: {
        categorys: true,
      },
    });

    return {
      article,
      totalCount,
    };
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['categorys'],
    });

    if (!article) {
      throw new NotFoundException(`ID为 ${id} 的文章未找到`);
    }

    return article;
  }

  async findByCategory(categoryValue: string): Promise<Article[]> {
    return this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categorys', 'category')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { title, content, cover, description, categoryValues } =
      createArticleDto;

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新文章
    const article = this.articleRepository.create({
      title,
      content,
      cover,
      description,
      categorys: categories,
    });

    return this.articleRepository.save(article);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    // 更新基本字段
    if (updateArticleDto.title) {
      article.title = updateArticleDto.title;
    }
    if (updateArticleDto.content) {
      article.content = updateArticleDto.content;
    }
    if (updateArticleDto.cover) {
      article.cover = updateArticleDto.cover;
    }
    if (updateArticleDto.description) {
      article.description = updateArticleDto.description;
    }

    // 如果提供了分类，则更新分类
    if (
      updateArticleDto.categoryValues &&
      updateArticleDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateArticleDto.categoryValues),
      });
      article.categorys = categories;
    }

    return this.articleRepository.save(article);
  }

  async remove(id: number): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }
}
