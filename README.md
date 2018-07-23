# p2p_pc
> gulp + browser-sync
> - 浏览器自动重载
> - sass编译、自动添加前缀、压缩、重命名、添加sourcemap、版本号
> - js压缩、添加sourcemap、版本号

###
```
    npm install // 下载模块
    npm run dev // 开发构建
    npm run run // 开发调试
    npm run build // 生成构建
    npm run build-test  // 生产测试
```

## gulp
### plugins -- npm i <plugin-name> -D
    - gulp
    - browser-sync  // 浏览器自动重载
    - cross-env // 环境变量
    - del   // 删除文件夹
    - gulp-asset-rev    // 自动添加版本号
    - gulp-rev
    - gulp-rev-collector

    - gulp-load-plugins // 加载gulp插件
    - gulp-changed  // 修改的更新
    - gulp-autoprefixer // css自动添加前缀
    - gulp-clean    // 清除文件
    - gulp-rename   // 重命名
    - gulp-sourcemaps   // 添加sourcemap
    - pump
    - run-sequence

    ## js
    - babel-core    // es6 -> es5
    - babel-preset-es2015
    - babel-preset-stage-1
    - gulp-babel

    - gulp-eslint   // eslint验证

    - gulp-uglify   // js压缩

    ## css
    - gulp-sass // sass编译
    - gulp-clean-css    // 清除css
    - gulp-filter       // css刷新

    ## images
    - gulp-cache // 图片缓存
    - gulp-imagemin // 图片压缩

    ## html
    - gulp-file-include // 引入公共文件
    - gulp-htmlmin  // html压缩


### 添加版本号
(https://www.jianshu.com/p/934ca1a5f189)[https://www.jianshu.com/p/934ca1a5f189]
```
-- 1 

打开node_modules\gulp-rev\index.js

134行：

manifest[originalFile] = revisionedFile;

更新为：

manifest[originalFile] = originalFile + '?v=' + file.revHash;

-- 2 

打开 node_modules\rev-path\index.js  

注意：原文这里的路径是打开nodemodules\gulp-rev\nodemodules\rev-path\index.js，根据你的具体情况进行修改。

9行 return modifyFilename(pth, (filename, ext) => `${filename}-${hash}${ext}`);

更新为：return modifyFilename(pth, (filename, ext) => `${filename}${ext}`);

17行 return modifyFilename(pth, (filename, ext) => filename.replace(new RegExp(`-${hash}$`), '') + ext);

更新为： return modifyFilename(pth, (filename, ext) => filename + ext);

-- 3

打开node_modules\gulp-rev-collector\index.js

40行：var cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );

更新为：var cleanReplacement =  path.basename(json[key]).split('?')[0];

-- 4

打开node_modules\gulp-assets-rev\index.js

78行 var verStr = (options.verConnecter || "-") + md5;

更新为：var verStr = (options.verConnecter || "") + md5;

80行 src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1");

更新为：src=src+"?v="+verStr;

-- 5、更改gulp-rev-collector

打开node_modules\gulp-rev-collector\index.js

第173行

regexp: new RegExp( prefixDelim + pattern, 'g' ),

更新为 regexp: new RegExp( prefixDelim + pattern + '(\\?v=\\w{10})?', 'g' ),

作者：谢耳朵_X
链接：https://www.jianshu.com/p/934ca1a5f189
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
```
