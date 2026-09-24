import { Body, Controller, Get, Post, Patch, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import type { Snippet } from './snippet';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('snippets')
export class SnippetsController {
    constructor(private readonly snippetService: SnippetsService) {}

    @Get()
    getAll(): Promise<Snippet[]> {
        return this.snippetService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Snippet> {
        return this.snippetService.findOne(id);
    }

    @Post()
    create(@Body() createSnippetDto: CreateSnippetDto): Promise<Snippet> {
        return this.snippetService.create(createSnippetDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
        return this.snippetService.update(id, updateSnippetDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.snippetService.remove(id);
    }
}
