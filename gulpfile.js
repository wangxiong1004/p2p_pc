var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pump = require('pump');
var runSequence = require('run-sequence');
var del = require('del');
var browser = require('browser-sync');
var reload = browser.reload;

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

gulp.task('html_path', function() {
    return pump([
        gulp.src(pathConfig.html_rev_build),
        plugins.revCollector(),
        gulp.dest(pathConfig.html_dest_build)
    ]);
})

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
        plugins.filter('**/*.css'),
        reload({stream: true})
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
//      plugins.rename(pluginConfig.rename),
        plugins.assetRev(),
        plugins.rev(),
        gulp.dest(pathConfig.sass_dest_build),
        plugins.rev.manifest('rev-css-mainfest.json'),
        gulp.dest(pathConfig.rev_build)
   ]);
});

// images
/*
 * 图片转移到/dev
 */
gulp.task('images_dev', function() {
   return pump([
       gulp.src(pathConfig.images_src_dev),
       plugins.changed('./dev/static/images'),
       gulp.dest(pathConfig.images_dest_dev),
       reload({stream: true})
   ]);
});

gulp.task('images_build', ['images_dev'], function() {
    return pump([
        gulp.src(pathConfig.images_src_build),
        plugins.cache(plugins.imagemin()),
        gulp.dest(pathConfig.images_dest_build)
    ]);
});

// js
/*
 * js转移到/dev
 * jssourcemap
 * eslint规则校验
 * es6转es5
 */
gulp.task('js_dev', function() {
    return pump([
        gulp.src(pathConfig.js_src_dev),
        plugins.sourcemaps.init(),
//      plugins.eslint(),
//      plugins.eslint.format(),
        plugins.changed('./dev/js'),
//      plugins.babel({
//          presets: ['es2015', 'stage-1']
//      }),
        plugins.sourcemaps.write('./sourcemaps'),
        gulp.dest(pathConfig.js_dest_dev),
        reload({stream: true})
    ]);
});

/*
 * js压缩
 */
gulp.task('js_build', function() {
    return pump([
        gulp.src(pathConfig.js_src_build),
        plugins.uglify(),   // pluginConfig.uglify
        plugins.rev(),
        plugins.assetRev(),
        gulp.dest(pathConfig.js_dest_build),
        plugins.rev.manifest('rev-js-manifest.json'),
        gulp.dest(pathConfig.rev_build)
    ]);
});

// libs
/*
 * 转移插件
 */
gulp.task('libs_dev', function() {
    return pump([
        gulp.src('./src/static/libs/**/*'),
        gulp.dest('./dev/static/libs')
    ]);
});

gulp.task('libs_build', function() {
    return pump([
        gulp.src('./dev/static/libs/**/*'),
        gulp.dest('./build/static/libs')
    ]);
});

// json
/*
 * 转移数据
 */
gulp.task('json_dev', function() {
    return pump([
        gulp.src('./src/_data/**/*.json'),
        gulp.dest('./dev/_data'),
        reload({stream: true})
    ]);
});

gulp.task('json_build', function() {
    return pump([
        gulp.src('./dev/_data/**/*.json'),
        gulp.dest('./build/_data')
    ]);
});

// clean
gulp.task('clean_dev', function(cb) {
    return del(['./dev/**/*'], cb);
});

gulp.task('clean_build', function(cb) {
    return del(['./build/**/*'], cb);
});

// server
/*
          编译
          清空 /dev 文件夹，将 html、编译后的css、编译后的js、libs中文件、图片、json文件引入
*/
gulp.task('dev', function() {
    // [] 中任务是并行的，其他按照先后顺序执行
    runSequence('clean_dev', 'html_dev', [
        'sass_dev', 'js_dev', 'libs_dev'
    ], 'images_dev', 'json_dev');
});

/*
 * 开发测试
 */
gulp.task('run', function() {
    browser.init({
        server: {
            baseDir: './dev',
            index: 'index.html'
        },
        open: 'external',
        injectChanges: true,    // 注入CSS改变
        port: 3000
    });

    gulp.watch('./src/static/sass/**/*.scss', ['sass_dev']);
    gulp.watch('./src/static/js/**/*.js', ['js_dev']);
    gulp.watch('./src/static/images/**/*.{png,jpg,gif,ico,jpeg}', ['images_dev']);
    gulp.watch('./src/_data/**/*.json', ['json_dev']);
    gulp.watch('./src/**/*.html', ['html_dev']).on('change', reload);
});

/*
          压缩输出
          清空 /build 文件夹，压缩html、压缩css、压缩js、引入libs中文件、引入压缩后图片、引入json，同时添加MD5
*/
gulp.task('build', function(cb) {
    runSequence('clean_build', 'html_build', [
        'sass_build', 'js_build', 'libs_build'
    ], 'html_path', 'images_build', 'json_build', cb)
});

/*
 * 生产测试
 */
gulp.task('build-test', function() {
    // 生产版本不允许更改文件后实时编译输出
    browser.init({
        server: {
            baseDir: './build'
        },
        open: 'external',
        port: 3000
    });
});