import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ShutdownConfig } from '../config/shutdown-config';

@Injectable()
export class ShutdownService implements OnModuleInit {
  private readonly logger = new Logger(ShutdownService.name);
  private app?: INestApplication;

  setApp(app: INestApplication) {
    if (this.app) {
      this.logger.warn(
        'La instancia de app ya fue seteada, ignorando nueva asignación.',
      );
      return;
    }
    this.app = app;
    this.app.enableShutdownHooks();
    this.logger.log('Shutdown hooks habilitados');
  }

  onModuleInit() {
    if (!this.app) {
      this.logger.error(
        `App no definida. Debes agregar la instancia app desde main.ts al servicio ShutdownService`,
      );
      process.exit(1);
    }
    const environment = ShutdownConfig.getEnvironment();
    if (environment === 'development') {
      this.logger.warn(
        'ADVERTENCIA: modo development activado, el shutdown se puede ejecutar desde el exterior via controller en la ruta /shutdown por medio de POST',
      );
    }
  }

  async shutdownApp() {
    this.logger.log('⏳ Cerrando NestJS de forma amigable...');
    const environment = ShutdownConfig.getEnvironment();
    if (environment !== 'development') {
      this.logger.log(
        'El sistema no está en modo desarrollo, se omite el apagado',
      );
      return;
    }
    this.logger.log('Apagando en 3 segundos');
    setTimeout(this.shutdownNow.bind(this), 3000);
  }

  public async shutdownNow() {
    await this.app.close();
    this.logger.log('✅ NestJS cerrado');
  }
}
