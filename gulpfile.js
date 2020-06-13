let {src, dest, parallel, series} = require("gulp");

let sync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    gulp = require("gulp");

function html() {
    return src("source/index.html")
    .pipe(dest("result/"))
    .pipe(sync.stream());
}

function browserSync() {
    sync.init({
        server: "result/",
        notify: false
    })
}

function css() {
    return src("source/scss/style.scss")
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(dest("result/css/"))
    .pipe(sync.stream());
}

function js() {
    return src("source/js/main.js")
    .pipe(dest("result/js/"))
    .pipe(sync.stream());
}

function images() {
    return src("source/images/*")
    .pipe(dest("result/images/"))
    .pipe(sync.stream());
}

function change() {
    gulp.watch("source/index.html", html);
    gulp.watch("source/scss/style.scss", css);
    gulp.watch("source/js/*", js);
}

let build = series(parallel(html, css, js, images), parallel(change, browserSync));
exports.default = build;