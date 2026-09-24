import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetEntity } from './snippets/snippet.entity';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'snippets.sqlite',
      entities: [SnippetEntity],
      synchronize: true,
    }),
    SnippetsModule
  ],
})

export class AppModule {}
