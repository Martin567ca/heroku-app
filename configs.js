const dotenv = require('dotenv');

dotenv.config();

const configs = {
    development: {
      SERVER_URI: 'localhost:5000',
    },
    production: {
      SERVER_URI: 'https://finki-final-app.herokuapp.com/',
    },
  };
  
  module.exports.config = configs[process.env.NODE_ENV];