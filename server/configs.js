const {ENVIRONMENT, PROTOCOL} = require('./lib/constants/main');

module.exports = {
  isDevelopment: process.env.NODE_ENV === ENVIRONMENT.DEV,
  server: {
    protocol: process.env.PROTOCOL || PROTOCOL.HTTP,
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },
  auth: {
    secret: '6e5934af6ba846948c7eb11c0e173bac',
    algorithm: 'HS256'  // https://www.npmjs.com/package/jsonwebtoken
  },
  middlewares: {
    rateLimit: {  // https://www.npmjs.com/package/rate-limiter-flexible
      points: process.env.RATE_LIMIT_MAX || 10,
      duration: process.env.RATE_LIMIT_WINDOW || 1,  // seconds
      blockDuration: process.env.RATE_LIMIT_BLOCK_DURATION || 60 * 60 * 24  // seconds
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
      enabled: process.env.CORS_ENABLED || true,
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
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1',
    database: process.env.DB_DATABASE,
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
      paranoid: true
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
