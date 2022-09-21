import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductAttributesTable1663755050831
  implements MigrationInterface
{
  private tableName = 'product_attributes';
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
            name: 'product_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'attribute_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '255',
            isNullable: false,
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

    await queryRunner.dropForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
    );

    await queryRunner.dropForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['attribute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1,
    );
    const attributeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('attribute_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, attributeForeignKey);
    await queryRunner.dropForeignKey(this.tableName, productForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
