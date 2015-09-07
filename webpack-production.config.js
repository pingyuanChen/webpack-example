var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'build');
var vendorPath = path.resolve(__dirname, 'src/vendor');

module.exports = {
  entry: {
    common: ['react', 'page'],
    bundle: ['./src/index']
  },

  output: {
    path: buildPath,
    filename: '[name].js',
    pathinfo: true
  },

  resolve: {
    root: [srcPath, vendorPath],
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src', 'vendor']
  },

  devtool: 'eval',

  plugins: [
    new webpack.ProvidePlugin({
      page: 'page'
    }),

    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),

    new webpack.optimize.CommonsChunkPlugin('common.js', ['common', 'bundle']),

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


