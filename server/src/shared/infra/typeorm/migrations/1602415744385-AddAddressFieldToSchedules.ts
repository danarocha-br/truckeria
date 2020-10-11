import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAddressFieldToSchedules1602415744385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('schedules', new TableColumn({
      name: 'address',
      type: 'varchar',
      isNullable: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'address')
  }
}
