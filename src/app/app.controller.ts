import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('meta')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getRoot(@Res() res) {
    return res.redirect('/docs');
  }

  @ApiExcludeEndpoint()
  @Get('health')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
