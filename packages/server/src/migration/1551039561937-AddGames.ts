import { MigrationInterface, QueryRunner } from 'typeorm'
import jsonExample from '@sportspoll/common/example.json'

const keys = [
  'id',
  'awayName',
  'groupName',
  'homeName',
  'name',
  'sport',
  'country',
  'state',
  'createdAt',
]

export class AddGames1551039561937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const mappingFunction = game =>
      keys.map(key => game[key]).map((v, index) => (index === 0 ? v : `'${v}'`))
    const values = jsonExample.map(mappingFunction).map(f => `(${f.join(',')})`)

    queryRunner.query(
      `INSERT INTO game (${keys
        .map(k => `"${k}"`)
        .join(',')}) VALUES ${values.join(',')};`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const ids = jsonExample.map(g => g.id)

    queryRunner.query(`DELETE FROM game WHERE id in (${ids.join(',')});`)
  }
}
