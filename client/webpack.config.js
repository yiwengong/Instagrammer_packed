//webpack.config.js
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        use:"babel-loader",
        test:/\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }

}

module.exports = config;
