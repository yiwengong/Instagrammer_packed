//webpack.config.js
const path = require('path');
const express = require('express');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        use:"babel-loader",
        test:/\.js$/,
        exclude: /node_modules/
      },
      {
          use: ["style-loader", "css-loader"],
          test: /\.css$/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    setup (app) {
      app.use('/images', express.static(__dirname + '/../public/images'));
      app.use('/avatar', express.static(__dirname + '/../public/avatar'));
      app.use('/dist', express.static(__dirname + '/dist'));
      app.use('/style', express.static(__dirname + '/style'));
    }
  }
}

module.exports = config;
