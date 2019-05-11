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

    let errorDescription = '';
    const status = err.status || 500;

    switch (status) {
      case 404:
        errorDescription = `Route not found`;
        break;
      case 429:
        errorDescription = `Request limit exceeded`;
        break;
      default:
        errorDescription = `Server error`;
    }

    res
      .status(status)
      .send(errorDescription);
  });

  return app;
};

module.exports = {
  applyTo
};
