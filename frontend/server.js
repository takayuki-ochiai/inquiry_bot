/**
 * Require Browsersync along with webpack and middleware for it
 */

 // baseDir: サーバーのベースとなるディレクトリ。
 // middleware: 使用するミドルウェア。devMiddlewareではpublicPathの指定が必須となります。
 // files: Browsersync が変更を監視するファイル群。変更がなされると、ページ全体をリロードします。js ファイル群の監視は webpack に任せるので、ここに記述する必要はありません。

let browserSync = require('browser-sync');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpackConfig = require('./webpack.config');
let bundler = webpack(webpackConfig);

browserSync({
    server: {
      baseDir: './',

      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        webpackHotMiddleware(bundler)
      ]
    },

    files: [
      './stylesheet/*.css',
      './index.html'
    ]
});
