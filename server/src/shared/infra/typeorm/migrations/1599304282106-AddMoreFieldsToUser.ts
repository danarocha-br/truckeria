import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMoreFieldsToUser1599304282106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'avatarURL',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'numeric',
        isNullable: true,
      }),
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'state',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'avatarURL',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'numeric',
        isNullable: true,
      }),
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'state',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
