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
    const booksSchema = schema.create({
      name: schema.string({ trim: true }),
      isbn: schema.string({ trim: true }, [
        rules.regex(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/)
      ]),
      authorId: schema.number([
        rules.exists({ table: 'authors', column: 'id' })
      ]),
    })
    const validatedData = await request.validate({ schema: booksSchema })
    return await Book.create(validatedData)
  }

}
