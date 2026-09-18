import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetsController } from './snippets/snippets.controller';
import { SnippetsService } from './snippets/snippets.service';
import { SnippetEntity } from './snippets/snippet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'snippets.sqlite',
      entities: [SnippetEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SnippetEntity]),
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class AppModule {}
