var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;
var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var del = require('del');
var replace = require('gulp-replace');
var fs = require('fs');
var through2 = require('through2');
var marked = require('marked');

var option = {
    src:{
        md:['markdown/**/*.md'],
        html:'src/index.html',
        static:['src/_scripts_/*','src/_styles_/*']
    },
    dist:'dist'
};

function run(cmd) {
    var instance = exec(cmd);
    instance.on('close',function () {
        process.exit();
    })
    process.on('exit',function () {
        instance.kill();
    })
}

function encode(text) {
    return new Buffer(text).toString('base64');
}

gulp.task('clean', function (cb) {
    del([option.dist + "/*"], {dot: true}, cb);
});

gulp.task('copy',function () {
    return gulp.src(option.src.static,{base: 'src'})
        .pipe(gulp.dest(option.dist));
});

// gulp.task('build:html',function () {
//     var content = fs.readFileSync(option.src.md).toString();
//     content = encode(encodeURIComponent(content));
//     return gulp.src([option.src.html])
//         .pipe(replace(/__content__/g,content))
//         .pipe(gulp.dest(getDistDir));
// });

gulp.task('build:html',function () {
    var templateHTML = fs.readFileSync(option.src.html).toString();
    return gulp.src(option.src.md,{base: 'markdown'})
        .pipe(through2.obj(function (file, enc, callback) {
            var name = path.basename(file.path);
            var markdown = file.contents.toString();
            var markdownHtml = marked(markdown);
            var html = templateHTML.replace(/__content__/,markdownHtml);
            html = html.replace(/__title__/,name);
            file.path = file.path.replace(/\.md/,".html");
            file.contents = new Buffer(html);
            this.push(file);
            callback()
        }))
        .pipe(gulp.dest(option.dist));
});

gulp.task('build',['copy'],function () {
    return gulp.start('build:html');
});

gulp.task('dev',function (cb) {
    run('gulp watch');
    run('mkdir dist;cd dist;browser-sync start --files=*.html,**/*.js,**/*.css --server --no-notify');
});

gulp.task('watch',['build'],function (cb) {
    watch(['src/**/*'].concat(option.src.md),function (file) {
        var name = path.basename(file.path);
        if(
            name == 'index.html'
            || name.split('.')[1] == "md"
        ){
            gulp.start('build:html');
        }else{
            gulp.start('copy');
        }
    })
})
