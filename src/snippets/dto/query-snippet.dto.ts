import { IsOptional, IsString, MaxLength } from "class-validator";

export class QuerySnippetDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    search?: string;
}