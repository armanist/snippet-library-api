import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1790256760114 implements MigrationInterface {
    name = 'InitialSchema1790256760114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "snippets" ("id" text PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "language" text NOT NULL, "code" varchar NOT NULL, "tags" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "snippets"`);
    }

}
