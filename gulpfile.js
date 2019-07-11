const { src, dest, parallel, watch, series} = require('gulp');
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

function watch_task() {
    watch('src/**/*.css', css);
    watch('src/**/*.js', js);
    watch('src/*.html', html);
}
  
exports.js = js
exports.html = html
exports.css = css
exports.watch = series(parallel(js, css, html), watch_task)
exports.default = parallel(js, css, html)