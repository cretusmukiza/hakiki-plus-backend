import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateManufacturerTable1663726433628
  implements MigrationInterface
{
  private tableName = 'manufacturers';
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
            name: 'business_category_id',
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
            name: 'address',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['business_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'business_categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const businessCategoryForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('business_category_id') !== -1,
    );
    await queryRunner.dropForeignKey(
      this.tableName,
      businessCategoryForeignKey,
    );
    await queryRunner.dropTable(this.tableName);
  }
}
