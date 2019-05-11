const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: auth0Audience,
  issuer: `https://${auth0Domain}/`,
  algorithms: ['RS256']
});

module.exports = checkJwt;
