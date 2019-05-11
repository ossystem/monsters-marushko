const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'dist/'),
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
