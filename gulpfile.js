const { src, watch, dest, series } = require('gulp')
const lazypipe = require('lazypipe')
const concat = require('gulp-concat')
const del = require('del')
//
const files = ['./src/test.js', './src/test/*.js']
const dist = './dist/'
const jsChannel = lazypipe().pipe(concat, 'bundle.js', { newLine: '' })

const build_js = function () {
  return src(files)
    .pipe(jsChannel())
    .pipe(dest(dist))
}
const watch_js = function () {
  watch(files, build_js)
}
const clear_dist = function (done) {
  del(dist, { force: true })
  done()
}
const build = series(clear_dist, build_js)
exports.default = build
exports.watch = series(exports.default, watch_js)
