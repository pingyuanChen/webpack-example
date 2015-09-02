var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    common: ['react', 'page'],
    bundle: ['./src/index']
  },

  output: {
    path: buildPath,
    filename: '[name].js'
  },

  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src']
  },

  devtool: 'eval',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'src/_index.html'
    }),

    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel?stage=0'],
        include: path.join(__dirname, 'src'),
        exclude: ['/node_modules/']
      }
    ]
  }
};


