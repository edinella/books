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
    const validatedData = await request.validate({ schema: this.getSchema() })
    return await Author.create(validatedData)
  }

  public async update({ request, params }: HttpContextContract) {
    const previous = await Author.findOrFail(params.id);
    const validatedData = await request.validate({ schema: this.getSchema() })
    const author = Object.assign(previous, validatedData);
    return await author.save();
  }

  private getSchema() {
    return schema.create({
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
    });
  }
}
