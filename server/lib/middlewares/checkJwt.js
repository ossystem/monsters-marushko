const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const {auth} = require('../../configs');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth.auth0Domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  issuer: `https://${auth.auth0Domain}/`,
  algorithms: ['RS256']
});

module.exports = checkJwt;
