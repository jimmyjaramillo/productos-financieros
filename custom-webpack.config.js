const webpackCustom = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    plugins: [
      new webpackCustom.EnvironmentPlugin({
        'API_URL': null,
        'AUTHOR_ID': null,
      }
    )
    ]
  };
