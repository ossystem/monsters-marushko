process.env.ROOT = __dirname;
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const sanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const requestId = require('express-request-id');
const db = require('./db');
const rateLimit = require('./lib/middlewares/rateLimiter');
const errorHandlers = require('./lib/errorHandlers');
const {PROTOCOL} = require('./lib/constants/main');
const routes = require('./routes');
const pid = process.pid;
const {
  isDevelopment,
  server: {protocol, host, port},
  middlewares: {corsConfigs, bodyParser}
} = require('./configs');
const protocolModule = (protocol === PROTOCOL.HTTPS) ? PROTOCOL.HTTPS : PROTOCOL.HTTP;

const app = express();

// It needs to logging into console only if it's not production mode
if (isDevelopment) {
  app.use(logger('combined'));
}

// Applying all required middlewares
app.use(rateLimit);
app.use(requestId());
app.use(cors((corsConfigs && corsConfigs.enabled) ? corsConfigs : {}));
app.use(express.json(bodyParser.json));
app.use(express.urlencoded(bodyParser.urlencoded));
app.use(helmet());
app.use(sanitizer());
app.use(cookieParser());
app.use(express.static('public'));

app.set('trust proxy', true);

// Initializing routes for processing business logic
routes.applyTo(app);

// Initializing routes for handling any errors
errorHandlers.applyTo(app);

// Creating server instance
const server = require(protocolModule)
  .createServer(app)
  .on('error', err => {
    console.error(err);
    process.exit(1);
  })
  .on('listening', () => {
    console.log(`Server has been started. Pid: ${pid}`);
    console.log(`Application is available on ${protocol}://${host}:${port}`);

    // Initializing DB connection
    if (!db.getConnection()) {
      console.error(`DB connection has not established`);
      server.close(() => {
        process.exit(1);
      });
    }
  });

// Initializing signals' handlers for run server
process
  .on('SIGINT', () => {
    console.log(`Process ${pid} stopped manually`);
    db.closeConnection();
    server.close(() => {
      process.exit(0);
    });
  })
  .on('SIGTERM', () => {
    console.log(`Process ${pid} stopped`);
    db.closeConnection();
    server.close(() => {
      process.exit(0);
    });
  })
  .on('unhandledRejection', reason => {
    console.error(__filename, `Unhandled rejection: ${reason}. Pid: ${pid}`);
    db.closeConnection();
    process.exit(1);
  })
  .on('uncaughtException', err => {
    console.error(__filename, `Uncaught exception: ${err}. Pid: ${pid}`);
    db.closeConnection();
    process.exit(1);
  });

// Running server instance
server.listen({host, port});
