import { Controller } from '@nestjs/common';
import { ClockService } from './clock.service';

@Controller('clock')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}
}
