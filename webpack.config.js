const path = require('path');
require('babel-polyfill');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: process.env.RUNNING_MODE || 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          'node_modules',
          'server'
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx'
    ]
  }
};
