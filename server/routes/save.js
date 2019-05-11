const checkJwt = require('../lib/middlewares/checkJwt');
const checkScopes = require('../lib/checkScopes');

const save = app => {
  app.post('/save', checkJwt, checkScopes('write:answers'), (req, res) => {
    console.log('SCV ready go, Sir');

    res.json({
      data: 'Boom!'
    });
  });
};

module.exports = save;