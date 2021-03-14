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
    const data = await request.validate({ schema: this.getSchema() })
    return await Author.create(data)
  }

  public async update({ request, params }: HttpContextContract) {
    const author = await Author.findOrFail(params.id);
    const data = await request.validate({ schema: this.getSchema() })
    author.firstName = data.first_name;
    author.lastName = data.last_name;
    return await author.save();
  }

  private getSchema() {
    return schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
    });
  }
}
