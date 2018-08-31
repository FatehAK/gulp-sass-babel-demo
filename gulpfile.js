const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglifyes');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

// sample hello task
gulp.task('hello', function () {
    console.log('Hello Fateh');
});

// task to convert scss to css
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // add vendor prefixes
        .pipe(autoprefixer( {
            // for upto last 2 browser versions
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        // start stream on reload
        .pipe(browserSync.reload({
            stream: true
        }))
});

// browserSync for live reload
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// watch html, css, js files for changes
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// js and css files concatenation
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // use babel to convert ES6 to ES5
        .pipe(gulpIf('*.js', babel( {
            presets: ['@babel/env']
        })))
        // Minifies only if its a JS file
        .pipe(gulpIf('*.js', uglify().on('error', function (e) {
            console.log(e);
        })))
        // Minifies only if its a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// task for image optimization
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            //for gifs
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// task for moving fonts to production
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// clear the image cache
gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
        return cache.clearAll(cb);
    });
})

// clean the dist directory on before building
gulp.task('clean:dist', function () {
    return del.sync('dist');
});

// our optimization task
gulp.task('build', function (callback) {
    runSequence('clean:dist', 'sass', ['useref', 'images', 'fonts'], callback)
});

// our development task
gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync'], 'watch', callback)
});