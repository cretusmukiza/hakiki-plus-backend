import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductUsageResourceTable1663753374718
  implements MigrationInterface
{
  private tableName = 'product_usage_resources';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'product_id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'summary',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'resource_type',
            type: 'enum',
            enumName: 'resourceTypeEnum',
            enum: ['video', 'article', 'document', 'audio'],
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const productForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, productForeignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
