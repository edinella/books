import Book from "App/Models/Book";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksController {

  public async index() {
    return await Book.all()
  }

  public async show(ctx: HttpContextContract) {
    return await Book.find(ctx.params.id);
  }

}
