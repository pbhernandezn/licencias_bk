import { Injectable } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ShutdownService } from '../services/shutdown-service';

@Injectable()
export class ShutdownExpose {
  constructor(private readonly shutdownService: ShutdownService) {}

  setApp(app: INestApplication) {
    this.shutdownService.setApp(app);
  }

  async shutdownApp() {
    this.shutdownService.shutdownApp();
  }

  public async shutdownNow() {
    this.shutdownService.shutdownNow();
  }
}
