import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class resetPassword1604337291070 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'reset-password',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'token',
          type: 'varchar',
        },
        {
          name: 'expires_on',
          type: 'timestamp'
        },
        {
          name: 'was_used',
          type: 'boolean',
          default: false
        },
        {
          name: 'user_id',
          type: 'integer'
        }
      ],

      foreignKeys: [
        {
          name: 'PasswordTokenUser',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reset-password');
  }

}
