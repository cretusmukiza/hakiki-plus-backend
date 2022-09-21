import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateProductTable1663729186748 implements MigrationInterface {
    private tableName = 'products';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: this.tableName,
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'product_sub_category_id',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
      
          await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
              columnNames: ['product_sub_category_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'product_sub_categories',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
