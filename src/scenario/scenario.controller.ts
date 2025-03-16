import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return this.scenarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Scenario> {
    return this.scenarioService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createScenarioDto: CreateScenarioDto,
  ): Promise<Scenario> {
    return this.scenarioService.create(createScenarioDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScenarioDto: UpdateScenarioDto,
  ): Promise<Scenario> {
    return this.scenarioService.update(+id, updateScenarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.scenarioService.remove(+id);
  }
}
