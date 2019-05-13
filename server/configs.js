const {
  ENVIRONMENT: { DEV, PROD },
  PROTOCOL: { HTTP }
} = require('./lib/constants/main');

const {
  NODE_ENV = PROD,
  PROTOCOL = HTTP,
  PORT = 3000,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  RATE_LIMIT_MAX = 10,
  RATE_LIMIT_WINDOW = 1,
  RATE_LIMIT_BLOCK_DURATION = 60 * 60 * 24,
  CORS_ENABLED = true,
  DB_HOST = 'localhost',
  DB_USERNAME = 'root',
  DB_PASSWORD = '1',
  DB_DATABASE
} = process.env;

module.exports = {
  isDevelopment: NODE_ENV === DEV,
  server: {
    protocol: PROTOCOL,
    host: '0.0.0.0',
    port: PORT
  },
  auth: {
    auth0Realm: 'Username-Password-Authentication',
    auth0ClientId: AUTH0_CLIENT_ID,
    auth0ClientSecret: AUTH0_CLIENT_SECRET,
    auth0Domain: AUTH0_DOMAIN,
    auth0TokenUrl: `https://${AUTH0_DOMAIN}/oauth/token`,
    auth0AudienceUrl: `https://${AUTH0_DOMAIN}/api/v2/`,
  },
  middlewares: {
    rateLimit: {  // https://www.npmjs.com/package/rate-limiter-flexible
      points: RATE_LIMIT_MAX,
      duration: RATE_LIMIT_WINDOW,  // seconds
      blockDuration: RATE_LIMIT_BLOCK_DURATION  // seconds
    },
    bodyParser: {  // https://www.npmjs.com/package/body-parser
      json: {
        limit: '4kb'
      },
      urlencoded: {
        limit: '4kb',
        parameterLimit: 10,
        extended: false
      }
    },
    corsConfigs: {  // https://www.npmjs.com/package/cors
      enabled: CORS_ENABLED,
      allowedOrigin: '*',
      allowedMethods: [
        'GET',
        'POST',
        'OPTIONS'
      ],
      allowedHeaders: [
        'Accept',
        'Authorization',
        'Content-Type',
        'Origin',
        'X-Requested-With'
      ]
    }
  },
  db: {  // http://docs.sequelizejs.com/
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    logging: false,
    timeout: 30 * 1000,  // ms
    timezone: '+00:00',
    operatorsAliases: false,
    define: {
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
        useUTC: true
      },
      charset: 'utf8mb4',  // this charset is required for storing any special chars in DB
      underscored: false,
      timestamps: false,
      paranoid: false
    },
    sync: {
      force: true
    },
    pool: {
      max: 50,  // maximum opened active connections to DB
      idle: 30000  // after this time an inactive connection will be closed, ms
    }
  }
};
