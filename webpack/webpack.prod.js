const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');


module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '..', 'client', 'dist'),
    filename: '[name].bundle.js'
  },


  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
          screw_ie8: true
      },
      comments: false
    })
  ],


  devtool: 'cheap-module-source-map'
})