import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602594684229 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      // aqui vai os campos dessa tabela;
      name: 'orphanages', // nome da tabela(Obrigatorio)
      columns: [
        // Colunas
        {
          name: 'id',
          type: 'integer',
          unsigned: true, // sempre vai ser um valor positivo
          isPrimary: true,
          isGenerated: true, // sera criado automaticamente
          generationStrategy: 'increment' // AutoIncrement
        },
        {
          name: 'name',
          type: 'varchar' // string "curto"
        },
        {
          name: 'latitude',
          type: 'decimal',
          // scale: 10,  // quantos caracteres depois da virgula, (porque latitude tem no maximo 10 caracteres depois da virgula)
          // precision: 2, // quantos caracteres antes da virgula, (porque latitude tem 2 caracteres antes da virgula)
        },
        {
          name: 'longitude',
          type: 'decimal',
          // scale: 10,  
          // precision: 2, 
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'instructions',
          type: 'text'
        },
        {
          name: 'opening_hours',
          type: 'varchar'
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false // valor padrão vai ser falso.
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }

}
