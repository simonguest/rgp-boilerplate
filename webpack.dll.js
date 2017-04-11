const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['./vendors'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.join(__dirname, 'dist'),
    library: 'vendor_lib',
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: 'dist/vendor-manifest.json',
  })]
};