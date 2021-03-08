import Author from 'App/Models/Author'
import Book from 'App/Models/Book'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Books', (group) => {
  let author: Author;
  let book: Book;
  group.beforeEach(async () => {

    // arrange
    Author.truncate()
    author = new Author()
    author.firstName = 'Harper'
    author.lastName = 'Lee'
    await author.save()

    Book.truncate()
    book = new Book()
    book.name = 'To Kill a Mockingbird'
    book.isbn = '978-0446310789'
    book.authorId = author.id
    await book.save()
  })

  test('GET /books should return a list of books', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/books');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.length, 1)
    assert.equal(response.body[0].id, 1)
    assert.equal(response.body[0].name, book.name)
    assert.equal(response.body[0].isbn, book.isbn)
    assert.equal(response.body[0].author_id, 1)

  })

  test('GET /books/:id should return matching book', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/books/1');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.id, 1)
    assert.equal(response.body.name, book.name)
    assert.equal(response.body.isbn, book.isbn)
    assert.equal(response.body.author_id, 1)
  })

  test('GET /books/:id should return nested author info', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/books/1');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.id, 1)
    assert.equal(response.body.name, book.name)
    assert.equal(response.body.isbn, book.isbn)
    assert.equal(response.body.author_id, 1)
    assert.equal(response.body.author.id, 1)
    assert.equal(response.body.author.first_name, author.firstName)
    assert.equal(response.body.author.last_name, author.lastName)
  })

})

