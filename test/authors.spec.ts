import Author from 'App/Models/Author'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authors', () => {

  test.group('GET', (group) => {

    // arrange
    let author: Author;
    group.beforeEach(async () => {
      Author.truncate()
      author = new Author()
      author.firstName = 'Harper'
      author.lastName = 'Lee'
      await author.save()
    })

    test('/authors should return a list of authors', async (assert) => {

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

    test('/authors/:id should return matching author', async (assert) => {

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

  test.group('POST', (group) => {
    group.beforeEach(async () => {

      // arrange
      Author.truncate()
    })

    test('/authors should require firstName', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/authors')
        .set('Content-Type', 'application/json')
        .send({
          lastName: 'Lee'
        });
      const onDB = await Author.all();

      // assert
      assert.equal(response.status, 422)
      assert.equal(response.type, 'application/json')
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'required',
        field: 'firstName',
        message: 'required validation failed'
      }]);
      assert.equal(onDB.length, 0) // 👈  no record created
    });

    test('/authors should require lastName', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/authors')
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'Harper'
        });
      const onDB = await Author.all();

      // assert
      assert.equal(response.status, 422)
      assert.equal(response.type, 'application/json')
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'required',
        field: 'lastName',
        message: 'required validation failed'
      }]);
      assert.equal(onDB.length, 0) // 👈  no record created
    });

    test('/authors should create an Author', async (assert) => {

      // act
      const response = await supertest(BASE_URL).post('/authors')
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'Harper',
          lastName: 'Lee'
        });
      const onDB = await Author.findOrFail(1);

      // assert
      assert.equal(response.status, 200)
      assert.equal(response.type, 'application/json')
      assert.equal(response.body.id, 1)
      assert.equal(response.body.first_name, 'Harper')
      assert.equal(response.body.last_name, 'Lee')
      assert.equal(onDB.id, 1);
      assert.equal(onDB.firstName, 'Harper');
      assert.equal(onDB.lastName, 'Lee');
    });

  });

  test.group('PUT', (group) => {

    // arrange
    let author: Author;
    group.beforeEach(async () => {
      Author.truncate()
      author = new Author()
      author.firstName = 'Harper'
      author.lastName = 'Lee'
      await author.save()
    })

    test('/authors/:id should require firstName', async (assert) => {

      // act
      const response = await supertest(BASE_URL).put(`/authors/${author.id}`)
        .set('Content-Type', 'application/json')
        .send({
          firstName: '',
          lastName: 'Leex'
        });
      const onDB = await Author.findOrFail(author.id);

      // assert
      assert.equal(response.status, 422)
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'required',
        field: 'firstName',
        message: 'required validation failed'
      }]);
      assert.equal(onDB.id, author.id);
      assert.equal(onDB.firstName, 'Harper');
      assert.equal(onDB.lastName, 'Lee');
    })

    test('/authors/:id should require lastName', async (assert) => {

      // act
      const response = await supertest(BASE_URL).put(`/authors/${author.id}`)
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'Bruce',
          lastName: '',
        });
      const onDB = await Author.findOrFail(author.id);

      // assert
      assert.equal(response.status, 422)
      assert.includeDeepMembers(response.body.errors, [{
        rule: 'required',
        field: 'lastName',
        message: 'required validation failed'
      }]);
      assert.equal(onDB.id, 1);
      assert.equal(onDB.firstName, 'Harper');
      assert.equal(onDB.lastName, 'Lee');
    })

    test('/authors/:id should update Author', async (assert) => {

      // act
      const response = await supertest(BASE_URL).put(`/authors/${author.id}`)
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'Bruce',
          lastName: 'Leex'
        });
      const onDB = await Author.findOrFail(author.id);

      // assert
      assert.equal(response.status, 200)
      assert.equal(response.type, 'application/json')
      assert.equal(response.body.id, 1)
      assert.equal(response.body.first_name, 'Bruce')
      assert.equal(response.body.last_name, 'Leex')
      assert.equal(onDB.id, 1);
      assert.equal(onDB.firstName, 'Bruce');
      assert.equal(onDB.lastName, 'Leex');
    })

  });

})

