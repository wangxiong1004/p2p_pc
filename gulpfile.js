var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pump = require('pump');
var runSequence = require('run-sequence');
var browser = require('browser-sync');
const reload = browser.reload;

var pathConfig = require('./config/path_config');
var pluginConfig = require('./config/plugin_config');

// html
/*
 * 变化的文件转移到dev下
 */
gulp.task('html_dev', function() {
    return pump([
        gulp.src(pathConfig.html_src_dev),
        plugins.fileInclude(pluginConfig.fileIclude),
        plugins.changed(pathConfig.html_dest_dev),
        gulp.dest(pathConfig.html_dest_dev)
    ]);
});

/*
 * html压缩
 */
gulp.task('html_build', function() {
    return pump([
        gulp.src(pathConfig.html_src_build),
        plugins.htmlmin(pluginConfig.htmlmin),
        gulp.dest(pathConfig.html_dest_build)
    ]);
});

// sass
/*
 * sass编译
 * sourcemap追踪
 * 自动添加前缀
 */
gulp.task('sass_dev', function() {
    return pump([
        gulp.src(pathConfig.sass_src_dev),
        plugins.sourcemaps.init(),
        plugins.sass({
            outputStyle: 'expanded',
            sourcemap: true
        }).on('error', plugins.sass.logError),
        plugins.autoprefixer(pluginConfig.autofix),
        plugins.sourcemaps.write('./sourcemaps'),
        gulp.dest(pathConfig.sass_dest_dev),
//      reload({stream: true})
    ]);
});

/*
 * 压缩css
 * 重命名 .min.css
 */
gulp.task('sass_build', function() {
   return pump([
        gulp.src(pathConfig.sass_src_build),
        plugins.cleanCss(pluginConfig.cleanCss),
        plugins.rename(pluginConfig.rename),
        gulp.dest(pathConfig.sass_dest_build)
   ]);
});
