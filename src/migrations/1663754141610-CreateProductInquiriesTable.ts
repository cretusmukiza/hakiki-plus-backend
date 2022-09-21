import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductInquiriesTable1663754141610
  implements MigrationInterface
{
  private tableName = 'product_inquiries';
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
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1,
    );
    const userIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, userIdForeignKey);
    await queryRunner.dropForeignKey(this.tableName, productForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
