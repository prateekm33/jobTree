const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');


module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '..', 'client', 'dist'),
    filename: '[name].bundle.js'
  },

  devtool: 'cheap-module-source-map'
})