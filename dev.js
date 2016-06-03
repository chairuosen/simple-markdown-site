var exec = require('child_process').exec;

function run(cmd) {
    var instance = exec(cmd);
    instance.on('close',function () {
        process.exit();
    })
    process.on('exit',function () {
        instance.kill();
    })
}
run('gulp watch');
run('cd dist;browser-sync start --files=*.html,**/*.js,**/*.css --server --no-notify');