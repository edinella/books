import Author from "App/Models/Author";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorsController {

  public async index() {
    return await Author.all()
  }

  public async show(ctx: HttpContextContract) {
    return await Author.find(ctx.params.id);
  }

}
