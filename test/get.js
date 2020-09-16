process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app/app.js');
const db = require('../app/db/index.js');

describe("GET /notes", () => {

	before( (done) => {
		db.connect()
			.then( () => done())
			.catch( (err) => done(err));
	})

	after( (done) => {
		db.close()
			.then( () => done())
			.catch( (err) => done(err));
	})

	it("get notes return no notes", (done) => {
		request(app).get("/notes")
			.then((res)=>{
				const body = res.body;
				expect(body.length).to.equal(0);
				done();
			})
			.catch((err)=>done(err));
	})

	it("get notes return one note", (done) => {
		request(app).post("/notes")
			.send({name:"Note Test", text:"must be provided"})
			.then((res) => {
				request(app).get("/notes")
					.then((res)=>{
						const body = res.body;
						expect(body.length).to.equal(1);
						done();
					})
			})
			.catch((err)=>{
				done(err);
			})
	})

})
