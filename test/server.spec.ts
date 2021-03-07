import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Server', () => {

  test('GET /health should return a health report', async (assert) => {

    // act
    const response = await supertest(BASE_URL).get('/health');

    // assert
    assert.equal(response.status, 200)
    assert.equal(response.type, 'application/json')
    assert.equal(response.body.healthy, true)
  })

})

