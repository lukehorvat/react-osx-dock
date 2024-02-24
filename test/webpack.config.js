const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type { webpack.Configuration } */
module.exports = {
  devServer: {
    port: 9000,
    open: true,
    hot: false,
    client: {
      logging: 'warn',
    },
  },
  entry: path.join(__dirname, 'index.tsx'),

  resolve: {
    extensions: ['.tsx', '.ts', '...'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
};
