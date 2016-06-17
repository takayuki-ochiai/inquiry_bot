import hook from 'css-modules-require-hook';
// import jsdom from 'jsdom'

// tell mocha to load css files
// mochaでテスト時にcss modulesの読み込みでエラーになるのを回避する
hook({ extensions: ['.css'] });


// mountメソッドでテストする必要が出てきたら復活させる。今はその必要がないのでコメントアウト
// // setup the simplest document possible
// let doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
//
// // get the window object out of the document
// let win = doc.defaultView
// // set globals for mocha that make access to document and window feel
// // natural in the test environment
// global.document = doc
// global.window = win
//
// // take all properties of the window object and also attach it to the
// // mocha global object
// propagateToGlobal(win)
//
// // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
// function propagateToGlobal (window) {
//   for (let key in window) {
//     if (!window.hasOwnProperty(key)) continue
//     if (key in global) continue
//
//     global[key] = window[key]
//   }
// }
