const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  entry: {
    app: path.join(__dirname, 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js',
    clean: true,
  },
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
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, 'images'), to: 'images' }],
    }),
  ],
};
