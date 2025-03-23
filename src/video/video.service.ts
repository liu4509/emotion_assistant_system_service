import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
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

    // 创建视频数据
    const video1 = this.videoRepository.create({
      title: '阳光沙滩',
      url: 'http://vjs.zencdn.net/v/oceans.mp4',
      cover: 'https://img.picui.cn/free/2024/11/10/672fbdd53238b.jpg',
      description: '放松心情的海边风景',
      categorys: veryPositive,
    });

    const video2 = this.videoRepository.create({
      title: '如何进行情绪管理',
      url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
      cover: 'https://img.picui.cn/free/2025/03/15/67d55f3c29600.png',
      description: '本视频介绍了几种实用的情绪管理技巧...',
      categorys: positive,
    });
    const video3 = this.videoRepository.create({
      title: '阳光沙滩',
      url: 'http://vjs.zencdn.net/v/oceans.mp4',
      cover: 'https://img.picui.cn/free/2024/11/10/672fbdd53238b.jpg',
      description: '放松心情的海边风景',
      categorys: neutral,
    });

    const video4 = this.videoRepository.create({
      title: '如何进行情绪管理',
      url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
      cover: 'https://img.picui.cn/free/2025/03/15/67d55f3c29600.png',
      description: '本视频介绍了几种实用的情绪管理技巧...',
      categorys: negative,
    });

    const video5 = this.videoRepository.create({
      title: '如何进行情绪管理',
      url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
      cover: 'https://img.picui.cn/free/2025/03/15/67d55f3c29600.png',
      description: '本视频介绍了几种实用的情绪管理技巧...',
      categorys: veryNegative,
    });

    // 保存视频数据
    await this.videoRepository.save([video1, video2, video3, video4, video5]);
  }

  async findAll(pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;
    const [article, totalCount] = await this.videoRepository.findAndCount({
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

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['categorys'],
    });

    if (!video) {
      throw new NotFoundException(`ID为 ${id} 的视频未找到`);
    }

    return video;
  }

  async findByCategory(categoryValue: string): Promise<Video[]> {
    return this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.categorys', 'category')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const { title, url, cover, description, categoryValues } = createVideoDto;

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新视频
    const video = this.videoRepository.create({
      title,
      url,
      cover,
      description,
      categorys: categories,
    });

    return this.videoRepository.save(video);
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);

    // 更新基本字段
    if (updateVideoDto.title) video.title = updateVideoDto.title;
    if (updateVideoDto.url) video.url = updateVideoDto.url;
    if (updateVideoDto.cover) video.cover = updateVideoDto.cover;
    if (updateVideoDto.description) {
      video.description = updateVideoDto.description;
    }

    // 如果提供了分类，则更新分类
    if (
      updateVideoDto.categoryValues &&
      updateVideoDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateVideoDto.categoryValues),
      });
      video.categorys = categories;
    }

    return this.videoRepository.save(video);
  }

  async remove(id: number): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
  }
}
