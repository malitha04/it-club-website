import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
    name = 'InitialSchema1700000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for user roles if it doesn't exist
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                    CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'admin');
                END IF;
            END
            $$;
        `);
        
        // Create users table if it doesn't exist
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
                    CREATE TABLE "users" (
                        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                        "deleted_at" TIMESTAMP, 
                        "email" character varying NOT NULL, 
                        "password" character varying NOT NULL, 
                        "name" character varying NOT NULL, 
                        "role" "public"."users_role_enum" NOT NULL DEFAULT 'student', 
                        "is_active" boolean NOT NULL DEFAULT true, 
                        "last_login" TIMESTAMP, 
                        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
                        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                    );
                END IF;
            END
            $$;
        `);
        
        // Create email index if it doesn't exist
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_indexes 
                    WHERE schemaname = 'public' 
                    AND tablename = 'users' 
                    AND indexname = 'IDX_97672ac88f789774dd47f7c8be'
                ) AND EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'users' 
                    AND column_name = 'email'
                ) THEN
                    CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email");
                END IF;
            END
            $$;
        `);
        
        // Create is_active index if it exists
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_indexes 
                    WHERE schemaname = 'public' 
                    AND tablename = 'users' 
                    AND indexname = 'IDX_a000cca60bcf04454e72769949'
                ) AND EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'users' 
                    AND column_name = 'is_active'
                ) THEN
                    CREATE INDEX "IDX_a000cca60bcf04454e72769949" ON "users" ("is_active");
                END IF;
            END
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a000cca60bcf04454e72769949"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
