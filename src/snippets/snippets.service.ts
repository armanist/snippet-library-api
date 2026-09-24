import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { SnippetEntity } from './snippet.entity';
import { Repository } from 'typeorm';
import type { CreateSnippetDto } from './dto/create-snippet.dto';
import type { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
    constructor(@InjectRepository(SnippetEntity) private readonly snippetRepository: Repository<SnippetEntity>) { }

    findAll(search?: string): Promise<SnippetEntity[]> {
        const normalizedSearch = search?.trim().toLowerCase();

        if(!normalizedSearch) {
            return this.snippetRepository.find();
        }

        return this.snippetRepository
            .createQueryBuilder('snippet')
            .where('LOWER(snippet.title) LIKE :search')
            .orWhere('LOWER(snippet.language) LIKE :search')
            .orWhere('LOWER(snippet.code) LIKE :search')
            .orWhere('LOWER(snippet.tags) LIKE :search')
            .setParameter('search', `%${normalizedSearch}%`)
            .getMany()
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

    async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<SnippetEntity> {
        const snippet = await this.findOne(id);
        
        Object.assign(snippet, updateSnippetDto);

        await this.snippetRepository.save(snippet);

        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const snippet = await this.findOne(id);

        await this.snippetRepository.remove(snippet);
    }
}