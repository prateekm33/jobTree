const webpack = require('webpack');

module.exports = {
  entry: {
    main: './client/index.js'
  }, 

  resolve: {
    extensions: [ '', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  //helps separate dependencies out of bundles if you have multiple entry points 
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: ['main']
  //   })
  // ],


  devtool: 'eval'

}