import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/User.entity';
import { Role } from './user/entities/Role.entity';
import { Permission } from './user/entities/permission.entity';
import { DiarieModule } from './diarie/diarie.module';
import { Diarie } from './diarie/entities/diarie.entity';
import { Mood } from './diarie/entities/mood.entity';
import { AttractionModule } from './attraction/attraction.module';
import { Attraction } from './attraction/entities/attraction.entity';
import { Category } from './attraction/entities/category.entity';
import { ClockModule } from './clock/clock.module';
import { MediaModule } from './media/media.module';
import { Clock } from './clock/entities/clocks.entity';
import { Media } from './media/entities/media.entity';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { Article } from './article/entities/article.entity';
import { Video } from './video/entities/video.entity';
import { GameModule } from './game/game.module';
import { Game } from './game/entities/game.entity';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ScenarioModule } from './scenario/scenario.module';
import { Optionsi } from './questionnaire/entities/optioni.entity';
import { Question } from './questionnaire/entities/question.entity';
import { Questionnaire } from './questionnaire/entities/questionnaire.entity';
import { Problem } from './scenario/entities/problems.entity';
import { Scenario } from './scenario/entities/scenario.entity';
import { Solution } from './scenario/entities/solution.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';
import { PermissionGuard } from './guard/permission.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: false,
          logging: true,
          entities: [
            User,
            Role,
            Permission,
            Diarie,
            Mood,
            Attraction,
            Category,
            Clock,
            Media,
            Article,
            Video,
            Game,
            Optionsi,
            Question,
            Questionnaire,
            Solution,
            Problem,
            Scenario,
          ],
          poolSize: 10,
          connectorPackage: 'mysql2',
        };
      },
      inject: [ConfigService],
    }),
    DiarieModule,
    AttractionModule,
    ClockModule,
    MediaModule,
    ArticleModule,
    VideoModule,
    GameModule,
    QuestionnaireModule,
    ScenarioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
