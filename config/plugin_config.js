module.exports = {
    fileIclude: {
        prefix: '@@',
        basepath: '@file'
    },
    autofix: {
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true,
        remove: true
    },
    htmlmin: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    },
    cleanCss: {
        advanced: false,
        compatibility: 'ie8',
        keepBreaks: true,
        keepSpecialComments: '*'
    },
    rename: {
        suffix: '.min'
    }
};
