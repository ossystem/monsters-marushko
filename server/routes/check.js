const checkJwt = require('../lib/middlewares/checkJwt');

const check = app => {
  app.get('/check', checkJwt, async (req, res) => {
    res.json({
      success: true
    });
  });
};

module.exports = check;
