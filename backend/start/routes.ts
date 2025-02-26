/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/authors', 'AuthorsController.index')
Route.get('/authors/:id', 'AuthorsController.show')
Route.post('/authors', 'AuthorsController.create')
Route.put('/authors/:id', 'AuthorsController.update')

Route.get('/books', 'BooksController.index')
Route.get('/books/:id', 'BooksController.show')
Route.post('/books', 'BooksController.create')
Route.put('/books/:id', 'BooksController.update')
