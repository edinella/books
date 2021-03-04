import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Author from 'App/Models/Author'

export default class AuthorSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'

    await Author.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        firstName: 'Robert',
        lastName: 'Martin',
      },
      {
        id: 2,
        firstName: 'Gene',
        lastName: 'Kim',
      },
      {
        id: 3,
        firstName: 'Andy',
        lastName: 'Hunt',
      },
      {
        id: 4,
        firstName: 'Erich',
        lastName: 'Gamma',
      },
      {
        id: 5,
        firstName: 'Rob',
        lastName: 'Conery',
      },
      {
        id: 6,
        firstName: 'Martin',
        lastName: 'Fowler',
      },
    ])
  }
}
