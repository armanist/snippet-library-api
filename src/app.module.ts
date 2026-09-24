import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetEntity } from './snippets/snippet.entity';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow<string>('DATABASE_PATH'),
        entities: [SnippetEntity],
        synchronize: true,
      }),
    }),

    SnippetsModule
  ],
})

export class AppModule {}
