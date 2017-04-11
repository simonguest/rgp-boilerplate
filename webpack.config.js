const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/static/'
  },
  plugins: [new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./dist/vendor-manifest.json'),
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