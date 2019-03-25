const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssimport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssimport, mixins, cssvars, nested, autoprefixer]))
        .on('error', (er) => {
            console.log(er.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});