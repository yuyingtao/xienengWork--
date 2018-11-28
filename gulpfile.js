var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({
        pattern: '*' //让gulp-load-plugins插件能匹配除了gulp插件之外的其他插件
    }),
    merge = require('merge-stream'),
    gutil = require('gulp-util'),
    argv = require('minimist')(process.argv.slice(2)),
    path = {
        staticFile: 'staticFile/*',
        html: 'html/**/*.html',
        htmlDir: 'dest',
        css: 'css/*.css',
        cssDir: 'dest/css',
        style: ['style/**/*.less'],
        js: ['js/**/*.js','!js/**/*.min.js', 'js/**/*.min.js', 'js/**/*.json', 'js/**/*.{css,min.css}', 'js/**/*.{png,jpg,jpeg,gif,ico}', 'js/**/**'],
        es6: ['js/**/*.es6'],
        jsDir: 'dest/js',
        images: 'images/**/*.+(jpg|jpeg|png|gif|svg|ico)',
        imagesDir: 'dest/images',
        MockData: './mockJs/*'
    },
    middleware = [],
    RELEASE = !!argv.release,             // 是否在构建时压缩和打包处理
    isMock = false;   // 是否在构建demo环境

var fs = require('fs');

console.log('release =', RELEASE);

// 第三方插件管理
gulp.task('vendor', function () {
    return merge(
        gulp.src('node_modules/jquery/dist/*.*')
            .pipe(gulp.dest('dest/js/vendor/jquery')),
        gulp.src('node_modules/bootstrap/dist/**/*')
            .pipe(gulp.dest('dest/js/vendor/bootstrap'))
    );
});
//压缩css,压缩后的文件放入dest/css
gulp.task('minifycss', function () {
    return gulp.src(path.css)
        .pipe(RELEASE ? plugins.cssmin(): plugins.util.noop()) //压缩
        .pipe(gulp.dest(path.cssDir));//输出
});
//静态资源，文件放入dest/
gulp.task('staticFile', function () {
    return gulp.src(path.staticFile)
        // .pipe(plugins.cssmin()) //压缩
        .pipe(gulp.dest(path.htmlDir));//输出
});

//合并并压缩css，合并压缩后的文件放入dest/css
gulp.task('concatminifycss', function () {
    return gulp.src(path.css)
        .pipe(plugins.concat('main.css'))    //合并所有css到main.css
        //.pipe(gulp.dest(path.cssDir))    //输出main.css到文件夹
        //.pipe(plugins.rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(plugins.cssmin())//压缩
        .pipe(gulp.dest(path.cssDir));//输出
});

//压缩js，压缩后的文件放入dest/js
gulp.task('minifyjs', function () {
    return gulp.src(path.js.slice(0, 1))
        // .pipe(plugins.plumber()) //替换错误的pipe方法  使数据流正常运行
        .pipe(plugins.if(RELEASE, plugins.uglify()))//压缩
        .on('error', function(err) {
            gutil.log('minifyjs Error!', err.message);
            this.end();
        })
        .pipe(plugins.bom())
        .pipe(gulp.dest(path.jsDir));//输出
});
//压缩js，压缩后的文件放入dest/js
gulp.task('es6to5', function () {
    return gulp.src(path.es6)
        // .pipe(plugins.plumber()) //替换错误的pipe方法  使数据流正常运行
        // .pipe(plugins.babel({"compact": false,presets:['es2015']}))
        .pipe(plugins.if(RELEASE, plugins.babel({"compact": false,presets:['es2015']}),plugins.rename(function (path) {
            path.extname='.js'
        })))
        // .pipe(plugins.if(RELEASE, plugins.uglify()))//压缩
        .pipe(plugins.if(RELEASE, plugins.uglify()))//压缩
        .on('error', function(err) {
            gutil.log('minifyjs Error!', err.message);
            this.end();
        })
        .pipe(plugins.bom())
        .pipe(gulp.dest(path.jsDir));//输出
});

//合并并压缩js，合并压缩后的文件放入dest/js
gulp.task('concatminifyjs', function () {
    return gulp.src(path.js.slice(0, 1))
        .pipe(plugins.concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest(path.jsDir))    //输出main.js到文件夹
        .pipe(plugins.rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(plugins.uglify())//压缩
        .pipe(gulp.dest(path.jsDir));//输出
});
gulp.task('unscripts', function () {
    return gulp.src(path.js.slice(1,6))
        // .pipe(plugins.bom())
        .pipe(gulp.dest(path.jsDir));
});
//合并并压缩html，合并压缩后的文件放入dest/
gulp.task('html', function () {
    gulp.src(path.html)
        // .pipe(plugins.replace('__VERSION', Date.now().toString(16)))
        .pipe(plugins.if(RELEASE,plugins.htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        })))
        .pipe(gulp.dest(path.htmlDir))
        // .pipe(plugins.browserSync.stream());
});
//压缩图片，压缩后的文件放入dest/images
gulp.task('image', function () {
    gulp.src(path.images)
        /*.pipe(plugins.imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))*/
        .pipe(gulp.dest(path.imagesDir));//输出
});

