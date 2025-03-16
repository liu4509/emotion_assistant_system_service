import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { Category } from 'src/attraction/entities/category.entity';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
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

    // 创建游戏数据
    const game1 = this.gameRepository.create({
      title: '色彩方块消消看',
      url: 'https://www.7k7k.com/flash/79305.htm',
      image: 'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png',
      description:
        '这是一款消消看游戏，游戏虽然没有花哨的画面但是游戏性和挑战性依旧非常高，看看你能得到多少分，大家快来相互比一比吧！',
      categorys: veryPositive,
    });

    const game2 = this.gameRepository.create({
      title: '数独挑战',
      url: 'https://www.7k7k.com/flash/156420.htm',
      image:
        'https://img.freepik.com/free-vector/sudoku-game-concept-illustration_114360-1908.jpg',
      description:
        '玩数独游戏，感受数独游戏的规则，锻炼推理和逻辑思维能力，体会自主游戏的乐趣，初步养成乐于挑战的学习品质。拖动游戏下方的角色到上方的格子里，格子填满并且全部正确后过关。',
      categorys: neutral,
    });

    const game3 = this.gameRepository.create({
      title: '节奏大师电脑版',
      url: 'https://www.7k7k.com/flash/126556.htm',
      image:
        'https://img.freepik.com/free-vector/gradient-japanese-temple-with-lake_52683-44985.jpg',
      description:
        '火热的休闲音乐挑战类手机游戏《节奏大师》现在也有了电脑在线版本啦！老少咸宜的游戏模式吸引了无数粉丝，还在等什么，赶紧让热门，流行，动漫，经典四大种类的音乐冲击你的感官，赶紧让动人的旋律音符在你的指尖跃动，在音乐中忘我地游戏吧',
      categorys: positive,
    });

    const game4 = this.gameRepository.create({
      title: '数独挑战',
      url: 'https://www.7k7k.com/flash/156420.htm',
      image:
        'https://img.freepik.com/free-vector/sudoku-game-concept-illustration_114360-1908.jpg',
      description:
        '玩数独游戏，感受数独游戏的规则，锻炼推理和逻辑思维能力，体会自主游戏的乐趣，初步养成乐于挑战的学习品质。拖动游戏下方的角色到上方的格子里，格子填满并且全部正确后过关。',
      categorys: neutral,
    });

    const game5 = this.gameRepository.create({
      title: '色彩方块消消看',
      url: 'https://www.7k7k.com/flash/79305.htm',
      image: 'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png',
      description:
        '这是一款消消看游戏，游戏虽然没有花哨的画面但是游戏性和挑战性依旧非常高，看看你能得到多少分，大家快来相互比一比吧！',
      categorys: veryPositive,
    });

    // 保存游戏数据
    await this.gameRepository.save([game1, game2, game3, game4, game5]);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({
      relations: ['categorys'],
    });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['categorys'],
    });

    if (!game) {
      throw new NotFoundException(`ID为 ${id} 的游戏未找到`);
    }

    return game;
  }

  async findByCategory(categoryValue: string): Promise<Game[]> {
    return this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.categorys', 'category')
      .where('category.value = :categoryValue', { categoryValue })
      .getMany();
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const { title, url, image, description, categoryValues } = createGameDto;

    // 查找分类
    const categories = await this.categoryRepository.findBy({
      value: In(categoryValues),
    });

    // 创建新游戏
    const game = this.gameRepository.create({
      title,
      url,
      image,
      description,
      categorys: categories,
    });

    return this.gameRepository.save(game);
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);

    // 更新基本字段
    if (updateGameDto.title) game.title = updateGameDto.title;
    if (updateGameDto.url) game.url = updateGameDto.url;
    if (updateGameDto.image) game.image = updateGameDto.image;
    if (updateGameDto.description) game.description = updateGameDto.description;

    // 如果提供了分类，则更新分类
    if (
      updateGameDto.categoryValues &&
      updateGameDto.categoryValues.length > 0
    ) {
      const categories = await this.categoryRepository.findBy({
        value: In(updateGameDto.categoryValues),
      });
      game.categorys = categories;
    }

    return this.gameRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gameRepository.remove(game);
  }
}
