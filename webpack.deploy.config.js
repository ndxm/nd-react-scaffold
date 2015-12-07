var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      './src/app'
    ],
    vendors: ['react', 'react-dom', 'jquery', 'q', 'react-router',  'rc-tabs', 'rc-switch', 'crypto-js', 'flux', 'object-assign']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // FIXME webpack 的 bug，见 https://github.com/webpack/webpack/issues/1315，回头需要给 vendors.js 同样加上 chunkhash
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    , new ExtractTextPlugin('app.[contenthash].css', {
      allChunks: true
    }), new HtmlWebpackPlugin({
      title: '手写数据标注系统',
      template: 'index-template.html',
      inject: 'body'
    }), new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules', 'common', 'img'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?optional[]=runtime'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'style')
      ],
      loader: ExtractTextPlugin.extract('style', 'css?modules!autoprefixer?{browsers:["> 5%", "ie 9"]}')
    },{
      test: /\.css$/,
      include: [
        path.resolve(__dirname, 'style')
      ],
      loader: ExtractTextPlugin.extract('style', 'css?autoprefixer?{browsers:["> 5%", "ie 9"]}')
    }, {
      test: /\.(svg|png|jpg|jpeg|gif)$/i,
      loaders: ['file']
    }]
  }
};
