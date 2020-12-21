import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603199433719 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          unsigned: true,
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
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
      // agora vai nossas chaves estrageiras
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
