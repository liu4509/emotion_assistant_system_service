import { Controller } from '@nestjs/common';
import { DiarieService } from './diarie.service';

@Controller('diarie')
export class DiarieController {
  constructor(private readonly diarieService: DiarieService) {}
}
