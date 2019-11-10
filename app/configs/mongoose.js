require('dotenv').config();
const mongoose = require('mongoose');

// log connection events

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('Connection Established');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed');
});

mongoose.connection.on('error', error => {
  console.log('ERROR: ' + error);
});

// connect to mongoose
async function connect(url) {
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    });
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`);

module.exports = mongoose;
