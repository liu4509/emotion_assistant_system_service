import { Module } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { ScenarioController } from './scenario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenario } from './entities/scenario.entity';
import { Problem } from './entities/problems.entity';
import { Solution } from './entities/solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scenario, Problem, Solution])],
  controllers: [ScenarioController],
  providers: [ScenarioService],
})
export class ScenarioModule {}
