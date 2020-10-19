import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMenus1603028563129 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menus',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'truck_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'options',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'photo_filename',
            type: 'varchar',
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
        foreignKeys: [
          {
            name: 'FoodTruck',
            referencedTableName: 'truck_profiles',
            referencedColumnNames: ['id'],
            columnNames: ['truck_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('menus');
    }

}
