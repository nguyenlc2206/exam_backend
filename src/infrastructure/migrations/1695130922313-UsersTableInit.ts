import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class UsersTableInit1694931638143 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** insert data admin */
        await queryRunner.query(
            `INSERT INTO "users_entity" ("username", "email", "password", "groupId")
                VALUES ('admin', 'admin@gmail.com', '$2b$12$Kr9gzJWvj1fROZmYaekSpeHvg46wOOVimce/WFlvUU58b0ze4lXOm',
                (SELECT id FROM groups_entity WHERE groups_entity.name = 'admin'));`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = (await queryRunner.getTable('users_entity')) as Table;

        /** process drop foreignKey with table groups */
        const foreignKey: any = table.foreignKeys.find((fk) => fk.columnNames.indexOf('groupId') !== -1);
        await queryRunner.dropForeignKey('users_entity', foreignKey);
        await queryRunner.dropColumn('users_entity', 'groupId');

        await queryRunner.dropTable('users_entity');
    }
}
