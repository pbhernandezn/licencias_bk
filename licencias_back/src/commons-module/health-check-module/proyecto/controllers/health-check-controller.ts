import { Controller, Get, OnModuleInit } from '@nestjs/common';

import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckConfig } from '../config/health-check-config';

@Controller('health')
export class HealthCheckController implements OnModuleInit {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  onModuleInit() {
    HealthCheckConfig.getDirection();
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.http.pingCheck('self', HealthCheckConfig.getDirection()),
    ]);
  }
}
