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
    const validatedData = await request.validate({ schema: this.getSchema() })
    return await Book.create(validatedData)
  }

  public async update({ request, params }: HttpContextContract) {
    const previous = await Book.findOrFail(params.id);
    const validatedData = await request.validate({ schema: this.getSchema() })
    const book = Object.assign(previous, validatedData);
    return await book.save();
  }

  private getSchema() {
    return schema.create({
      name: schema.string({ trim: true }),
      isbn: schema.string({ trim: true }, [
        rules.regex(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/)
      ]),
      authorId: schema.number([
        rules.exists({ table: 'authors', column: 'id' })
      ]),
    })
  }

}
