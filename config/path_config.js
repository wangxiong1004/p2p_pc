module.exports = {
    // html
    html_src_dev: [
        './src/**/*.html',
        '!./src/views/include/*.html'
    ],
    html_dest_dev: './dev',
    html_src_build: './dev/**/*.html',
    html_dest_build: './build',
    // css
    sass_src_dev: [
        './src/static/sass/index.scss',
        './src/static/sass/common.scss'
    ],
    sass_dest_dev: './dev/static/css',
    sass_src_build: './dev/static/**/*.css',
    sass_dest_build: './build/static'
};