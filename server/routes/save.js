const checkJwt = require('../lib/middlewares/checkJwt');

const save = app => {
  app.post('/save', checkJwt, (req, res) => {
    console.log('SCV ready go, Sir');

    res.json({
      data: 'Boom!'
    });
  });
};

module.exports = save;