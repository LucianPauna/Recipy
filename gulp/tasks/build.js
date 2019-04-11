const gulp = require('gulp'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

gulp.task('deleteDocsFolder', () => {
    return del('./docs');
});

gulp.task('copyImages', ['deleteDocsFolder'], () => {
    return gulp.src(['./app/assets/images/favicon.png', './app/assets/images/logo.png', './app/assets/images/icons.svg'])
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDocsFolder'], () => {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [() => rev(), () => cssnano()]
        }))
        .pipe(gulp.dest('./docs'))
});

gulp.task('build', ['deleteDocsFolder', 'copyImages', 'useminTrigger']);