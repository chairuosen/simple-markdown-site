var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;
var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var del = require('del');
var replace = require('gulp-replace');
var fs = require('fs');

var option = {
    src:{
        md:'src/resume.md',
        html:'src/index.html',
        static:['src/scripts/*','src/styles/*']
    },
    dist:'dist'
};

function getDistDir(file) {
    var path = file.path;
    var match = path.match(/^.*\/src(\/.*)\/[^\/]*$|^.*\/src(\/)[^\/]*$/);
    var relativeDist = match[1]||match[2];
    return option.dist+relativeDist;
}

function encode(text) {
    return new Buffer(text).toString('base64');
}

gulp.task('clean', function (cb) {
    del([option.dist + "/*"], {dot: true}, cb);
});

gulp.task('copy',function () {
    return gulp.src(option.src.static)
        .pipe(gulp.dest(getDistDir));
});

gulp.task('build:html',function () {
    var content = fs.readFileSync(option.src.md).toString();
    content = encode(encodeURIComponent(content));
    return gulp.src([option.src.html])
        .pipe(replace(/__replace__/g,content))
        .pipe(gulp.dest(getDistDir));
});

gulp.task('build',['copy'],function () {
    return gulp.start('build:html');
});

gulp.task('watch',function (cb) {
    watch('src/**/*',function (file) {
        if( ['resume.md','index.html'].indexOf(path.basename(file.path)) >=0 ){
            gulp.start('build:html');
        }else{
            gulp.start('copy');
        }
    })
})
