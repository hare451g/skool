require('dotenv').config();
const App = require('./app');

const { SERVER_HOST, SERVER_PORT } = process.env;

App.listen(SERVER_PORT, () => {
  console.log(`Skool WebService is running @ ${SERVER_HOST}:${SERVER_PORT}`);
});
