const path = require('path');
const {readdirSync} = require('fs');
const db = require('../index');

let models = null;

module.exports = (() => {
  if (!models) {
    let sequelize = {};
    models = {};

    try {
      sequelize = db.getConnection();

      readdirSync(__dirname).forEach(fileName => {
        if (!['index.js', '.', '..'].includes(fileName)) {
          const model = sequelize.import(path.join(__dirname, fileName));
          models[model.name] = model;
        }
      });

      Object.keys(models).forEach(modelName => {
        if (typeof models[modelName].associate === 'function') {
          models[modelName].associate(models);
        }
      });
    } catch (ex) {
      console.error(ex.message);
      process.exit(-1);
    }

    models.sequelize = sequelize;
  }

  return models;
})();
