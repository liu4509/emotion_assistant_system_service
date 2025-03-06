import { Module } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { ScenarioController } from './scenario.controller';
import { Solution } from './entities/solution.entity';
import { Scenario } from './entities/scenario.entity';
import { Problem } from './entities/problems.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Scenario, Solution])],
  controllers: [ScenarioController],
  providers: [ScenarioService],
})
export class ScenarioModule {}
