import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission } from './decorator/custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @RequireLogin()
  @RequirePermission('admin')
  getHello(): string {
    return this.appService.getHello();
  }
}
