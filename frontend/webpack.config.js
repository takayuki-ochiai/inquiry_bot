// React Hot Loader
const webpack = require('webpack');
const path = require('path');
const cssLoader = 'style!css-loader?modules&importLoaders=1&'
  + 'localIdentName=[name]__[local]___[hash:base64:5]';

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  resolve: {
    // import/requireをするときに拡張子を省略できるようにする
    extensions: ['', '.js', '.jsx'],
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './react/main.jsx',
    './stylesheet/reset.css',
    './stylesheet/colors.css',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\.css$/,
        loader: cssLoader,
      },
    ],
  },
};
