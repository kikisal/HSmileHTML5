const path = require('path');

module.exports = {
  entry: './dist/HSmileHTML.js',
  output: {
    filename: 'hsmile-client.js',
    path: path.resolve(__dirname, 'public/js/out'),
  },
};