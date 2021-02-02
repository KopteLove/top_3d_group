const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('css', function () {
    return gulp.src('source/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src('source/js/script.js')
        .pipe(minify({noSource: true}))
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('refresh', function (done) {
    browserSync.reload();
    done();
});

gulp.task('clear', function () {
    console.log('clear');
    return del('build');
})

gulp.task('copy', function () {
    return gulp.src([
        'source/index.html',
        'source/css/normalize.min.css',
        'source/css/swiper-bundle.min.css',
        'source/img/*',
        'source/fonts/*',
        'source/js/swiper-bundle.min.js'
    ],{
        base: 'source'
    })
        .pipe(gulp.dest('build'));
})

gulp.task('serve', function() {

    browserSync.init({
        server: "build"
    });

    gulp.watch("source/scss/*.scss", gulp.series('css', 'refresh'));
    gulp.watch("source/js/script.js", gulp.series('js', 'refresh'));
    gulp.watch("source/*.html").on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('css', 'js', 'serve'));
gulp.task('build', gulp.series('clear', 'copy', 'css', 'js'));