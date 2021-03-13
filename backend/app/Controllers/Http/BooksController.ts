import Book from 'App/Models/Book';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksController {

  public async index() {
    return await Book.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Book.query()
      .select('*')
      .from('books')
      .where('id', params.id)
      .preload('author')
      .first()
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate({ schema: this.getSchema() })
    return await Book.create(data)
  }

  public async update({ request, params }: HttpContextContract) {
    let book = await Book.findOrFail(params.id);
    const data = await request.validate({ schema: this.getSchema() })
    book.name = data.name;
    book.isbn = data.isbn;
    book.authorId = data.author_id;
    return await book.save()
  }

  private getSchema() {
    return schema.create({
      name: schema.string({ trim: true }),
      isbn: schema.string({ trim: true }, [
        rules.regex(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/)
      ]),
      author_id: schema.number([
        rules.exists({ table: 'authors', column: 'id' })
      ]),
    })
  }

}
