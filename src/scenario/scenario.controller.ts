import { Controller } from '@nestjs/common';
import { ScenarioService } from './scenario.service';

@Controller('scenario')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}
}
