const app = require('./app.js');
const db = require('./db/index.js');

const PORT = process.env.PORT || 5000;
process.env.NODE_ENV = "production";

db.connect()
	.then( () => {
		console.log("connected")
	})
	.catch( (err) => {
		console.log("something wrong! ", err);
	});
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
