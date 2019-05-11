const { readdirSync } = require('fs');
const path = require('path');

const applyTo = app => {
  if (!app || (app && (typeof app.use !== 'function'))) {
    console.error('Routes haven\'t been initialized.');
    return process.exit(1);
  }

  readdirSync(__dirname).forEach(fileName => {
    if (!['index.js', '.', '..'].includes(fileName)) {
      require(path.join(__dirname, fileName))(app);
    }
  });

  return app;
};

module.exports = {
  applyTo
};