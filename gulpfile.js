const { src, dest, parallel, watch, series} = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const unglify = require('gulp-uglify');

function js() {
    return src('src/**/*.js')
           .pipe(concat('main.js'))
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

function js_build() {
    return src('src/**/*.js')
           .pipe(concat('main.js'))
           .pipe(replace(/..\/assets/g,'./assets'))
           .pipe(unglify())
           .pipe(dest('build'))
}

function html_build() {
    return src('src/*.html')
            .pipe(replace(/\.\.\/assets/g,'./assets'))
            .pipe(dest('build'))
}

function css_build() {
    return src('src/**/*.css')
           .pipe(concat('main.css'))
           .pipe(replace(/..\/assets/g,'./assets'))
           .pipe(dest('build'))
}

function assets() {
    return src('assets/*')
           .pipe(dest('build/assets'))
}


function watch_task() {
    watch('src/**/*.css', css);
    watch('src/**/*.js', js);
    watch('src/*.html', html);
}

exports.js = js
exports.html = html
exports.css = css
exports.build = parallel(js_build, css_build, html_build, assets)
exports.watch = series(parallel(js, css, html), watch_task)
exports.default = parallel(js, css, html)