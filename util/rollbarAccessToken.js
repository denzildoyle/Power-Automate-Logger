var Rollbar = require("rollbar");
exports.rollbar = rollbar = new Rollbar({
  accessToken: '',
  captureUncaught: true,
  captureUnhandledRejections: true
});