const mongoose = require('mongoose');
const log = require('debug')('r2:mongoose');

mongoose.Promise = Promise;
module.exports = function Mongoose(app, conf) {
  const getConfig = conf || app.config('mongodb');
  if (!getConfig) {
    return log('mongodb config not found!');
  }

  const {
    database, host = '127.0.0.1', port = 27017, debug = false, connectOptions = {},
  } = getConfig;

  let { uri } = getConfig;
  if (!uri) {
    const { user, pass } = getConfig;
    const auth = user && pass ? `${user}:${pass}@` : '';
    uri = `mongodb://${auth}${host}:${port}/${database}`;
  }

  log('%o', getConfig);
  log(uri);

  const db = mongoose.connect(uri, Object.assign(connectOptions, { useMongoClient: true }));
  mongoose.connection.setMaxListeners(0);
  mongoose.connection.on('error', log);
  mongoose.connection.on('open', () => log('client connected'));
  mongoose.set('debug', debug);

  return db;
};
