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
  try {
    console.log('🚀 Starting NestJS application...');
    console.log('📊 Environment variables loaded:');
    console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
    console.log(`   - UNIT_PORT: ${process.env.UNIT_PORT || '3001'}`);
    console.log(`   - UNIT_DB_HOST: ${process.env.UNIT_DB_HOST || 'not set'}`);
    console.log(`   - CORS: ${process.env.CORS || 'not set'}`);
    console.log(`   - AZURE_STORAGE_CONNECTION_STRING: ${process.env.AZURE_STORAGE_CONNECTION_STRING ? 'set' : 'not set'}`);

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    console.log('✅ NestJS application created successfully');

    {
      //CORS_ACEPTADOS es con ruta completa del dominio que incluye el protocolo
      let allowedOrigins = [];
      if (process.env.CORS_ACEPTADOS) {
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
        console.log('✅ CORS enabled with specific origins');
      } else {
        const optionsCors = {
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: false,
          optionsSuccessStatus: 204,
          credentials: true,
        };
        app.enableCors(optionsCors);
        console.log('✅ CORS enabled for all origins');
      }
    }

    const configBuilder = new DocumentBuilder()
      .setTitle('Licencias - Backend')
      .setDescription('API del sistema de licencias de conducir')
      .setVersion('1.9')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Ingrese su token JWT',
          in: 'header',
        },
        'JWT-auth'
      )
      .addTag('Documentos', 'Endpoints para gestión de documentos')
      .addTag('Revisiones de Documentos', 'Endpoints para revisión de documentos')
      .build();
    app.useGlobalFilters(new CustomExceptionFilter());
    const document = SwaggerModule.createDocument(app, configBuilder);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
    console.log('✅ Swagger documentation configured at /api/docs');

    app.useGlobalFilters(new CustomExceptionFilter());

    const shutdownService = app.get(ShutdownExpose);
    shutdownService.setApp(app);

    const port = process.env.UNIT_PORT ?? 3001;
    await app.listen(port);
    console.log(`🎉 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger: http://localhost:${port}/api/docs`);
    console.log(`❤️  Health: http://localhost:${port}/health`);
  } catch (error) {
    console.error('❌ Error starting application:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}
bootstrap();
