import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mission, TaskFieldValue, TaskSubmission, User } from './entities';
import { UserModule } from './modules';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission } from 'src/entities';
import { TaskFieldsModule } from './modules/task-fields/task-fields.module';
import { TaskSubmissionsModule } from './modules/task-submissions/task-submissions.module';
import { MissionModule } from './modules/mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      synchronize: true, // use in development only
      entities: [User, Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission, TaskSubmission, TaskFieldValue, Mission],
    }),
    UserModule,
    TasksModule,
    TaskFieldsModule,
    TaskSubmissionsModule,
    MissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
