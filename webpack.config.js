const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js'),
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    hot: isDev,

  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new MomentLocalesPlugin(),
  ],
};
