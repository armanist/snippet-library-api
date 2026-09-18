import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { SnippetEntity } from './snippet.entity';
import { Repository } from 'typeorm';
import type { CreateSnippetDto } from './create-snippet.dto';

@Injectable()
export class SnippetsService {
    constructor(@InjectRepository(SnippetEntity) private readonly snippetRepository: Repository<SnippetEntity>) { }

    findAll(): Promise<SnippetEntity[]> {
        return this.snippetRepository.find();
    }

    async findOne(id: string): Promise<SnippetEntity> {
        const snippet = await this.snippetRepository.findOneBy({ id });

        if (!snippet) {
            throw new NotFoundException(`Snippet with ID "${id}" was not found.`);
        }

        return snippet;
    }

    async create(createSnippetDto: CreateSnippetDto): Promise<SnippetEntity> {
        const snippet = this.snippetRepository.create({
            id: randomUUID(),
            ...createSnippetDto,
        });

        return this.snippetRepository.save(snippet);
    }

    async remove(id: string): Promise<void> {
        const snippet = await this.findOne(id);

        await this.snippetRepository.remove(snippet);
    }
}