import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTruckProfiles1599398544342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'truck_profiles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'cuisines',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'payment_methods',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'catering',
            type: 'boolean',
          },
          {
            name: 'photo_filename',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'numeric',
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
            name: 'web',
            type: 'varchar',
          },
          {
            name: 'instagram',
            type: 'varchar',
          },
          {
            name: 'facebook',
            type: 'varchar',
          },
          {
            name: 'twitter',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
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
            name: 'UserAdmin',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('truck_profiles');
  }
}
