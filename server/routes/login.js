const {auth} = require('../configs');
const rp = require('request-promise');
const {StatusCodeError} = require('request-promise-core/lib/errors');

const login = app => {
  app.post('/login', async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
      console.error(__filename, `Invalid request body`);
      return next({
        status: 400
      });
    }

    const options = {
      method: 'POST',
      uri: auth.auth0TokenUrl,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: email,
        password: password,
        audience: auth.auth0AudienceUrl,
        scope: 'read:current_user',
        client_id: auth.auth0ClientId,
        client_secret: auth.auth0ClientSecret,
        realm: auth.auth0Realm
      }
    };

    let response;

    try {
      response = await rp(options);
    } catch (ex) {
      console.error(__filename, ex);

      let response = {
        status: 500
      };

      if (ex instanceof StatusCodeError) {
        response.status = ex.statusCode;
      }

      return next(response);
    }

    try {
      response = JSON.parse(response);
    } catch (ex) {
      console.error(__filename, ex);
      return next({
        status: 500
      });
    }

    Object.assign(response, {
      success: true
    });

    return res.json(response);
  });
};

module.exports = login;
