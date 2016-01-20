/**
 * Created by hjx on 10/26/2015.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

var replaceThis ='<div id="root"></div>';
var withThis ='<div id="root"></div>' +
    '<script src="/static/vendors.bundle.js"></script>'+
    '<script src="/static/bundle.js"></script>';

var cnt = fs.readFileSync('index-template.html');
fs.writeFileSync('index.html', cnt.toString().replace(replaceThis, withThis).replace(/\<title.*title\>/, '<title>Î¢²© Web</title>'));

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3030',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    vendors: ['react', 'react-dom', 'react-redux', 'redux', 'jquery', 'q', 'react-router',  'crypto-js', 'flux', 'object-assign']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
      loaders: ['react-hot', 'babel?optional[]=runtime'],
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
      loaders: ['style', 'css', 'autoprefixer?{browsers:["> 5%", "ie 9"]}']
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
