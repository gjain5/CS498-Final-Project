/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
  app.use('/api', require('./users.js')(router));
  app.use('/api', require('./user.js')(router));
  app.use('/api', require('./tasks.js')(router));
  app.use('/api', require('./task.js')(router));
};
