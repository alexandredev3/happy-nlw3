import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602624281324 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'orphanage_id',
          type: 'integer'
        }
      ],
      // agora vai nossa chaves estrageiras
      foreignKeys: [
        {
          name: 'ImageOrphanage', // posso colocar o nome que quiser, para quando for preciso apagar fica mais facil encontrar.
          columnNames: ['orphanage_id'],  // coluna que vai se relacionar
          referencedTableName: 'orphanages',  // tabela que essa coluna vai fazer relacionamento
          referencedColumnNames: ['id'], // qual campo o "orphanage_id" vai se relacionar.
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
