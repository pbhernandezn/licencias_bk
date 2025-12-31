import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/')
  getRaiz(): string {
    return this.appService.getHello();
  }

   
  @Get('/verificar')
  @UseGuards(JwtAuthGuard)
   getHello(): string {
    return this.appService.getHello();
  }

  
}
