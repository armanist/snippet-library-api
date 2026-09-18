import {Column, Entity, PrimaryColumn } from 'typeorm';
import type { Language } from './snippet';

@Entity('snippets')
export class SnippetEntity {
    @PrimaryColumn('text')
    id!: string;

    @Column()
    title!: string;

    @Column({type: 'text'})
    language!: Language;

    @Column()
    code!: string;

    @Column('simple-json')
    tags!: string[];
}