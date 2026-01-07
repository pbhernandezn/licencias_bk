import { NestFactory } from '@nestjs/core';
import { AppModule } from './main-module/app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ShutdownExpose } from './commons-module/shutdown-module/expose/shutdown-expose';
import { CustomExceptionFilter } from './commons-module/proyecto/utils/custom-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


if (process.env.NODE_ENV === 'development') {
  config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'staging') {
  config({ path: '.env.staging' });
} else if (process.env.NODE_ENV === 'production') {
  config({ path: '.env.production' });
} else if (process.env.NODE_ENV === 'local') {
  config({ path: '.env.local' });
} else {
  config();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  {
    //CORS_ACEPTADOS es con ruta completa del dominio que incluye el protocolo
    let allowedOrigins = [];
    if (process.env.CORS_ACCEPTED) {
      allowedOrigins = process.env.CORS_ACEPTADOS.split(',');
    }

    if (process.env.CORS === 'true') {
      const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
          if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      };

      app.enableCors(corsOptions);
    } else {
      const optionsCors = {
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
      };
      app.enableCors(optionsCors);
    }
  }

  const configBuilder = new DocumentBuilder()
    .setTitle('Licencias - Backend')
    .build();
  app.useGlobalFilters(new CustomExceptionFilter());
  const document = SwaggerModule.createDocument(app, configBuilder);
  SwaggerModule.setup('api/docs', app, document, {});

  app.useGlobalFilters(new CustomExceptionFilter());

  const shutdownService = app.get(ShutdownExpose);
  shutdownService.setApp(app);

  await app.listen(process.env.UNIT_PORT ?? 3001);
}
bootstrap();
