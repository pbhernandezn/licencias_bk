import { Module } from '@nestjs/common';
import { ShutdownController } from './controllers/shutdown-controller';
import { ShutdownService } from './services/shutdown-service';
import { ShutdownExpose } from './expose/shutdown-expose';

@Module({
  imports: [],
  controllers: [ShutdownController],
  providers: [ShutdownService, ShutdownExpose],
  exports: [ShutdownExpose],
})
export class ShutdownModule {}
