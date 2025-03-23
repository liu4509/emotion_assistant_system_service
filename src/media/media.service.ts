import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { CreateMediaDto, UpdateMediaDto } from './dto/media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
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

    // 创建音频数据
    const media1 = this.mediaRepository.create({
      title: '罗生门',
      artist: '梨冻紧',
      cover:
        'https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=300y300',
      url: 'https://m701.music.126.net/20250315024344/c8cb579fd705785f686572577d673500/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096444542/bafc/a068/39f8/9a9e06e5634410b5e7e81df24749e656.mp3?vuutv=bDsTdetX9dDLrxN0LKNDawGMz7NHsfWdE09z4GH355ZoycsapBVc7v9tFcq3pOpZ239KqN1Mjl3rSqIumAyCwh8PPpMYn+lnxUlPON7iqRw=',
      duration: 180, // 180秒
      description: '轻快的春日旋律',
      categorys: veryPositive,
    });

    const media2 = this.mediaRepository.create({
      title: '跳楼机',
      artist: 'LBI利比',
      cover:
        'https://p1.music.126.net/cmoE8PsdK_Yn9VJ8ZVCGrw==/109951170507596121.jpg?param=300y300',
      url: 'https://m801.music.126.net/20250315024228/93e460f38dad08573524b483634a83fb/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/58134116941/6d6c/bb3f/6897/4ed130b22b010e87bf19ae65fe18eeb1.mp3?vuutv=IdV3izetV5ILp5SRo9iyi8nBKBiHinv4q6arzbQCY10KuNjuAgBJGVmsJ8M0DVPDCP3TqI1sEbThycfgjMyVUYZmjCh5rWN7/oc86GWc2zU=',
      duration: 180, // 15分钟
      description: '大自然的声音与轻柔的音乐相结合，帮助你放松身心，缓解压力。',
      categorys: positive,
    });

    const media3 = this.mediaRepository.create({
      title: '于是',
      artist: '郑润泽',
      cover:
        'https://p2.music.126.net/PEGvmO3OqgGOkx4m9qxAJA==/109951163478499713.jpg?param=300y300',
      url: 'https://m801.music.126.net/20250315030232/66656a294ed786876098f6cbd3d40abe/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481680626/8c3f/dd57/4c1c/84333f57c88a35512dd3ba34a1a1816f.mp3?vuutv=1Q7TlkDNq5Q4m+jVjA/G8luIw34qlYZTSqpHd4wW52vDNGvAGs0/DTN5vbgXbaClOUQsJouh/v93gYGPdhwYl4u9UzalKRya4Li3bf8/9nVZhzWMoWRjCTG6ZQqySfbo',
      duration: 180, // 30分钟
      description: '这段音乐设计用于提高专注力，适合工作或学习时聆听。',
      categorys: neutral,
    });

    const media4 = this.mediaRepository.create({
      title: '一点',
      artist: 'Muyoi',
      cover:
        'https://p2.music.126.net/PiSqUS2bxc9x2Zbz2vt4sQ==/109951170099752710.jpg?param=300y300',
      url: 'https://m701.music.126.net/20250315030438/9283980ef70434d81d9041f30cf4febb/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/56768143391/d2fa/11cb/8724/33adbb19242520ec4597253da0db0a9a.mp3?vuutv=fFYQNyAWqV/b+PdJ1PjdN04VHuhiq+t7zKm/6bwEyTwdOgoiPzgKoiEVgB9yR1FY3k9bmrY+wWss2xxLxpkXYJA9LaUuSdUThLK1X94w5TBM915yvuqSqWeBB/HjX0N2',
      duration: 180, // 20分钟
      description:
        '这段引导冥想帮助你识别和缓解焦虑情绪，学习如何平静自己的心灵。',
      categorys: negative,
    });

    const media5 = this.mediaRepository.create({
      title: '罗生门',
      artist: '梨冻紧',
      cover:
        'https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=300y300',
      url: 'https://m701.music.126.net/20250315024344/c8cb579fd705785f686572577d673500/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096444542/bafc/a068/39f8/9a9e06e5634410b5e7e81df24749e656.mp3?vuutv=bDsTdetX9dDLrxN0LKNDawGMz7NHsfWdE09z4GH355ZoycsapBVc7v9tFcq3pOpZ239KqN1Mjl3rSqIumAyCwh8PPpMYn+lnxUlPON7iqRw=',
      duration: 180, // 180秒
      description: '轻快的春日旋律',
      categorys: veryNegative,
    });

    // 保存音频数据
    await this.mediaRepository.save([media1, media2, media3, media4, media5]);
  }

  async findAll(pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;
    const [article, totalCount] = await this.mediaRepository.findAndCount({
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

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { id },
      relations: ['categorys'],
    });

    if (!media) {
      throw new NotFoundException(`ID为 ${id} 的音频未找到`);
    }

    return media;
  }

  async findByCategory(categoryValue: string): Promise<Media[]> {
    return this.mediaRepository
      .createQueryBuilder('media')
      .leftJoinAndSelect('media.categorys', 'category')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const { title, artist, cover, url, duration, description, categoryValues } =
      createMediaDto;

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新音频
    const media = this.mediaRepository.create({
      title,
      artist,
      cover,
      url,
      duration,
      description,
      categorys: categories,
    });

    return this.mediaRepository.save(media);
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);

    // 更新基本字段
    if (updateMediaDto.title) {
      media.title = updateMediaDto.title;
    }
    if (updateMediaDto.artist) {
      media.artist = updateMediaDto.artist;
    }
    if (updateMediaDto.cover) {
      media.cover = updateMediaDto.cover;
    }
    if (updateMediaDto.url) {
      media.url = updateMediaDto.url;
    }
    if (updateMediaDto.duration !== undefined) {
      media.duration = updateMediaDto.duration;
    }
    if (updateMediaDto.description) {
      media.description = updateMediaDto.description;
    }

    // 如果提供了分类，则更新分类
    if (
      updateMediaDto.categoryValues &&
      updateMediaDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateMediaDto.categoryValues),
      });
      media.categorys = categories;
    }

    return this.mediaRepository.save(media);
  }

  async remove(id: number): Promise<void> {
    const media = await this.findOne(id);
    await this.mediaRepository.remove(media);
  }
}
