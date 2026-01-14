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
      useFactory: (configService: ConfigService) => {
        console.log('🔧 Configuring PostgreSQL connection...');
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get<string>('UNIT_DB_HOST', 'localhost'),
          port: configService.get<number>('UNIT_DB_PORT', 5432),
          username: configService.get<string>('UNIT_DB_USER', 'postgres'),
          password: configService.get<string>('UNIT_DB_PASS', 'postgres'),
          database: configService.get<string>('UNIT_DB_NAME', 'postgres'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: true,
          ssl: { rejectUnauthorized: false },
          connectTimeoutMS: 10000,
          maxQueryExecutionTime: 5000,
        };
        console.log(`   - Host: ${dbConfig.host}`);
        console.log(`   - Port: ${dbConfig.port}`);
        console.log(`   - Database: ${dbConfig.database}`);
        console.log(`   - Username: ${dbConfig.username}`);
        console.log(`   - SSL: enabled`);
        return dbConfig;
      },
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
