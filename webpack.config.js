var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './components/App.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  }
};