const {db: dbConfig} = require('../configs');

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
};
