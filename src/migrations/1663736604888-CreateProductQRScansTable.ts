import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductQRScansTable1663736604888
  implements MigrationInterface
{
  public tableName = 'product_qr_scans';
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
            name: 'device',
            type: 'varchar',
            length: '100',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productLotForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_lot_id') !== -1,
    );
    const userIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, productLotForeignKey);
    await queryRunner.dropForeignKey(this.tableName, userIdForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
