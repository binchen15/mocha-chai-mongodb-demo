process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app/app.js');
const db = require('../app/db/index.js');

describe('POST /notes', () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('/POST Creating a new note works', (done) => {
    request(app).post('/notes')
      .send({ name: 'NOTE', text: "A new note" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('text');
        done();
      })
      .catch((err) => done(err));
  });

  it('/POST  note requires text field', (done) => {
    request(app).post('/notes')
      .send({ name: 'NOTE' })
      .then((res) => {
        const body = res.body;
        expect(body.errors.text.name)
          .to.equal('ValidatorError')
        done();
      })
      .catch((err) => done(err));
  });
})
