const jwtAuthz = require('express-jwt-authz');

const checkScopes = scopes => {
  scopes = Array.isArray(scopes) ? scopes : [scopes];
  return jwtAuthz(scopes);
};

module.exports = checkScopes;
