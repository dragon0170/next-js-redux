require('dotenv').config();
const path = require('path');

module.exports = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    NEXT_JS_URL: process.env.NEXT_JS_URL,
  },
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
};
