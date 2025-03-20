import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { Scenario } from './entities/scenario.entity';
import { CreateScenarioDto, UpdateScenarioDto } from './dto/scenario.dto';

@Controller('scenario')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Get('init-data')
  async initData(): Promise<string> {
    await this.scenarioService.initData();
    return '情绪调节场景数据初始化完成';
  }

  @Get()
  async findAll(): Promise<Scenario[]> {
    return await this.scenarioService.findAll();
  }

  @Get('random')
  async findRandom(): Promise<Scenario> {
    return await this.scenarioService.findRandom();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Scenario> {
    return await this.scenarioService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createScenarioDto: CreateScenarioDto,
  ): Promise<Scenario> {
    return await this.scenarioService.create(createScenarioDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScenarioDto: UpdateScenarioDto,
  ) {
    const result = await this.scenarioService.update(+id, updateScenarioDto);
    if (result) {
      return '更新成功';
    } else {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.scenarioService.remove(+id);
    return '删除成功';
  }
}
