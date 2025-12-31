// shutdown.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ShutdownExpose } from '../expose/shutdown-expose';

@Controller('shutdown')
export class ShutdownController {
  constructor(private readonly shutdownExpose: ShutdownExpose) {}

  @Post()
  async shutdown(): Promise<string> {
    await this.shutdownExpose.shutdownApp();
    return 'Apagando servidor...';
  }
}
