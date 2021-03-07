import Author from 'App/Models/Author'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authors', (group) => {
  let author: Author;
  group.beforeEach(async () => {

    // arrange
    Author.truncate()
    author = new Author()
    author.firstName = 'Harper'
    author.lastName = 'Lee'
    await author.save()
  })

  test('GET /authors should return a list of authors', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/authors');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.length, 1)
    assert.equal(response.body[0].id, 1)
    assert.equal(response.body[0].first_name, author.firstName)
    assert.equal(response.body[0].last_name, author.lastName)
  })

  test('GET /authors/:id should return matching author', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/authors/1');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.id, 1)
    assert.equal(response.body.first_name, author.firstName)
    assert.equal(response.body.last_name, author.lastName)
  })

})

