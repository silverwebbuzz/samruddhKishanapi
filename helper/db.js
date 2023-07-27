const config = require("./config");

module.exports = {
  client: "mysql",
  connection: config.connection,
  debug: false,
  pool: {
    min: 1,
    max: 200,
  },
};
