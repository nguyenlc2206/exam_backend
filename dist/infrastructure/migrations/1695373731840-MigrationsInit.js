"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationsInit1695373731840 = void 0;
class MigrationsInit1695373731840 {
    constructor() {
        this.name = 'MigrationsInit1695373731840';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_EXAM_CATEGORY_NAME"`);
        await queryRunner.query(`CREATE TABLE "roles_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a4fceb4fb83189df50fb3189013" UNIQUE ("url"), CONSTRAINT "PK_d40adf1f0bda238c39fdbf8ab10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups_roles_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "groupId" uuid, "roleId" uuid, CONSTRAINT "UQ_6aed50c060d7aad180d526c8d1d" UNIQUE ("groupId", "roleId"), CONSTRAINT "PK_a6394879066bdea1cbe24a02607" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_bcb82eee1b8d3193b0e55225d0a" UNIQUE ("name"), CONSTRAINT "PK_fdf22961d1434aeb99ca054cc74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exam_user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "userId" uuid, "examId" uuid, CONSTRAINT "UQ_dee6cd09fb888e534bea4b1b281" UNIQUE ("userId", "examId"), CONSTRAINT "PK_050d365406a8d8a4e899cdfe461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30), "avatar" character varying(200), "phoneNumber" character varying(25), "email" character varying(40) NOT NULL, "password" character varying(200) NOT NULL, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "passwordChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "groupId" uuid NOT NULL DEFAULT '46fa1172-8262-411e-85ef-8367f01be058', CONSTRAINT "unique_user_email_constraint" UNIQUE ("email"), CONSTRAINT "PK_d9b0d3777428b67f460cf8a9b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "questionId" uuid, CONSTRAINT "PK_4a6be2ba6293d640edd226290d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "image" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "answerCorrectId" uuid, "examId" uuid, CONSTRAINT "PK_6b23b23fa8308924320d63d7ad6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "image" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_9adf881ba5ebb4d0471f5f1932c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(7) with time zone`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(7) with time zone`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" ADD CONSTRAINT "FK_fe94656105942ecd37301a31dd7" FOREIGN KEY ("groupId") REFERENCES "groups_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" ADD CONSTRAINT "FK_cd77131fa29cb63c9eae0b81f0e" FOREIGN KEY ("roleId") REFERENCES "roles_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" ADD CONSTRAINT "FK_67dbbbf37562a6eca7797e7b91e" FOREIGN KEY ("userId") REFERENCES "users_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" ADD CONSTRAINT "FK_2f61e3fd7b4055384f4a6695a6f" FOREIGN KEY ("examId") REFERENCES "exams_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_entity" ADD CONSTRAINT "FK_cd940c633613e12fd8f4bed6956" FOREIGN KEY ("groupId") REFERENCES "groups_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers_entity" ADD CONSTRAINT "FK_ddb74699834fa7421bfbbc2e748" FOREIGN KEY ("questionId") REFERENCES "questions_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_entity" ADD CONSTRAINT "FK_15084e53fd5352d4f012d6ec3a4" FOREIGN KEY ("examId") REFERENCES "exams_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams_entity" ADD CONSTRAINT "FK_fd3145cb4adee28a6c6fc1b2e2a" FOREIGN KEY ("userId") REFERENCES "users_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams_entity" ADD CONSTRAINT "FK_d86a19f9333246f70d815449884" FOREIGN KEY ("categoryId") REFERENCES "exams_category_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exams_entity" DROP CONSTRAINT "FK_d86a19f9333246f70d815449884"`);
        await queryRunner.query(`ALTER TABLE "exams_entity" DROP CONSTRAINT "FK_fd3145cb4adee28a6c6fc1b2e2a"`);
        await queryRunner.query(`ALTER TABLE "questions_entity" DROP CONSTRAINT "FK_15084e53fd5352d4f012d6ec3a4"`);
        await queryRunner.query(`ALTER TABLE "answers_entity" DROP CONSTRAINT "FK_ddb74699834fa7421bfbbc2e748"`);
        await queryRunner.query(`ALTER TABLE "users_entity" DROP CONSTRAINT "FK_cd940c633613e12fd8f4bed6956"`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" DROP CONSTRAINT "FK_2f61e3fd7b4055384f4a6695a6f"`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" DROP CONSTRAINT "FK_67dbbbf37562a6eca7797e7b91e"`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" DROP CONSTRAINT "FK_cd77131fa29cb63c9eae0b81f0e"`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" DROP CONSTRAINT "FK_fe94656105942ecd37301a31dd7"`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exams_category_entity" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "exams_entity"`);
        await queryRunner.query(`DROP TABLE "questions_entity"`);
        await queryRunner.query(`DROP TABLE "answers_entity"`);
        await queryRunner.query(`DROP TABLE "users_entity"`);
        await queryRunner.query(`DROP TABLE "exam_user_entity"`);
        await queryRunner.query(`DROP TABLE "groups_entity"`);
        await queryRunner.query(`DROP TABLE "groups_roles_entity"`);
        await queryRunner.query(`DROP TABLE "roles_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_EXAM_CATEGORY_NAME" ON "exams_category_entity" ("name") `);
    }
}
exports.MigrationsInit1695373731840 = MigrationsInit1695373731840;
