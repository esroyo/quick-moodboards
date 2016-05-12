var path = require('path');

module.exports = {
  devtool: 'eval',
  resolve: {
    root: __dirname + '/source',
    modulesDirectories: [
      'node_modules',
      'bower_components'
    ]
  },
  entry: [
    './source/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'source'),
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test   : /\.(jpg|png|ttf|eot|svg|woff2?)(\?[a-z0-9=&.]+)?$/,
      loader : 'url-loader??limit=30000&name=[name]-[hash].[ext]'
    }]
  }
};
