module.exports = {
    // html
    html_src_dev: [
        './src/**/*.html',
        '!./src/views/include/*.html'
    ],
    html_dest_dev: './dev',
    html_src_build: ['./dev/**/*.html'],
    html_dest_build: './build',
    html_rev_build: ['./build/rev/*.json', './build/**/*.html'],
    // css
    sass_src_dev: [
        './src/static/sass/index.scss',
        './src/static/sass/common.scss'
    ],
    sass_dest_dev: './dev/static/css',
    sass_src_build: './dev/static/css/*.css',
    sass_dest_build: './build/static/css',
    // images
    images_src_dev: './src/static/images/**/*.{png,jpg,gif,ico,jpeg}',
    images_dest_dev: './dev/static/images',
    images_src_build: './dev/static/images/**/*.{png,jpg,gif,ico,jpeg}',
    images_dest_build: './build/static/images',
    // js
    js_src_dev: './src/static/js/**/*.js',
    js_dest_dev: './dev/static/js',
    js_src_build: './dev/static/js/**/*.js',
    js_dest_build: './build/static/js',
    // rev
    rev_build: './build/rev'
};