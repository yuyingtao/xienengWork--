/** 2018/3/14
* @author: kj
* @description:  储能topo
*/
define(function () {
    return spcnTopo;
});
var spcnTopo = {
    interval: '',
    domId: 'cnCanvas',
    canvasReq : '',
    repeat: true,
    plantIs: '',
    Render: function (opts) {
        var _this = this;
        _this.plantIs = opts.plantId || ''

        $('#cnCanvas').hide()
        if (_this.interval) clearTimeout(_this.interval);
        !!_this.canvasReq && window.cancelAnimationFrame(_this.canvasReq);

        //组态信息
        _this.getConfMsg();

    },
    getAjax:function () {
        var _this = this;
        return new Promise(function(resolve,reject){
            $.http.POST('/monitor/getCNTopo.do', {
                tokenId: Cookies.getCook('tokenId'),
                plantId: _this.plantId
            }, function (result) {
                if(+result.code != 100){
                    reject(result);
                }else {
                    resolve(result);
                }

            },true)
        });
    },
    getConfMsg: function () {
        var _this = this;
        var data = {};
        require(['plugins/jtopo-0.4.8-min'], function () {

            CanvasRenderingContext2D.prototype.JtopoDrawPointPath = function (a, b, c, d, e, f, g) {
                var animespeed = (new Date()) / 30;
                var xs = c - a,
                    xy = d - b,
                    l = Math.floor(Math.sqrt(xs * xs + xy * xy)),
                    // l = Math.floor(xs + xy),
                    colorlength = 2,
                    j = l;
                xl = xs / l,
                    yl = xy / l;
                var colorpoint = animespeed % (l + colorlength) - colorlength;

                for (var i = 0; i < j; i++) {
                    if (((i) > colorpoint) && ((i) < (colorpoint + colorlength))) {

                        this.translate(a + i * xl, b + i * yl);
                        this.rotate((Math.atan(xy / xs)));
                        this.drawImage(g, -5, -5, 10, 10);
                        this.rotate(-(Math.atan(xy / xs)));
                        this.translate(-a - i * xl, -b - i * yl);
                    } else {

                        this.beginPath();
                        this.strokeStyle = 'rgb(12,54,73)';
                        this.lineWidth = 2;
                        this.moveTo(a + (i - 1) * xl, b + (i - 1) * yl);
                        i % 3 ? this.lineTo(a + i * xl, b + i * yl) : this.moveTo(a + i * xl, b + i * yl);
                        this.stroke();
                    }
                }
            };
            CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function (a, b, c, d, e, f, g) {
                "undefined" == typeof e && (e = 5);
                var f = c - a, g = d - b, h = Math.floor(Math.sqrt(f * f + g * g)), i = 0 >= e ? h : h / e,
                    j = g / h * e, k = f / h * e;
                this.beginPath();
                for (var l = 0; i > l; l++) l % 2 ? this.lineTo(a + l * k, b + l * j) : this.moveTo(a + l * k, b + l * j);
                this.stroke()
            };

                var canvas = document.getElementById('cnCanvas');
                if (!canvas) {
                    console.log('no canvas');
                    clearTimeout(_this.interval);
                    return;
                }
                var stage = new JTopo.Stage(canvas);
                var scene = new JTopo.Scene(stage);

                scene.mode = "drag";


                // var falgOne = true;
                getDatd(1);
                // requestAnimationFrame(drawCofMsg);
                /* _this.interval = setInterval(function () {
                     scene.clear();
                     getDatd();
                 }, 5000);*/
                function getDatd(falgOne) {
                    if(!$('#cnCanvas').length){
                        clearTimeout(_this.interval);
                        return
                    }
                    _this.getAjax().then(function (result) {
                        if(!$('#cnCanvas').length){
                            $('#noData').remove() && $('#confMsg').append('<span id="tipContent" class="loadding">加载中...</span>\n' +
                                '    <canvas class="confmsgCanvas" width="550" height="235" id="cnCanvas"></canvas>')
                            canvas = document.getElementById('cnCanvas');
                            if (!canvas) {
                                console.log('no canvas');
                                clearTimeout(_this.interval);
                                return;
                            }
                            stage = new JTopo.Stage(canvas);
                            scene = new JTopo.Scene(stage);
                            scene.mode = "select";
                        }
                        stage.paint();
                        _this.interval = setTimeout(getDatd,5000);
                        /*requestAnimationFrame(function(){
                            drawCofMsg(result.data)
                        })*/
                        if (falgOne) {
                            requestAnimationFrame(function(){
                                drawCofMsg(result.body)
                            })
                        }else {
                            scene.clear();
                            drawCofMsg(result.body)
                        }
                    }).catch(function (err) {

                        !$('#noData').length && $('#cnCanvas').remove() && $('#confMsg').append('<div id="noData" style="margin-top: 50px;text-align:center">暂无数据</div>')
                        var isDialog = _this.repeat;
                        _this.repeat = false;
                        isDialog && err.msg && App.alert(err.msg, function (e) {
                            _this.repeat = true;
                        });
                    })
                    /*$.http.POST('/monitor/getCNTopo.do', {
                        tokenId: Cookies.getCook('tokenId'),
                        plantId: _this.plantIs
                    }, function (result) {
                        if (!_this.repeat) return;
                        stage.paint();
                        // drawCofMsg(result.data);
                        data = result.body;

                        if (falgOne) {
                            _this.canvasReq = requestAnimationFrame(drawCofMsg);
                        }
                    })*/
                }

                function drawCofMsg(data) {
                    if (!canvas.getContext) {
                        window.G_vmlCanvasManager.initElement(canvas);
                    }
                    //背景颜色设置
                    // scene.background = '#CDC5BF';
                    // scene.alpha = 0;

                    var nodeFlag = 5;
                    var beginDrawLink = false;

                    function addNode(text, icon, x, y, wid, hei, textPosition) {
                        var node = new JTopo.Node(text);
                        node.setImage('./images/pmImages/' + icon + '.png', true);
                        node.fontColor = '12,54,73';
                        node.textPosition = textPosition || 'Bottom_Center';
                        node.font = "bold 12px MicrosoftYaHei";
                        node.fillColor = '6,21,42';
                        node.setLocation(x + (84 - wid) / 2, y + (84 - hei) / 2);
                        node.dragable = false;
                        node.showSelected = false; // 不显示选中矩形
                        scene.add(node);

                        --nodeFlag;
                        if (!nodeFlag) {
                            beginDrawLink = !beginDrawLink;
                        }
                        return node;
                    }

                    function addLink(opts) {
                        var link;
                        var nodeA = opts.nodeA || '',
                            nodeZ = opts.nodeZ || '',
                            txt = opts.txt || '',
                            type = opts.type || '',
                            direction = opts.direction || '',
                            addy = opts.addy || 0,
                            addStarty = opts.addStarty || 0,
                            noFlowed = opts.noFlowed || false;
                        if (type === 'foldLine') {
                            link = new JTopo.FoldLink(nodeA, nodeZ);
                            link.strokeColor = '12,54,73';
                            link.direction = direction || 'vertical';

                            //路径
                            /*link.getPath = function (a) {
                                debugger
                                var b = [], c = this.getStartPosition(), d = this.getEndPosition();
                                if (this.nodeA === this.nodeZ) return [c, d];
                                var f, g, h = 1, i = (h - 1) * this.bundleGap,
                                    j = this.bundleGap * a - i / 2, l = -26.5;
                                return "horizontal" == this.direction ? (f = d.x + j, g = c.y - j, b.push({
                                    x: c.x,
                                    y: g + l
                                }), b.push({x: f - 2, y: g + l}), b.push({
                                    x: f - 2,
                                    y: d.y + 2
                                })) : (f = c.x + j, g = d.y - j, b.push({
                                    x: f - 2,
                                    y: c.y
                                }), b.push({x: f - 2, y: g - l}), b.push({x: d.x+2, y: g - l})), b
                            }*/

                        } else {
                            link = new JTopo.Link(nodeA, nodeZ);

                            if (addStarty) {
                                link.getStartPosition = function () {
                                    var a = {x: this.nodeA.cx, y: this.nodeA.cy};
                                    return "horizontal" == this.direction ? a.x = this.nodeZ.cx < a.x ? this.nodeA.x : this.nodeA.x + this.nodeA.width : a.y = this.nodeZ.cy < a.y ? this.nodeA.y : this.nodeA.y + this.nodeA.height / 2 + 10, a
                                }
                            }
                        }
                        link.lineWidth = 2;
                        link.texts = txt && txt.texts;
                        link.textsAlign = txt && txt.align;
                        link.font = "12px Consolas";
                        link.fontNameColor = "12,54,73";
                        link.fontValueColor = "12,54,73";
                        link.strokeColor = 'rgb(195,46,63)';
                        link.PointPathColor = "rgb(12,54,73)";
                        link.textAlign = 'bottom';
                        // link.showSelected = !0; // 不显示选中矩形

                        var linkpointimage = new Image();//设置图片
                        linkpointimage.src = "images/pmImages/lineIcon.png";
                        link.PointAnimeImg = linkpointimage;

                        //重写文字样式
                        link.paintText = function (a, b) {
                            var c = b[0], d = b[b.length - 1];
                            if (4 == b.length && (c = b[1], d = b[2]), this.texts && this.texts.length > 0) {
                                var hei = 0;
                                for (var i = 0, len = this.texts.length; i < len; i++) {
                                    hei += i * 15; //文字垂直间隔
                                    var j = this.bundleGap * (this.nodeIndex + 1) / 2,
                                        e = this.nodeA.x + j * Math.cos(i),
                                        f = this.nodeA.y + j * Math.sin(i);

                                    var e = (d.x + c.x) / 2 + this.textOffsetX, f = (d.y + c.y) / 2 + this.textOffsetY;
                                    a.save(), a.beginPath(), a.font = this.font;
                                    var g = a.measureText(this.text).width, h = a.measureText("ç”°").width;

                                    var txtAlign = 0;

                                    if (type === 'foldLine') {

                                        if (this.textsAlign === 'top') { //行数大于3就自动放线条下面去
                                            // txtAlign = f - h / 2 + (i - 1)*20
                                            txtAlign = 30 + ( 1 - i ) * 20
                                        } else {
                                            txtAlign = 150 + (0 - i) * 20
                                        }

                                        a.fillStyle = "rgba(" + this.fontNameColor + ", " + this.alpha + ")";
                                        a.fillText(this.texts[i].name, e - g / 2 - 10, txtAlign);

                                        a.fillStyle = "rgba(" + this.fontValueColor + ", " + this.alpha + ")";
                                        a.fillText(this.texts[i].value, e - g / 2, txtAlign);
                                    } else {

                                        if (i > 1) { //行数大于2就自动放线条下面去
                                            txtAlign = f + 10 - h / 2 + (i - 1) * 20
                                        } else {
                                            txtAlign = f + 10 + (-1 - i) * 20
                                        }

                                        a.fillStyle = "rgba(" + this.fontNameColor + ", " + this.alpha + ")";
                                        a.fillText(this.texts[i].name, e - g / 2 - 10, txtAlign);

                                        a.fillStyle = "rgba(" + this.fontValueColor + ", " + this.alpha + ")";
                                        a.fillText(this.texts[i].value, e - g / 2 , txtAlign);
                                    }
                                }

                            }
                        };
                        // if (!noFlowed) {

                        link.dashedPattern = 1.5; // 虚线
                            link.paintPath = function (a, b) {
                                if (this.nodeA === this.nodeZ) return void this.paintLoop(a);
                                a.beginPath(),
                                    a.moveTo(b[0].x, b[0].y);
                                for (var c = 1; c < b.length; c++) {
                                    !noFlowed ? (
                                        (null == this.PointPathColor ? a.lineTo(b[c].x, b[c].y) : a.JtopoDrawPointPath(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, a.strokeStyle, this.PointPathColor, this.PointAnimeImg))
                                    ) : a.JTopoDashedLineTo(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, this.dashedPattern, this.PointPathColor, this.PointAnimeImg)
                                }
                                if (a.stroke(), a.closePath(), null != this.arrowsRadius) {
                                    var d = b[b.length - 2],
                                        e = b[b.length - 1];
                                    this.paintArrow(a, d, e)
                                }
                            };
                        // }


                        /*link.getEndPosition = function() {
                            var a;
                            return (a = (function(thisl){
                                var b=thisl.nodeZ,c=thisl.nodeA;
                                var d = JTopo.util.lineF(b.cx, b.cy, c.cx, c.cy),
                                    e = b.getBound(),
                                    f = JTopo.util.intersectionLineBound(d, e);
                                return f
                            })(this)),
                            null == a && (a = {
                                x: this.nodeZ.cx,
                                y: this.nodeZ.cy
                            }),a
                        }*/
                        link.getEndPosition = function () {
                            var a;
                            return null != this.arrowsRadius && (a = h(this.nodeZ, this.nodeA)), null == a && (a = {
                                x: this.nodeZ.cx,
                                y: this.nodeZ.cy
                            }), a
                        };

                        var addY = addy || 0;
                        if (addY) {
                            link.getEndPosition = function () {
                                var a;
                                return null != this.arrowsRadius && (a = h(this.nodeZ, this.nodeA)), null == a && (a = {
                                    x: this.nodeZ.cx - 2,
                                    y: this.nodeZ.cy + addY
                                }), a
                            }

                        }
                        scene.add(link);
                        return link;
                    }


                    // data.bus_activepower.substring(0,1) === '-' ? bpArrow = 'arrow-l' : bpArrow = 'arrow-r';
                    var bpLineF = '';
                    var bpLineE = '';
                    var pdLineF = '';
                    var pdLineE = '';

                    var arr = data.bat_power && data.bat_power.substring(0, 1);
                    var arr1 = data.gridPower && data.gridPower.substring(0, 1);
                    var addx = 0;
                    var addStarty = false;

                    $(window).resize(function(){
                        $('#cnCanvas').css('visibility','hidden')
                        clearTimeout(_this.interval)

                        var cnCanvas = document.getElementById('cnCanvas');
                        cnCanvas.width = $('.spcnTopo').width();
                        // cnCanvas.width = $('.spcnTopo').width()?$('.spcnTopo').width():500;
                        cnCanvas.height = 230;
                        drawFlow()
                        $('#cnCanvas').css('visibility','visible')
                    });

                    drawFlow()
                    /*_this.interval = setInterval(function () {
                        if(main.clearInterCharge(_this.interval,_this.domId))return;
                        _this.repeat && getFlowData()
                    }, 5000);*/

                    // dataInter = setInterval(getFlowData, 5000);

                    function getFlowData() {
                        getDatd(0);
                        scene.clear();
                        arr = data.batPower && data.batPower.substring(0, 1);
                        arr1 = data.gridPower && data.gridPower.substring(0, 1);
                        drawFlow();
                    }


                    function drawFlow() {
                        var $wid = $('.spcnTopo').width()
                        // var soNode = addNode('光伏(发电)', 'photovoltaicIcon', 10, 10, 60, 38);
                        var zcNode = addNode($.getI18n('plantMonitor.battery'), 'storageBoxIcon', 15*$wid/550, 68, 60, 60);
                        var nbqNode = addNode($.getI18n('plantMonitor.inverter'), 'inverterIcon', 190*$wid/550, 71, 64, 60);
                        // var dbNode = addNode('Transformer', 'transformer', 650, 55, 75, 60);
                        var dwNode = addNode($.getI18n('plantMonitor.genGrid'), 'powegridIcon', 450*$wid/550, 20, 75, 80);
                        var ydfhNode = addNode($.getI18n('plantMonitor.load'), 'safeAnimateIcon', 450*$wid/550, 120, 100, 64);
                        var mccNode = addNode(' ', 'dot11', 300*$wid/550, 70, 3, 3, 'Middle_Right');
                        // var dotNode = addNode('', 'dot11', 120, 60, 3, 3);
                        // var dotNode1 = addNode('', 'dot11', 120, 80, 3, 3);
                        var bdV, dsV;

                        // bpLineF = dotNode; //pcs-dot
                        // bpLineE = nbqNode;
                        // arr = '-'
                        if (arr === '-') {
                            // bpLineF1 = nbqNode; //pcs-dot
                            // bpLineE1 = dotNode1;
                            bdLineE = nbqNode;
                            dbLineE = zcNode;
                            // bdV = 'vertical';
                            addx = 0;

                            addStarty = true;
                        } else {
                            // bpLineF1 = dotNode1; //pcs-dot
                            // bpLineE1 = nbqNode;
                            bdLineE = zcNode;
                            dbLineE = nbqNode;
                            bdV = 'horizontal';

                            addx = 10;

                            addStarty = false;
                        }

                        //pcs流向
                        if (arr1 === '-') {
                            pdLineF = mccNode; //pcs-mcc
                            pdLineE = nbqNode;
                            dsLineE = mccNode;
                            sdLineE = dwNode;
                            dsV = 'horizontal';
                        } else {
                            pdLineF = nbqNode;
                            pdLineE = mccNode;
                            sdLineE = mccNode; //mcc-grid
                            dsLineE = dwNode;
                            dsV = 'vertical';
                        }
                        if (beginDrawLink) {
                            /*addLink({
                                nodeA: bpLineF,
                                nodeZ: bpLineE,
                                addy: -10,
                                noFlowed: data.pvPower === '0kW' ? true : false,
                            });*/
                            /*addLink({
                                nodeA: bpLineF1,
                                nodeZ: bpLineE1,
                                addy: addx,
                                addStarty: addStarty
                            });*/
                            // 光伏
                            /*addLink({
                                nodeA: soNode,
                                nodeZ: dotNode,
                                txt: {
                                    texts: [{
                                        name: ' ',
                                        value: data.pvPower
                                    }], align: 'top'
                                },
                                type: 'foldLine',
                                direction: 'horizontal',
                                noFlowed: data.pvPower === '0kW' ? true : false,
                            });*/
                            var gridVal = App.ConvertUnit({ unit:'watt',num:data.gridPower,len:6,split:3});
                            //逆变器
                            addLink({
                                nodeA: pdLineF,
                                nodeZ: pdLineE,
                                direction: 'horizontal',
                                noFlowed: gridVal.num === "0.00" ? true : false
                            });
                            //负载
                            addLink({
                                nodeA: mccNode,
                                nodeZ: ydfhNode,
                                type: 'foldLine',
                                direction: 'vertical',
                                noFlowed: true
                            });
                            //电网
                            addLink({
                                nodeA: sdLineE,
                                nodeZ: dsLineE,
                                txt: {
                                    texts: [{name: ' ', value: gridVal.num+ gridVal.unit}], align: 'top'
                                },
                                type: 'foldLine',
                                direction: dsV,
                                noFlowed: gridVal.num === "0.00" ? true : false
                            });
                            //电池
                            var batVal = App.ConvertUnit({ unit:'watt',num:data.batPower,len:6,split:3});
                            addLink({
                                nodeA: bdLineE,
                                nodeZ: dbLineE,
                                txt: {
                                    texts: [{
                                        name: ' ',
                                        value: batVal.num+ batVal.unit
                                    }], align: 'bottom'
                                },
                                // type: 'foldLine',
                                direction: bdV,
                                noFlowed: batVal.num === "0.00" ? true : false
                            })

                        }
                    }

                    $('#tipContent').hide()
                    $('#cnCanvas').show()

                }
            }
        )
    },
};