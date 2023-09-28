import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class MigrationInit1695385298921 implements MigrationInterface {
    name = 'MigrationInit1695385298921';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "roles_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a4fceb4fb83189df50fb3189013" UNIQUE ("url"), CONSTRAINT "PK_d40adf1f0bda238c39fdbf8ab10" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "groups_roles_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "groupId" uuid, "roleId" uuid, CONSTRAINT "UQ_6aed50c060d7aad180d526c8d1d" UNIQUE ("groupId", "roleId"), CONSTRAINT "PK_a6394879066bdea1cbe24a02607" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "groups_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_bcb82eee1b8d3193b0e55225d0a" UNIQUE ("name"), CONSTRAINT "PK_fdf22961d1434aeb99ca054cc74" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "exam_user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "userId" uuid, "examId" uuid, CONSTRAINT "UQ_dee6cd09fb888e534bea4b1b281" UNIQUE ("userId", "examId"), CONSTRAINT "PK_050d365406a8d8a4e899cdfe461" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "users_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30), "avatar" character varying(200), "phoneNumber" character varying(25), "email" character varying(40) NOT NULL, "password" character varying(200) NOT NULL, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "passwordChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "groupId" uuid NOT NULL DEFAULT '46fa1172-8262-411e-85ef-8367f01be058', CONSTRAINT "unique_user_email_constraint" UNIQUE ("email"), CONSTRAINT "PK_d9b0d3777428b67f460cf8a9b14" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "answers_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "questionId" uuid, CONSTRAINT "PK_4a6be2ba6293d640edd226290d1" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "questions_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "image" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "answerCorrectId" uuid, "examId" uuid, CONSTRAINT "PK_6b23b23fa8308924320d63d7ad6" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "exams_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "image" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_9adf881ba5ebb4d0471f5f1932c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "exams_category_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(7) with time zone, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_9c3a15acbff2962bd7a1323bde5" UNIQUE ("name"), CONSTRAINT "PK_d117249a925d8f67ca9fca7cf10" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "groups_roles_entity" ADD CONSTRAINT "FK_fe94656105942ecd37301a31dd7" FOREIGN KEY ("groupId") REFERENCES "groups_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "groups_roles_entity" ADD CONSTRAINT "FK_cd77131fa29cb63c9eae0b81f0e" FOREIGN KEY ("roleId") REFERENCES "roles_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "exam_user_entity" ADD CONSTRAINT "FK_67dbbbf37562a6eca7797e7b91e" FOREIGN KEY ("userId") REFERENCES "users_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "exam_user_entity" ADD CONSTRAINT "FK_2f61e3fd7b4055384f4a6695a6f" FOREIGN KEY ("examId") REFERENCES "exams_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "users_entity" ADD CONSTRAINT "FK_cd940c633613e12fd8f4bed6956" FOREIGN KEY ("groupId") REFERENCES "groups_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "answers_entity" ADD CONSTRAINT "FK_ddb74699834fa7421bfbbc2e748" FOREIGN KEY ("questionId") REFERENCES "questions_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "questions_entity" ADD CONSTRAINT "FK_15084e53fd5352d4f012d6ec3a4" FOREIGN KEY ("examId") REFERENCES "exams_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "exams_entity" ADD CONSTRAINT "FK_fd3145cb4adee28a6c6fc1b2e2a" FOREIGN KEY ("userId") REFERENCES "users_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "exams_entity" ADD CONSTRAINT "FK_d86a19f9333246f70d815449884" FOREIGN KEY ("categoryId") REFERENCES "exams_category_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        /** create index with name */
        await queryRunner.createIndex(
            'roles_entity',
            new TableIndex({
                name: 'IDX_ROLES_URL',
                columnNames: ['url']
            })
        );
        /** insert data admin */
        await queryRunner.query(
            `INSERT INTO "groups_entity" (id, name) VALUES 
                ('f241b022-98a7-4f4a-b962-b191846a485e', 'admin'), 
                ('46fa1172-8262-411e-85ef-8367f01be058', 'user');`
        );
        /** create index with name */
        await queryRunner.createIndex(
            'groups_entity',
            new TableIndex({
                name: 'IDX_GROUPS_NAME',
                columnNames: ['name']
            })
        );

        /** insert data admin */
        await queryRunner.query(
            `INSERT INTO "users_entity" ("username", "email", "password", "groupId")
                VALUES ('admin', 'admin@gmail.com', '$2b$12$Kr9gzJWvj1fROZmYaekSpeHvg46wOOVimce/WFlvUU58b0ze4lXOm',
                (SELECT id FROM groups_entity WHERE groups_entity.name = 'admin'));`
        );
        /** create index with email */
        await queryRunner.createIndex(
            'users_entity',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email']
            })
        );

        /** create index with name */
        await queryRunner.createIndex(
            'exams_category_entity',
            new TableIndex({
                name: 'IDX_EXAM_CATEGORY_NAME',
                columnNames: ['name']
            })
        );

        /** create index with title */
        await queryRunner.createIndex(
            'exams_entity',
            new TableIndex({
                name: 'IDX_EXAM_TITLE',
                columnNames: ['title']
            })
        );
        /** create index with status */
        await queryRunner.createIndex(
            'exams_entity',
            new TableIndex({
                name: 'IDX_EXAM_STATUS',
                columnNames: ['status']
            })
        );

        /** create index with status */
        await queryRunner.createIndex(
            'questions_entity',
            new TableIndex({
                name: 'IDX_QUESTION_STATUS',
                columnNames: ['status']
            })
        );

        /** create index with title */
        await queryRunner.createIndex(
            'answers_entity',
            new TableIndex({
                name: 'IDX_ANSWER_TITLE',
                columnNames: ['title']
            })
        );

        /** create index with exam id */
        await queryRunner.createIndex(
            'exam_user_entity',
            new TableIndex({
                name: 'IDX_EXAM_ID',
                columnNames: ['examId']
            })
        );

        /** create index with user id */
        await queryRunner.createIndex(
            'exam_user_entity',
            new TableIndex({
                name: 'IDX_USER_ID',
                columnNames: ['userId']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams_entity" DROP CONSTRAINT "FK_d86a19f9333246f70d815449884"`);
        await queryRunner.query(`ALTER TABLE "exams_entity" DROP CONSTRAINT "FK_fd3145cb4adee28a6c6fc1b2e2a"`);
        await queryRunner.query(`ALTER TABLE "questions_entity" DROP CONSTRAINT "FK_15084e53fd5352d4f012d6ec3a4"`);
        await queryRunner.query(`ALTER TABLE "answers_entity" DROP CONSTRAINT "FK_ddb74699834fa7421bfbbc2e748"`);
        await queryRunner.query(`ALTER TABLE "users_entity" DROP CONSTRAINT "FK_cd940c633613e12fd8f4bed6956"`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" DROP CONSTRAINT "FK_2f61e3fd7b4055384f4a6695a6f"`);
        await queryRunner.query(`ALTER TABLE "exam_user_entity" DROP CONSTRAINT "FK_67dbbbf37562a6eca7797e7b91e"`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" DROP CONSTRAINT "FK_cd77131fa29cb63c9eae0b81f0e"`);
        await queryRunner.query(`ALTER TABLE "groups_roles_entity" DROP CONSTRAINT "FK_fe94656105942ecd37301a31dd7"`);

        /** create index with name */
        await queryRunner.createIndex(
            'exams_category_entity',
            new TableIndex({
                name: 'IDX_EXAM_CATEGORY_NAME',
                columnNames: ['name']
            })
        );
        await queryRunner.query(`DROP TABLE "exams_category_entity"`);

        await queryRunner.dropIndex('exams_entity', 'IDX_EXAM_TITLE');
        await queryRunner.dropIndex('exams_entity', 'IDX_EXAM_STATUS');
        await queryRunner.query(`DROP TABLE "exams_entity"`);

        await queryRunner.dropIndex('questions_entity', 'IDX_QUESTION_STATUS');
        await queryRunner.query(`DROP TABLE "questions_entity"`);

        await queryRunner.dropIndex('answers_entity', 'IDX_ANSWER_TITLE');
        await queryRunner.query(`DROP TABLE "answers_entity"`);

        const tableUsers = (await queryRunner.getTable('users_entity')) as Table;

        /** process drop foreignKey with table groups */
        const foreignKey: any = tableUsers.foreignKeys.find((fk) => fk.columnNames.indexOf('groupId') !== -1);
        await queryRunner.dropForeignKey('users_entity', foreignKey);
        await queryRunner.dropColumn('users_entity', 'groupId');
        await queryRunner.dropIndex('users_entity', 'IDX_USER_EMAIL');
        await queryRunner.query(`DROP TABLE "users_entity"`);

        await queryRunner.dropIndex('exam_user_entity', 'IDX_EXAM_ID');
        await queryRunner.dropIndex('exam_user_entity', 'IDX_USER_ID');
        await queryRunner.query(`DROP TABLE "exam_user_entity"`);

        await queryRunner.dropIndex('groups_entity', 'IDX_GROUPS_NAME');
        await queryRunner.query(`DROP TABLE "groups_entity"`);

        const tableGroupRole = (await queryRunner.getTable('groups_roles_entity')) as Table;
        /** process drop foreignKey with table roles */
        const foreignKeyRole: any = tableGroupRole.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
        await queryRunner.dropForeignKey('groups_roles_entity', foreignKeyRole);
        await queryRunner.dropColumn('groups_roles_entity', 'roleId');
        /** process drop foreignKey with table groups */
        const foreignKeyGroup: any = tableGroupRole.foreignKeys.find((fk) => fk.columnNames.indexOf('groupId') !== -1);
        await queryRunner.dropForeignKey('groups_roles_entity', foreignKeyGroup);
        await queryRunner.dropColumn('groups_roles_entity', 'groupId');

        /** drop table groups_roles_entity */
        await queryRunner.dropTable('groups_roles_entity');
        await queryRunner.query(`DROP TABLE "groups_roles_entity"`);

        await queryRunner.dropIndex('roles_entity', 'IDX_ROLES_URL');
        await queryRunner.query(`DROP TABLE "roles_entity"`);
    }
}
