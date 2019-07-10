const { src, dest, parallel} = require('gulp');
const concat = require('gulp-concat');
const unglify = require('gulp-uglify');

function js() {
    return src('src/**/*.js')
           .pipe(concat('main.js'))
           .pipe(unglify())
           .pipe(dest('dist'))
}

function html() {
    return src('src/*.html')
           .pipe(dest('dist'))
}

function css() {
    return src('src/**/*.css')
           .pipe(concat('main.css'))
           .pipe(dest('dist'))
}
  
exports.js = js
exports.html = html
exports.css = css
exports.default = parallel(js, css, html)