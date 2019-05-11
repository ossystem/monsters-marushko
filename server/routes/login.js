const models = require('../db/models');

const login = app => {
  app.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    let token = false;

    if (!email || !password) {
      console.error(__filename, `Invalid request body`);
      return next({
        status: 400
      });
    }

    const userRecord = await models.user.findOne({
      attributes: [
        'id',
        'passwordHash',
        'passwordSalt'
      ],
      where: {
        email
      }
    });

    if (userRecord) {
      if (!userRecord.isValidPassword(password)) {
        console.error(__filename, `Invalid password`);
        return next({
          status: 401
        });
      }

      const id = userRecord.get('id');

      token = models.user.generateTokens(id);

      if (token) {
        try {
          await userRecord.update({
            token
          }, {
            where: {
              id
            }
          });
        } catch (ex) {
          console.error(__filename, `User record wasn't updated`);
          return next({
            status: 500
          });
        }
      } else {
        console.error(__filename, `Token hasn't been generated`);
        return next({
          status: 500
        });
      }
    } else {
      return next({
        status: 401
      });
    }

    return res
      .set('Content-type', 'text/plain; charset=utf-8')
      .send(token);
  });
};

module.exports = login;