//执行压缩前，先删除dest文件夹里的内容
gulp.task('clean', function (cb) {
    plugins.del(['dest/*'], cb)
});

//编译less到css
gulp.task("style", function () {
    gulp.src(path.style)
        .pipe(plugins.less())
        .pipe(plugins.if(RELEASE,plugins.minifyCss()))
        .pipe(gulp.dest(path.cssDir));

});
//监视文件的变化
gulp.task("watch", function () {
    gulp.watch(path.style, ['style']);
    gulp.watch(path.css, ['minifycss']);
    gulp.watch(path.html, ['html']);
    gulp.watch(path.images, ['image']);
    gulp.watch(path.js[6], ['minifyjs','unscripts', 'es6to5']);
});
gulp.task("build", ["clean"], function (cb) {
    var gulpFils = ['staticFile','minifycss', 'image', 'style', 'vendor',  'unscripts', 'minifyjs', 'es6to5', 'html', "watch"]
    if(isMock){
        plugins.runSequence(gulpFils.concat('MockData'), cb);
    }else{
        plugins.runSequence(gulpFils, cb);

    }
});
// MockData
gulp.task('MockData', function (){
    var baseUrl = 'mockJs';
    var appendData='';
    var mockJsFile = './js/main/MockData.js';
    var files;
    fs.writeFileSync(mockJsFile,'define( [ \'../plugins/mock-min\'], function (Mock) {\n' +
        'var errorData = {"success": false,"data": null,"failCode": 404,"params": null,"message": "没有找到此文件"};\n','utf8'); //同步写入
    if (fs.existsSync(baseUrl)) { //获取目录下的文件
        files = fs.readdirSync(baseUrl);
        for(var i = 0,fileLen = files.length;i < fileLen; i++){
            var _thisFile = files[i];
            var objName = _thisFile.replace('.js','');
            var requireFile = "./"+baseUrl+"/"+objName; //'./mockJs/interface'
            var _thisObj = require(requireFile);
            for(var item in _thisObj){
                var _thisTemplate = _thisObj[item];
                if(typeof _thisObj[item] === "object"){
                    _thisTemplate = JSON.stringify(_thisTemplate);
                }
                appendData = 'Mock.mock("/'+objName+'/'+item+'",'+_thisTemplate+');\n';
                fs.appendFileSync(mockJsFile,appendData,'utf8');  //将文件写入mockData
            }
        }
        var reg = /^\//;
        fs.appendFileSync(mockJsFile,'\n  $.ajaxPrefilter(function (options, originalOptions, jqXHR) { if((options.type).toUpperCase() == \'GET\'){options.cache = true;} (!('+reg+'.test(options.url))) && (options.url = "/" + options.url)});\n }); ' ,'utf8');

        console.log('copy Done');
        //createStreamFile();
    } else {
        console.log(baseUrl + "  Not Found!");
    }

});
//同步刷新
gulp.task("serve", ['build'], function () {

    var path = require('path');
    var url = require('url');
// var uuid = require('uuid');
    var Mock = require('mockjs');
    var proxyMiddleware = require('http-proxy-middleware');
    var qs = require('querystring');
    if(isMock){
        middleware=function (req, res, next) {
            var urlObj = url.parse(req.url),
                method = req.method,
                paramObj = urlObj.query,
                postQuery = '',
                mockUrl,
                newSearch = '';
                //console.log("urlObj***:",urlObj)
               // console.log(method)
            if ((urlObj.pathname.match(/\..+$/) && !(urlObj.pathname.match(/\.do/))) || urlObj.pathname.match(/\/$/)) {
                // console.log('urlObj:',urlObj)
                next();
                return;
            }

            if (req.method.toUpperCase() == 'POST') {
                var postData = "";
                /**
                 * 因为post方式的数据不太一样可能很庞大复杂，
                 * 所以要添加监听来获取传递的数据
                 * 也可写作 req.on("data",function(data){});
                 */
                req.addListener("data", function (data) {
                    postData += data;
                });
                /**
                 * 这个是如果数据读取完毕就会执行的监听方法
                 */
                req.addListener("end", function () {
                    // var query = qs.parse(postData);
                    // console.log('[post query]:',urlObj.pathname);
                    paramObj = postData;
                    postQuery = url.parse(req.url, true).query;
                    // console.log('[post paramObj]:',postQuery);
                });
            }else if (req.method.toUpperCase() == 'GET') {
                var query = url.parse(req.url, true).query;
                // console.log('[get query]:',query);
            }
            // console.log('[requist] ', method, urlObj.pathname, paramObj);
            var rts = /([?&])_=[^&]*/;
            if(rts.test( req.url)){
                delete paramObj._;
                if(JSON.stringify(paramObj) !== "{}"){
                    newSearch = '?';
                    newSearch += JSON.stringify(paramObj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
                }
            }

            var pathTree = urlObj.pathname.split('/');
            //console.log('[pathTree]',pathTree);
            var mockDataFile = path.join(__dirname + path.sep + 'mockJs', pathTree[1]) + ".js";
             //console.log('[mockDataFile]',mockDataFile);
            fs.access(mockDataFile, fs.F_OK, function (err) {
                var isImage = req.headers.accept.indexOf('image') != -1;
                // console.log('[err]',err);
                if (err) {
                    var c = {
                        "success": false,
                        "data": null,
                        "failCode": 404,
                        "params": null,
                        "message": "无响应数据",
                        "notFound": mockDataFile
                    };
                    //console.log('[response] ', c);
                    res.setHeader('Content-Type', (isImage ? 'image/*' : 'application/json'));
                    res.end(JSON.stringify(c));
                    next();
                    return;
                }

                try {
                    delete require.cache[require.resolve(mockDataFile)];
                    var data = require(mockDataFile) || {};
                    var curNode = pathTree[2];
                    if(!pathTree[2])curNode = pathTree[1];
                    var result,mockUrl = curNode+newSearch;
                    if(data[mockUrl] && typeof data[mockUrl] === "object"){
                        result = Mock.mock(data[mockUrl]);
                    }else if(data[mockUrl]){
                        var params={body: eval("("+paramObj+")")};
                        // var params={body: JSON.stringify(paramObj)};
                        result = Mock.mock(data[mockUrl](params));
                    }
                    isImage && (result = Mock.Random.image(data[pathTree[2]]));
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Content-Type', (isImage ? 'image/!*' : 'application/json'));
                    // res.setHeader('tokenId', uuid.v1());
                    var s = result || {
                            "success": false,
                            "data": null,
                            "failCode": 0,
                            "params": null,
                            "message": null
                        };
                    //console.log('[response] ', JSON.stringify(s));
                    res.end(JSON.stringify(s) || s);
                } catch (e) {
                    console.error(e);
                }
            });
            //next();
        }
    }else{
        // var host = 'http://192.168.1.107';
        var host = 'http://192.168.1.109:8080/box-web';
        // var host = 'https://www.pv.synpowertech.com/';
        // var host = 'https://www.dev.synpowertech.com/';
       //   var host = 'http://192.168.1.102';
       //   var host = 'http://192.168.1.112:8080/box-web';
        middleware = [
            proxyMiddleware(['/login/loginIn.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/getAddrLocation.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/getSysInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/queryUserRolSrc.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/loginOut.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/introduction.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/generationStatics.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/basicStatic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/getLogoAndName.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/districtManage.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/dynamicStatics.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/distribution.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/plantInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/getPlantCount.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/business.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/contribution.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/getAllPlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/screen/plantDistribution.do'], {target: host, changeOrigin: true}),
            // proxyMiddleware(['/login/dataTable.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/plantDist.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/curveSearch.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/curveSearchDate.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/basicInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/plantOpen.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getTotalInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getTodayInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPlantIncome.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPlantPower.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/singleBasicInfo'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/genPPR'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getCurrentIncomeOfPlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/plantOpen'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/fuzzySearchPlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/singelDevices.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/deviceDetail.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/deviceStatus.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPowerCurrentOfDevice.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/updateValueOfGuid.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getProSearchDate.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/plantStatusPower.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/singlePlantDistribution.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/singlePlantStatus.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/listBat.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getStoList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPvTopo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getOptStoList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getElectricityProfit.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getTotalPhotovoltaic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getTodayChargeEle.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPlantOpen.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getSingleElecPro.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getSinglePowerCurve.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getWeatherInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPowerCap.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getCollectorList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getCenInverterList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getConfBoxList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getBMSList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPCSList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getEnviroDetectorList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getInverterList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getMeterList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getBoxChangeList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getSingleOptProfit.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getSingleEneProfit.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getBatCap.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getCNTopo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getGCTopo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/alarm/alarmList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/alarm/alarmLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/alarm/alarmAttention.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/alarm/getConfirmAlarm.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/alarm/getAlarmData.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/savePersonalSet.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/getHistoryLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/getAreaDistribution.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/getDeviceForPlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/getYXGuidForInventers.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/fuzzySearchPlantByAreaId.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/getHistoryTime.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportTable.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/fuzzySearchPlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportExport.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportsLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportsTable.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/reviewData.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/electricReportTable.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/electricReportLine.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/runReportLineMultiTypes.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/report/saveUserSet.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/updatePlantUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/updatePlantInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/deletePlantUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getSubsetOrg.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/insertPlantInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/listPlantInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getPlantInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getPlantTreeByOrg.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getPlantTreeByArea.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/insertPlantUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/uploadPlantPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/deletePlantPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getAllPlantType.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getPlantWeather.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getUserType.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/insertPlantOwner.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getCnPlantPrice.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/getPlantPriceDetail.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/getUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateUserPwd.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateDirectPwd.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/getUserNotMyself.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/getUnique.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/listUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/getRoleByOrgId.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/getRoleAll.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/udpateUserById.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/insertNewUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateUserValid.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateDirectPwd.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/uploadUserIcon.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/updateUserIcon.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/user/selectUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/getOrgTree.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/getOrgInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/addOrgInfoByUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/updateOrgInfoByUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/deleteOrgInfoByUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/org/getOrgCode.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/role/getAllRights.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/role/saveRoleAndRights.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/role/updateRoleValid.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/role/updateRightsByRid.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getSystemContent.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateLoginPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateLoginLogo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateSystemInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getSystemInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateScreenLogo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateSystemBasic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updateSystemLogo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getSystemBasic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getAutomaticCalculation.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getPropagandaPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getPropagandaPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/updatePropagandaPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/plantAscription.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/plantInfo/insertPlantAscription.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateStatus.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateEquipmentBasic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateSubBasic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/listEquipmentSub.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateSubStatus.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/listCamera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateCameraStatus.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateCambasic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/listEquipmentInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateEquipmentPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateSubPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/updateCameraPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/readInterverExcel.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/readSubExcel.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/readCameraExcel.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/insertInterver.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/insertSub.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/equipment/insertCamera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getCollectors.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/addCollector.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getAllCollNames.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getInverterList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getCameraList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/delCamera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/updateCamera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/updatePointTable.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/plantIdofOrg4Camera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getCaModelList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getYXList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getYKList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getYCList.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getModuleInfoforChoice.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getInverterModelforChoice.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/updateCollector.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/addCamera.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getDeviceChoiceTree.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getDevicesUnderColl.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/updateCollAndSubDev.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getModuleInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/updateInEtModue.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/deleteCollectors.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getLiveHLS.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/getVedioByTime.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/device/plantIdofOrg4Device.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/system/getPropagandaPhoto.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitor/getPlantName.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getElecKPI.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getUseElec.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getElecLoadKpi.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getElecUseKpi.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getElecQualityKPI.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/energyMonitor/getEnterpriseInfo.do'], {target: host, changeOrigin: true}),



            //小程序
            proxyMiddleware(['/login/getUserByTel.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/getValidCode.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/insertUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/singlePlant.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/getUserInfo.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/getAddrLocation.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/static.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/genCurve.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/powerCurve.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/monitorwx/dynamic.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/userwx/getInfoForLink.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/userwx/saveSharedLink.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/checkLinkCode.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/checkRegisterUser.do'], {target: host, changeOrigin: true}),
            proxyMiddleware(['/login/quicklyRegister.do'], {target: host, changeOrigin: true}),
        ];
    }
    plugins.browserSync({
        //files: '/build/**', //监听整个项目
        open: 'local', // 'external' 打开外部URL, 'local' 打开本地主机URL
//        https: true,
        port: 82,
        online: false,
        notify: false,
        logLevel: "info",
        logPrefix: "test",
        logConnections: true, //日志中记录连接
        logFileChanges: true, //日志信息有关更改的文件
        scrollProportionally: false, //视口同步到顶部位置
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        server: {
            baseDir: './dest',
            middleware: middleware
        }
    });

});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['serve']);