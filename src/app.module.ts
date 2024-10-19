import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities';
import { UserModule } from './modules';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 1433,
      username: 'root',
      password: '1234',
      database: 'doorbord_db',
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      synchronize: true, // use in development only
      entities: [User], 
    }),
    UserModule,
    TasksModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
