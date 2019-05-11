const errorMessages = {
  400: 'Invalid parameters',
  401: 'Unauthorized',
  404: 'Route not found',
  429: 'Request limit exceeded',
  500: 'Server error'
};

const applyTo = app => {
  if (!app || (app && (typeof app.use !== 'function'))) {
    console.error('Express error handlers haven\'t been initialized.');
    return;
  }

  app.use((req, res, next) => next({
    status: 404
  }));

  app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;

    res
      .status(status)
      .set('Content-Type', 'text/plain;charset=utf-8')
      .send(errorMessages[status]);
  });

  return app;
};

module.exports = {
  applyTo
};
