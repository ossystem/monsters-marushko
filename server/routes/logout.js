const models = require('../db/models');

const logout = app => {
  app.post('/logout', async (req, res, next) => {
    const {token} = req.body;

    if (!token) {
      console.error(__filename, `Invalid request body`);
      return next({
        status: 400
      });
    }

    const userRecord = await models.user.findOne({
      attributes: [
        'id'
      ],
      where: {
        token
      }
    });

    try {
      await userRecord.update({
        token: null
      }, {
        where: {
          id: userRecord.get('id')
        }
      });
    } catch (ex) {
      console.error(__filename, `User record wasn't updated`);
      return next({
        status: 500
      });
    }

    return res
      .status(200)
      .end();
  });
};

module.exports = logout;
