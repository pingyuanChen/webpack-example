var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    common: ['react', 'react-router'],
    bundle: [
      'webpack/hot/dev-server',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
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

  devServer: {
    contentBase: '/build/',
    inline: true,
    hot: true,
    port: 3000
  },

  devtool: 'eval',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'src/_index.html'
    }),


    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel?stage=0'],
        include: path.join(__dirname, 'src'),
        exclude: ['/node_modules/']
      },
      {
        test: /\.scss$/,
        loaders: ['css-loader', 'sass-loader'],
        include: path.join(__dirname, 'src'),
      }
    ]
  }
};


