import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateShedules1601965558799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
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
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lat',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lon',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date_start',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'date_end',
            type: 'timestamp with time zone',
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
    await queryRunner.dropTable('schedules');
  }
}
