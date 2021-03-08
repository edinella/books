import Author from 'App/Models/Author';
import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorsController {

  public async index() {
    return await Author.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Author.find(params.id);
  }

  public async create({ request }: HttpContextContract) {
    const authorsSchema = schema.create({
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
    })
    const validatedData = await request.validate({ schema: authorsSchema })
    return await Author.create(validatedData)
  }

}
