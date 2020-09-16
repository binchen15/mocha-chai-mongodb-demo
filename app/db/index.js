const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function connect() {
  const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
  let mongoUri;
  
  if (process.env.NODE_ENV === 'test') {
  	mongoServer = new MongoMemoryServer();
  	mongoUri = await mongoServer.getUri();
		console.log(mongoUri);
    return await mongoose.connect(mongoUri, options);
  } else {
    mongoUri = "mongodb://localhost:27017/myapp";
		console.log(mongoUri);
  	return await mongoose.connect(mongoUri, options)
  }
}

async function close() {
  await mongoose.disconnect();
  if (process.env.NODE_ENV === 'test') {
		await mongoServer.stop();
	}
}

module.exports = { connect, close };
