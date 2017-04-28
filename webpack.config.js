const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './client/routes.jsx'
  ],
  output: {
    path: path.join(__dirname, 'client/static/js'),
    filename: 'app.bundle.js',
    publicPath: '/static/js/'
  },
  plugins: [new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./client/static/js/vendor-manifest.json'),
  })],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=react'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  }
};