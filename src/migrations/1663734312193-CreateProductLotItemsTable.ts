import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductLotItemsTable1663734312193
  implements MigrationInterface
{
  private tableName = 'product_lot_items';
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
            name: 'product_lot_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'serial_number',
            type: 'int',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_lot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_lots',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productLotForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_lot_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, productLotForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
