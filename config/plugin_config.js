module.exports = {
    fileIclude: {
        prefix: '@@',
        basepath: '@file'
    },
    autofix: {
//      browsers: ['last 2 versions', 'Android >= 4.0'],
        browsers: [
            'ie >= 9',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ],
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
