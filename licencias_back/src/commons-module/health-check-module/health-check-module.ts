import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './proyecto/controllers/health-check-controller';
import { HttpModule } from '@nestjs/axios';

const exposes = [];
const services = [];

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [...exposes, ...services],
  exports: [...exposes],
})
export class HealthCheckModule {}
