import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductFakeScansTable1663748488907
  implements MigrationInterface
{
  private tableName = 'product_fake_scans';
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
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'product_lot_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'product_category_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'product_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'retailer_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'location_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },

          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 6,
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 10,
            scale: 6,
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
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productLotForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_lot_id') !== -1,
    );
    const userIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    const productCategoryForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_category_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, productLotForeignKey);
    await queryRunner.dropForeignKey(this.tableName, userIdForeignKey);
    await queryRunner.dropForeignKey(this.tableName, productCategoryForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
