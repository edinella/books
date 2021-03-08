import Author from 'App/Models/Author'
import Book from 'App/Models/Book'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Books', () => {
  test.group('GET', (group) => {
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

    test('/books should return a list of books', async (assert) => {

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

    test('/books/:id should return matching book', async (assert) => {

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

    test('/books/:id should return nested author info', async (assert) => {

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

  test.group('POST', (group) => {

    // arrange
    let author: Author;
    group.before(async () => {
      Author.truncate()
      author = new Author()
      author.firstName = 'Harper'
      author.lastName = 'Lee'
      author = await author.save()
    });
    group.beforeEach(async () => {
      Book.truncate()
    })

    test('/books should require name', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/books')
        .set('Content-Type', 'application/json')
        .send({
          // name: 'To Kill a Mockingbird',
          isbn: '978-0446310789',
          authorId: author.id,
        });
      const onDB = await Book.all();

      // assert
      assert.equal(response.status, 422)
      assert.equal(response.type, 'application/json')
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'required',
        field: 'name',
        message: 'required validation failed'
      }]);
      assert.equal(onDB.length, 0) // 👈  no record created
    });

    test('/books should require well-formatted isbn', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/books')
        .set('Content-Type', 'application/json')
        .send({
          name: 'To Kill a Mockingbird',
          isbn: 'non valid isbn',
          authorId: author.id,
        });
      const onDB = await Book.all();

      // assert
      assert.equal(response.status, 422)
      assert.equal(response.type, 'application/json')
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'regex',
        field: 'isbn',
        message: 'regex validation failed'
      }]);
      assert.equal(onDB.length, 0) // 👈  no record created
    });

    test('/books should require existing authorId', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/books')
        .set('Content-Type', 'application/json')
        .send({
          name: 'To Kill a Mockingbird',
          isbn: '978-0446310789',
          authorId: author.id + 1,
        });
      const onDB = await Book.all();

      // assert
      assert.equal(response.status, 422)
      assert.equal(response.type, 'application/json')
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'exists',
        field: 'authorId',
        message: 'exists validation failure'
      }]);
      assert.equal(onDB.length, 0) // 👈  no record created
    });

    test('/books should create an Book', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/books')
        .set('Content-Type', 'application/json')
        .send({
          name: 'To Kill a Mockingbird',
          isbn: '978-0446310789',
          authorId: author.id,
        });
      const onDB = await Book.find(1);

      // assert
      assert.equal(response.status, 200)
      assert.equal(response.type, 'application/json')
      assert.equal(response.body.id, 1)
      assert.equal(response.body.name, 'To Kill a Mockingbird')
      assert.equal(response.body.isbn, '978-0446310789')
      assert.equal(response.body.author_id, author.id)
      assert.notEqual(onDB, null);
      if (onDB !== null) {
        assert.equal(onDB.id, 1);
        assert.equal(onDB.name, 'To Kill a Mockingbird');
        assert.equal(onDB.isbn, '978-0446310789');
        assert.equal(onDB.authorId, author.id);
      }
    });

  });

})

