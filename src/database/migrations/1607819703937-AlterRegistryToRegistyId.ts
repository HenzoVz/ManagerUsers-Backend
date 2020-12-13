import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

class AlterRegistryToRegistyId1607819703937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('registries', 'registry');
    await queryRunner.addColumn(
      'registries',
      new TableColumn({
        name: 'registry_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'registries',
      new TableForeignKey({
        name: 'RegistriesUser',
        columnNames: ['registry_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('registries', 'RegistriesUser');

    await queryRunner.dropColumn('registries', 'registry_id');

    await queryRunner.addColumn(
      'registries',
      new TableColumn({
        name: 'registry',
        type: 'varchar',
      }),
    );
  }
}

export default AlterRegistryToRegistyId1607819703937;
