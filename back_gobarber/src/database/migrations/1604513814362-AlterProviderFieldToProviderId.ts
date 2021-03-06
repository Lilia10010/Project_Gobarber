import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, } from 'typeorm';

  export default class AlterProviderFieldToProviderId1604513814362
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider');
      await queryRunner.addColumn('appointments',new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey('appointments',new TableForeignKey({
          name: 'AppointmentProvider',//nome da foreignkey pra facilidar no drop
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }
  //esta parte tem que ser feito de forma reversa(primeiro foreignkey dps o id)
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider',
          type: 'varchar',
        }),
      );
    }
  }
