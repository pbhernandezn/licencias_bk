import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '../utils/common';
import { ParametrosModule } from '../repository/parametros.module';

@Module({
  imports: [ParametrosModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}