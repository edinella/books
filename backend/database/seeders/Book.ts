import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id'

    await Book.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: `Clean Code: A Handbook of Agile Software Craftsmanship`,
        isbn: '9780132350884',
        authorId: 1,
      },
      {
        id: 2,
        name: `The Clean Coder: A Code of Conduct for Professional Programmers`,
        isbn: '9780137081073',
        authorId: 1,
      },
      {
        id: 3,
        name: `The Phoenix Project: A Novel about IT, DevOps, and Helping your Business Win`,
        isbn: '9780988262508',
        authorId: 2,
      },
      {
        id: 4,
        name: `The Pragmatic Programmer: From Journeyman to Master`,
        isbn: '9780201616224',
        authorId: 3,
      },
      {
        id: 5,
        name: `Design Patterns: Elements of Reusable Object-Oriented Software`,
        isbn: '9780201309515',
        authorId: 4,
      },
      {
        id: 6,
        name: `The Imposter's Handbook: A Primer for Self - Taught Programmers`,
        isbn: '9798561928208',
        authorId: 5,
      },
      {
        id: 7,
        name: `Refactoring: Improving the Design of Existing Code`,
        isbn: '9780201485677',
        authorId: 6,
      },
    ])
  }
}
