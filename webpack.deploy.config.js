var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      './src/index'
    ],
    vendors: ['react', 'react-dom', 'react-redux', 'redux', 'jquery', 'q', 'react-router',  'crypto-js', 'flux', 'object-assign']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new ExtractTextPlugin('app.[contenthash].css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      title: '微博WEB',
      template: 'index-template.html',
      inject: 'body',
      filename:'../index.html'
    }), //根目录
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js')
  ],
  resolve: {
    modulesDirectories: [
      'node_modules', 'common', 'img'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?presets[]=es2015,presets[]=react,plugins[]=transform-runtime'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'style')
      ],
      loaders: ['style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
    }, {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, 'style')
      ],
      loader: ExtractTextPlugin.extract('style', 'css?modules!autoprefixer?{browsers:["> 5%", "ie 9"]}')
      /*
      loaders: ['style', 'css', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
      */
    }, {
      test: /\.json$/,
      include: [
        path.resolve(__dirname, 'img/smiley')
      ],
      loaders: ['json']
    }, {
      test: /\.(svg|png|jpg|jpeg|gif)$/,
      loaders: ['file']
    }]
  }
  ,externals: {CONFIG: "CONFIG"}
};
