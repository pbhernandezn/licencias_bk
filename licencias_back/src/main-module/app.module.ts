import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './proyecto/services/app.service';
import { AppController } from './proyecto/triggers/app.controller';
import { HealthCheckModule } from '@principal/commons-module/health-check-module/health-check-module';
import { ShutdownModule } from '@principal/commons-module/shutdown-module/shutdown-module';
import { AuthModule } from './proyecto/auth/auth.module';
import { CoreModule } from '@principal/core-module/core-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env.staging', '.env.production', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('UNIT_DB_HOST', 'localhost'),
        port: configService.get<number>('UNIT_DB_PORT', 5432),
        username: configService.get<string>('UNIT_DB_USER', 'postgres'),
        password: configService.get<string>('UNIT_DB_PASS', 'postgres'),
        database: configService.get<string>('UNIT_DB_NAME', 'postgres'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
        logging: configService.get<boolean>('DB_LOGGING', true),
        ssl: configService.get<boolean>('UNIT_DB_SSL', false),
        //ssl:{ rejectUnauthorized: false  },
      }),
    }),
    HealthCheckModule,
    ShutdownModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
