var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
//var typescript = require('typescript');
 
var tsProjects = [ts.createProject('GunnerBot/tsconfig.json')];
gulp.task('build-GBot', function () {
    var output = [];
    tsProjects.forEach(function (tsp) {
        //tsp.typescript = typescript;
        var tsResult = tsp.src().pipe(ts(tsp));
        output.push(tsResult.js.pipe(gulp.dest('./')));
        output.push(tsResult.dts.pipe(gulp.dest('./typings/')));
    });
    return merge(output);
});


var del = require('del');
var vinylPaths = require('vinyl-paths');
gulp.task('build-clean', function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src('typings/bin/**')
        .pipe(vinylPaths(del))
        .pipe(gulp.dest('typings'));
});

var uglify = require('gulp-uglify');
gulp.task('minify', function () {
    return gulp.src('bin/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('bin/'));
});

var runSequence = require('run-sequence');
gulp.task('build', function () {
    runSequence('build-GBot', 'build-clean', 'minify');
    //runSequence('build-GBot', 'build-clean');
});