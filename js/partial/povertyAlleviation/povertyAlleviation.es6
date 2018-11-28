define(function(){
    return povertyAlleviationRender;
});
var povertyAlleviationRender = {
    activeIndex:0,
    newsDetail:'',
    nameList:[],
    Render: function () {
        var that = this
        // var Mock = require(["/js/plugins/mock-min.js"],function (mock) {
        //    var Random = mock.Random
        //     for(let i =0;i<650;i++){
        //        that.nameList.push(Random.cname())
        //     }
        //     //获取当前用户所有电站并渲染table
        //     that.getPlant(that.nameList)
        // })
        this.poorNumBar()
        that.generation()
        //获取电站规模
        that.getPlantCount()
        //获取发电量
        that.getElectricityProfit()
        //扶贫表格
        var povertyList = [
            {
                name:"张振华",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴琼",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"张进喜",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"杨正文",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈绪金",
                num:2,
                plantName:"山阳杨地镇"
            },
            {
                name:"翁菊花",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴盛军",
                num:6,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴谊",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴勇",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"刘文举",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"张本杰",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈迪根",
                num:6,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴丰银",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴胜美",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈敬礼",
                num:6,
                plantName:"山阳杨地镇"
            },
            {
                name:"程金旺",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"程运风",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈敬典",
                num:2,
                plantName:"山阳杨地镇"
            },
            {
                name:"程金水",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈迪金",
                num:6,
                plantName:"山阳杨地镇"
            },
            {
                name:"毛浓勤",
                num:2,
                plantName:"山阳杨地镇"
            },
            {
                name:"冯真",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"冯仕记",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"冯仕胜",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈敬田",
                num:7,
                plantName:"山阳杨地镇"
            },
            {
                name:"陈绪稳",
                num:2,
                plantName:"山阳杨地镇"
            },
            {
                name:"冯仕艮",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"毛加朋",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮加治",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"袁三原",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮加有",
                num:6,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮加富",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮国超",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"任立哲",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮加成",
                num:5,
                plantName:"山阳杨地镇"
            },
            {
                name:"袁达清",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"王加海",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"阮开云",
                num:1,
                plantName:"山阳杨地镇"
            },
            {
                name:"吴丰山",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"张才富",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"毛浓照",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"陈敬国",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"刘明社",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"毛加兴",
                num:6,
                plantName:"山阳杨地镇"
            },{
                name:"陈敬勤",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"张青叶",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"毛加文",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"张才喜",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"阮英知",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"刘文瑛",
                num:3,
                plantName:"山阳杨地镇"
            },
            {
                name:"张才忠",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"张涛",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"毛加胜",
                num:7,
                plantName:"山阳杨地镇"
            },{
                name:"毛加旺",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"毛加海",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"毛浓江",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"张运成",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"陈延",
                num:6,
                plantName:"山阳杨地镇"
            },{
                name:"毛浓春",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"王家升",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"冯仕宝",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"朱从荣",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"毛浓茂",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"冯道德",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"陈晓臣",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"陈敬芳",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"陈敬义",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"陈守立",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"陈少礼",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"陈新锋",
                num:4,
                plantName:"山阳杨地镇"
            },
            {
                name:"刘明海",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"茅德烈",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"毛义步",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"茅积文",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"毛仪秋",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"陈绪杰",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"陈洪均",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"陈红有",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"张才民",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"张才铃",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"茅德前",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"郑传东",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"黄大有",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"方华勤",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"张才儒",
                num:5,
                plantName:"山阳杨地镇"
            },{
                name:"茅德有",
                num:7,
                plantName:"山阳杨地镇"
            },{
                name:"张才云",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"张财文",
                num:6,
                plantName:"山阳杨地镇"
            },{
                name:"茅德华",
                num:6,
                plantName:"山阳杨地镇"
            },{
                name:"茅万利",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"茅德喜",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"韦芳",
                num:4,
                plantName:"山阳杨地镇"
            },{
                name:"方国芹",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"刘文斌",
                num:3,
                plantName:"山阳杨地镇"
            },{
                name:"郝加荣",
                num:2,
                plantName:"山阳杨地镇"
            },{
                name:"陈敬丰",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"喻策富",
                num:1,
                plantName:"山阳杨地镇"
            },{
                name:"陈小柱",
                num:6,
                plantName:"山阳杨地镇"
            },{
                name:"陈洪超",
                num:1,
                plantName:"山阳杨地镇"
            },
        ]
        that.renderPoverty(povertyList)
        var news = [
            {
                id: '1',
                img: "images/povertyAlleviation/photo.png",
                title: "国家能源局 国务院扶贫办下达第一批光伏扶贫项目",
                abstract: "10月17日，国家能源局会同国务院扶贫办印发《下达第一批光伏扶贫项目的通知》（以下简称《通知》），下达第一批总规模516万千瓦光伏扶贫项目。",
                time: "2016-10-18",
                content: [
                    {
                        tag:"<p>10月17日，国家能源局会同国务院扶贫办印发《下达第一批光伏扶贫项目的通知》（以下简称《通知》），下达第一批总规模516万千瓦光伏扶贫项目。其中，村级光伏电站（含户用）共计218万千瓦，集中式地面电站共计298万千瓦，共涉及河北、山西、辽宁、吉林、江苏、安徽、江西、山东、河南、湖北、湖南、云南、陕西和甘肃14个省约2万个贫困村，可为约55万个建档立卡贫困户每年每户增收不低于3000元。</p>"
                    },
                    {
                        tag:"<p>光伏扶贫是落实国家精准扶贫、精准脱贫战略的重要举措，有利于促进贫困人口稳收增收，有利于扩大光伏发电市场。2015年底，《中共中央国务院关于打赢脱贫攻坚战的决定》中明确提出“加快推进光伏扶贫工程，支持光伏发电设施接入电网运行，发展光伏农业”。为贯彻落实文件精神，加快推进光伏扶贫工程，2016年3月，国家发展改革委、国务院扶贫办、国家能源局、国家开发银行和农业发展银行联合印发《关于实施光伏发电扶贫工作的意见》，明确了相关政策措施：一是国家在光伏年度建设规模管理中，专门安排光伏扶贫的光伏电站建设规模；二是国家开发银行、中国农业发展银行为光伏扶贫项目提供优惠贷款，根据资金来源成本情况在央行同期贷款基准利率基础上适度下浮；三是电网企业负责投资建设光伏扶贫电站项目的电力送出工程并确保项目按月足额结算电费和领取国家补贴资金。</p>"
                    },
                    {
                        tag:"<p>为确保第一批光伏扶贫项目顺利建设和运营管理，早日发挥扶贫效益，《通知》要求各有关方面做好工作衔接，一是各省能源主管部门要会同扶贫部门督促地方政府和投资主体尽快落实建设条件，及时办理项目备案等手续。各有关市县级政府按申报实施方案落实建设资金，协调国土、林业、环保等有关部门配合项目落实有关建设条件。二是各贫困县所在地市（县）政府应建立光伏扶贫收入分配管理办法，并按照办法进行收入分配管理。三是相关银行等金融机构要尽快与项目对接，进行项目贷款条件审核。电网公司尽快落实村级（含户用）扶贫电站接网方案，尽快制定集中式光伏扶贫电站接入系统设计，落实有关工程建设投资。</p>"
                    }
                ]
            },
            {
                id:"2",
                img:"images/povertyAlleviation/timg.jpg",
                title:"【正式文件】国家能源局、扶贫办印发“十三五”第一批光伏扶贫项目计划",
                abstract:"近日，国家能源局、国务院扶贫办联合发布《关于下达“十三五”第一批光伏扶贫项目计划的通知》，正式下发“十三五”第一批光伏扶贫项目",
                time:"2018-01-06",
                content:[
                    {
                        tag:"<p>近日，国家能源局、国务院扶贫办联合发布《关于下达“十三五”第一批光伏扶贫项目计划的通知》，正式下发“十三五”第一批光伏扶贫项目。</p>"
                    },
                    {
                        tag:"<p>在地方组织编制“十三五”光伏扶贫实施方案的基础上，经国家能源局会同国务院扶贫办联合审核，471个光伏扶贫重点县中的236个县具备条件。</p>"
                    },
                    {
                        tag:"<p>本批下达14个省(自治区)、236个光伏扶贫重点县的光伏扶贫项目，共8689个村级电站，总装机规模4186237.852千瓦，扶持对象为14556个建档立卡贫困村的710751户建档立卡贫困户。</p>"
                    },
                    {
                        tag:"<p>其中山西省建设规模最大，为1029461.04千瓦;其次是河北省，建设规模615506.132千瓦;其次是青海(471600千瓦)、甘肃(428462千瓦)和内蒙古(367633千瓦)。</p>"
                    },
                    {
                        tag:"<img src='images/povertyAlleviation/zheshi1.jpg'>"
                    },
                    {
                        tag:"<img src='images/povertyAlleviation/zheshi2.jpg'>"
                    },
                    {
                        tag:"<img src='images/povertyAlleviation/zheshi3.jpg'>"
                    },
                ]
            },
            {
                id:"3",
                img:"images/povertyAlleviation/photo2.jpg",
                title:"国家能源局关于光伏扶贫电站的官方解读",
                abstract:"3月26日，我局与国务院扶贫办联合印发了《光伏扶贫电站管理办法》(以下简称《办法》)。",
                time:"2018-04-27",
                content:[
                    {
                        tag:"<p>3月26日，我局与国务院扶贫办联合印发了《光伏扶贫电站管理办法》(以下简称《办法》)。下面我就《办法》相关情况向大家做一下介绍。</p>"
                    },
                    {
                        tag:"<h4>一、背景情况</h4>"
                    },
                    {
                        tag:"<p>十八大以来，国家能源局坚决贯彻党中央决策部署，在国务院扶贫办的指导下，结合能源产业特点，积极探索发展光伏扶贫模式。2014年，启动了光伏扶贫试点工作，2015年初下达了安徽、河北、山西、宁夏、甘肃、青海等6省(区)光伏扶贫试点专项建设规模150万千瓦。2016年3月，会同国家发展改革委、国务院扶贫办等联合印发了《关于实施光伏发电扶贫工作的意见》(发改能源〔2016〕621号)，光伏扶贫在全国全面展开。2016年10月、2017年12月分两次各下达光伏扶贫专项规模516万千瓦和418万千瓦，2017年在年度规模中明确8个省共450万千瓦普通电站规模也全部用于光伏扶贫。据国务院扶贫办统计，截至2017年底，全国共有25个省(区、市)、940个县开展了光伏扶贫项目建设，累计建成规模1011万千瓦、直接惠及约3万个贫困村的164.6万户贫困户。光伏扶贫在带动群众脱贫致富、增强村集体经济实力和保障农村能源供应方面取得良好成效，为世界减贫事业贡献了中国智慧、中国方案。</p>"
                    },
                    {
                        tag:"<p>光伏扶贫是个新事物，实施过程中也出现了一些问题。个别地方盲目扩大光伏电站扶贫对象、一些地方打着扶贫名义要规模上项目、个别地方存在“一光了之”、“一哄而上”现象等;一些地方政府出资不到位或以项目建设单位垫资方式违规出资，一些电站建设运维质量不高，这些问题如果不及时加以解决都会影响光伏扶贫的实施效果，必须制定相关制度规范电站管理，把好事办好。</p>"
                    },
                    {
                        tag:"<p>2017年下半年起，国家能源局会同国务院扶贫办，在深入调研、总结经验、分析问题、征求意见的基础上，研究起草了《办法》，并征求了国家发展改革委、财政部、各省发展改革委(能源局)、扶贫办及国家电网公司、南方电网公司等有关企业的意见。根据各方反馈意见，我们对《办法》进行修改完善。今年3月26日，我局会同国务院扶贫办正式印发了《光伏扶贫电站管理办法》。</p>"
                    },
                    {
                        tag:"<h4>二、《办法》主要内容</h4>"
                    },
                    {
                        tag:"<p>《办法》主要目的是规范光伏扶贫工作实施，明确光伏扶贫电站建设运行管理要求，保障光伏扶贫实施效果，共二十条，分别对光伏扶贫的定位、定义、适用范围、对象、方式、投资、标准、建设、配套服务、验收、运行消纳、价格、补贴、收益分配、目录管理、计划管理、各方责任、企业扶贫等方面都做出了明确规定。在此着重强调以下几点：</p>"
                    },
                    {
                        tag:"<p>一是关于光伏扶贫定位。《办法》明确光伏扶贫是资产收益扶贫的有效方式，是产业扶贫的有效途径。也就是说光伏扶贫只是产业扶贫的众多方式之一，不是唯一方式，不能“一光了之”。</p>"
                    },
                    {
                        tag:"<p>二是关于扶贫对象。《办法》明确光伏扶贫对象为列入国家光伏扶贫实施范围的建档立卡贫困村的建档立卡贫困户，优先扶持深度贫困地区和弱劳动能力贫困人口，不能把扶贫对象扩大化。</p>"
                    },
                    {
                        tag:"<p>二是关于扶贫对象。《办法》明确光伏扶贫对象为列入国家光伏扶贫实施范围的建档立卡贫困村的建档立卡贫困户，优先扶持深度贫困地区和弱劳动能力贫困人口，不能把扶贫对象扩大化。</p>"
                    },
                    {
                        tag:"<p>三是关于建设方式。《办法》明确光伏扶贫电站原则上应在建档立卡贫困村按照村级电站方式建设，根据当地实际情况，确有必要并经充分论证可以采取联建方式建设村级电站。今后光伏扶贫电站不再搞集中式电站，不能打着光伏扶贫名义要规模、建集中式电站。</p>"
                    },
                    {
                        tag:"<p>四是关于建设资金。《办法》明确光伏扶贫电站由各地根据财力可能筹措资金建设，不得负债建设，企业不得投资入股。保证扶贫电站公益性质，地方有钱就干，有多少钱干多少事。</p>"
                    },
                    {
                        tag:"<p>五是关于电价政策。为支持光伏扶贫，《办法》明确光伏扶贫电站不参与竞价，执行国家制定的光伏扶贫价格政策。</p>"
                    },
                    {
                        tag:"<p>六是关于补贴发放。《办法》明确光伏扶贫电站优先纳入可再生能源补助目录，补助资金优先安排，原则上年度补助资金于次年1季度前发放到位。这是国家支持扶贫对光伏扶贫电站实行的优惠政策。</p>"
                    },
                    {
                        tag:"<p>七是目录管理。《办法》明确光伏扶贫电站实行目录管理，国家能源局会同国务院扶贫办按建档立卡贫困村代码，对光伏扶贫电站统一编码、建立目录，纳入目录的，享受光伏扶贫电站政策。今后只有纳入光伏扶贫电站目录的才能享受光伏扶贫优惠政策。</p>"
                    },
                    {
                        tag:"<p>八是关于建设和运行维护。《办法》明确光伏扶贫电站以县为单位，由县级政府按照“规划、设计、施工、验收、运维”五统一的原则实施，运用市场化方式委托专业机构负责光伏扶贫电站的建设、运行和维护，确保建设运行质量与运行安全，并鼓励采用达到“领跑者”技术指标的先进技术。这样规定有利于提高光伏扶贫电站建设运维的专业化程度，保证光伏扶贫电站建设运维质量。</p>"
                    },
                    {
                        tag:"<p>九是厘清职责。《办法》明确“中央统筹、省负总责、市县抓落实”的管理体制，省级政府扶贫、能源主管部门负责本省光伏扶贫工作的统筹协调和管理监督，要对项目的真实性、准确性负责。</p>"
                    },
                ]
            },
            {
                "id":"4",
                img: "images/povertyAlleviation/yangdizhen.jpg",
                title: "山阳杨地镇电站扶贫情况",
                abstract: "山阳杨地镇电站截止2017年12月底，扶贫100户，每户收入500元。",
                time: "2018-3-18",
                content:[
                    {
                        tag:"<img src='images/povertyAlleviation/yangdizhe1.jpg' style='display:inline-block;width: 80%;height: auto'> "
                    },
                    {
                        tag:"<p>山阳杨地镇电站位于杨地镇狮子村岭根组北山荒墟，容量为3MW，建立于2017年，属于当地的光伏发电扶项目，可年发电240万度，节约标煤960吨,减排二氧化碳2392.8吨、二氧化动72吨、烟尘652.8吨，对当地环境保护,减少大气污染,扶贫攻坚具有积极的促进作用经济效益和社会效益明显，同时可使840户贫困户达到脱贫目标。截止2017年12月底，扶贫100户，每户收入500元。</p>"
                    }
                ]
            }
        ]
        var width =  $(".mainBox").width()
        var eachMain = $(".eachMain")
        var eachMainEl = news.map(function (item) {
            return `<div class="eachMain" _id=${item.id}>
               <div class="img">
                  <img src="${item.img}" alt="" >
               </div>
               <div class="tex">
                  <p class="title">${item.title}</p>
                  <p class="news">
                     ${item.abstract}
                  </p>
               </div>
            </div>`
        }).join("")
        $(".mainBox").append(eachMainEl)
        var activeP = $(".activeP") //中间蓝色小圆点所在的p标签
        var preP = $(".activeP").prev("p")//第一个小圆点所在p标签
        var nextP = $(".activeP").next("p")//第三个小圆点所在p标签
        $(".mainBox").children(".eachMain").each(function (index,item) {
            if(news.length%2 ==0){//news数组的长度为2的倍数的时候显示第length除以2的那一条新闻
                that.activeIndex  = (news.length/2)
            }else {
                that.activeIndex  = ((news.length-1)/2)
            }
            if(index == that.activeIndex){
                $(item).css("left","0")
                preP.find("span").html(news[that.activeIndex-1].time)
                activeP.find("span").html(news[that.activeIndex].time)
                nextP.find("span").html(news[that.activeIndex+1].time)
            }else if(index > that.activeIndex){
                $(item).css("right",`-${(index-that.activeIndex)*width}px`)
            }else {
                $(item).css("left",`-${(that.activeIndex - index)*width}px`)
            }
        })
        $(".leftArrow").on("click",function(){
            that.runLeft(that,width,news)
        })
        $(".rightArrow").on("click",function () {
            that.runRight(that,width,news)
        })
        $(nextP).on("click",function () {
            that.runLeft(that,width,news)
        })
        $(preP).on("click",function () {
            that.runRight(that,width,news)
        })
        //点击展示新闻详情
        $(".mainBox ").on("click",".eachMain",function (e) {
            e.stopPropagation()
            var id = $(this).attr("_id")
            var title = "新闻详情"
                $.http.POST('/poverty/getNewsDetail.do',{
                    tokenId:Cookies.getCook('tokenId'),
                    id:id
                },function (res) {
                    that.newsDetail = App.dialog({
                        id: "newsDetail" ,
                        title:title,
                        width: 800,
                        height: 600,
                        maxWidth: document.documentElement.clientWidth - 40,
                        maxHeight: document.documentElement.clientHeight - 42,
                        appendTo: 'body',
                        backdrop: false,
                        modal: true,
                        keyboard: true,
                        content:that.newsDetailTem(),
                        openEvent: function () {
                            title = res.title
                            $(".modal-title").html(title)
                            $(".newsDetail").append(res.body)
                        },
                        closeEvent: null,
                        isdrag: true,
                        buttons: [{text:`关闭`,type:'imgNoBtn',clickToClose :true,id:'cancelOwner'}]
                    });
                })
        })
    },
    runLeft:function (that,width,news) {
        var activeP = $(".activeP") //中间蓝色小圆点所在的p标签
        var preP = $(".activeP").prev("p")//第一个小圆点所在p标签
        var nextP = $(".activeP").next("p")//第三个小圆点所在p标签
        if(!$(".mainBox").children(".eachMain").is(":animated")){
            if(!parseInt($(".mainBox .eachMain:last-child").css("left"))){
            }else {
                that.activeIndex++
                $(".mainBox").children(".eachMain").animate({left:`-=${width}px`},1000);
                preP.find("span").html(news[that.activeIndex-1].time)
                activeP.find("span").html(news[that.activeIndex].time)
                if(that.activeIndex+1==news.length){
                    nextP.find("span").html("已经到底了")
                }else {
                    nextP.find("span").html(news[that.activeIndex+1].time)
                }
            }
        }
    },
    runRight:function (that,width,news) {
        var activeP = $(".activeP") //中间蓝色小圆点所在的p标签
        var preP = $(".activeP").prev("p")//第一个小圆点所在p标签
        var nextP = $(".activeP").next("p")//第三个小圆点所在p标签
        if(!$(".mainBox").children(".eachMain").is(":animated")){
            if(!parseInt($(".mainBox .eachMain:first-child").css("left"))){
            }else {
                that.activeIndex--
                $(".mainBox").children(".eachMain").animate({left:`+=${width}px`},1000);
                nextP.find("span").html(news[that.activeIndex+1].time)
                activeP.find("span").html(news[that.activeIndex].time)
                if(!that.activeIndex){
                    preP.find("span").html("已经到头了")
                }else {
                    preP.find("span").html(news[that.activeIndex-1].time)
                }
            }
        }
    },
    //获取扶贫信息
    getPoorHouseholdsInfo:function () {
        var that = this
        $.http.POST('/poverty/getPoorHouseholdsInfo.do',{
                tokenId:Cookies.getCook('tokenId')
            },function (res) {
            $(".lengedNum").html(res.body.completeNum)
            $(".poorTotal").html(res.body.poorTotal)
            //渲染扶贫的饼图
            that.poorNumBar(res.body.completeNum,res.body.poorTotal)
            $(".tableContent").empty()//主要为了去掉页面上写死的“加载中…”几个字
            var divEl = res.body.detailInfo.map(function (item) {
                return `<div class="each">
                    <span>${item.name}</span>
                    <span>${item.number}</span>
                    <span>${item.plantName}</span>
                    <span>${item.income}</span>
                    </div>`
            }).join("")
            $(".tableContent").append(divEl)
            $(".tableContent").mCustomScrollbar({
                theme:"3d",
                axis:"xy" // vertical and horizontal scrollbar
            });
        })
    },
    //获取增收信息
    getIncreaseIncome:function () {
        var that = this
        $.http.POST('/poverty/IncreaseIncome.do',{
                tokenId:Cookies.getCook('tokenId')
            },function (res) {
            console.log(res)
            $(".InvestmentAmount").html(res.body.InvestmentAmount)
            $(".IncreaseIncomeUnit").html(res.body.IncreaseIncomeUnit)
            $(".incomeNum").html(res.body.IncreaseIncomeNum)
        })
    },
    //获取新闻列表
    getNewsList:function () {
        var that = this
        $.http.POST('/poverty/getNewsList.do',{
            tokenId:Cookies.getCook('tokenId')
        },function (res) {
            var width =  $(".mainBox").width()
            var eachMain = $(".eachMain")
            var eachMainEl = res.body.map(function (item) {
                return `<div class="eachMain" _id=${item.id}>
               <div class="img">
                  <img src="${item.img}" alt="" >
               </div>
               <div class="tex">
                  <p class="title">${item.title}</p>
                  <p class="news">
                     ${item.abstract}
                  </p>
               </div>
            </div>`
            }).join("")
            $(".mainBox").append(eachMainEl)
            var activeP = $(".activeP") //中间蓝色小圆点所在的p标签
            var preP = $(".activeP").prev("p")//第一个小圆点所在p标签
            var nextP = $(".activeP").next("p")//第三个小圆点所在p标签
            $(".mainBox").children(".eachMain").each(function (index,item) {
                if(res.body.length%2 ==0){//res.body数组的长度为2的倍数的时候显示第length除以2的那一条新闻
                    that.activeIndex  = (res.body.length/2)
                }else {
                    that.activeIndex  = ((res.body.length-1)/2)
                }
                if(index == that.activeIndex){
                    $(item).css("left","0")
                    preP.find("span").html(res.body[that.activeIndex-1].time)
                    activeP.find("span").html(res.body[that.activeIndex].time)
                    nextP.find("span").html(res.body[that.activeIndex+1].time)
                }else if(index > that.activeIndex){
                    $(item).css("right",`-${(index-that.activeIndex)*width}px`)
                }else {
                    $(item).css("left",`-${(that.activeIndex - index)*width}px`)
                }
            })
            $(".leftArrow").on("click",function(){
                that.runLeft(that,width,res.body)
            })
            $(".rightArrow").on("click",function () {
                that.runRight(that,width,res.body)
            })
            $(nextP).on("click",function () {
                that.runLeft(that,width,res.body)
            })
            $(preP).on("click",function () {
                that.runRight(that,width,res.body)
            })
        })
    },
    //扶贫bar
    poorNumBar:function(completeNum,poorTotal){
        var data = [1,1,1,1,1,1,1,1,1,1]
        var completionRate = 100/100
        var color = []
        for(let i = 0;i<10;i++){
            if(i<Math.floor(completionRate*10)){
                color.push("#FFE4C1")
            }else if (i==Math.floor(completionRate*10)){
                color.push("#FFA531")
            }
            else {
                color.push("#eee")
            }
        }
        var option = {
            title: {
                text: (Math.round(completionRate * 10000)/100).toFixed(2)+'%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '16',
                    background:"#FFA531",
                }
            },
            color: color,
            series: [
            {
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['56%', '60%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderColor: "#FFFFFF",
                        borderWidth: 2,
                    }
                },
                hoverAnimation: false,
                data: data
            },
            {
            name: '火力显示',
            type: 'gauge',
            radius: '40%',
            startAngle: 359.9,
            endAngle: 0,
            splitNumber: 4,
            zlevel: 0,
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                        [1, '#FFA531']
                    ],
                    width: '100%',
                    shadowColor: '#fff0cc', //默认透明
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 0,
                    opacity: 1,
                }

            },
            splitLine: { //分隔线样式
                show: false,
            },
            axisLabel: { //刻度标签
                show: false,
            },
            axisTick: { //刻度样式
                show: false,
            },
            detail:{
                show: false,
            },
            data: [{
                show: false,
            }]
        },
            ]
        }
        Echarts.render('poor', option);
    },
    //电站规模scale
    scalebar:function(data){
        $(".plantNum").html(data.totalPlant)
        var valueLegth = data.totalCapacity.split("").length
        //  颜色集合
        var colorList = [ '#7ACDEA', '#EF7D65', '#88D8C9'];

        // 总和
        var total = {
            value: data.totalCapacity.split("").slice(0,valueLegth-2).join(""),
            unit: data.totalCapacity.split("").slice(valueLegth-2).join("")
        }

        var originalData = data.datas;
        var lengedData =[]
        originalData.map(function (item) {
            lengedData.push(item.name)
        })
        Echarts.util.each(originalData, function(item, index) {
            item.itemStyle = {
                normal: {
                    color: colorList[index]
                }
            };
        });
        var option = {
            tooltip: {
                show: true,
                trigger: 'item',
                textStyle:{
                    color:'#333'
                },
                formatter: function(params, ticket, callback) {
                    var res = '<br/>' + params.name + ' : ' + params.percent + '%';
                    return res;
                }
            },
            legend: {
                show: true,
                orient: 'vertical',
                x: 'right',
                data:lengedData
            },
            backgroundColor:'#ffffff',
            title: [{
                text: total.value,
                left: '43%',
                top: '44%',
                textAlign: 'center',
                textBaseline: 'middle',
                textStyle: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 20
                }
            }, {
                text: total.unit,
                left: '43%',
                top: '55%',
                textAlign: 'center',
                textBaseline: 'middle',
                textStyle: {
                    color: '#999',
                    fontWeight: 'bold',
                    fontSize: 16
                }
            }],
            series: [{
                hoverAnimation: false, //设置饼图默认的展开样式
                radius: [45, 66],
                name: 'pie',
                type: 'pie',
                center:['44%','50%'],
                selectedMode: 'single',
                selectedOffset: 16, //选中是扇区偏移量
                clockwise: true,
                startAngle: 90,
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle:{
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(122,205,234, 0.5)',
                    }
                },
                data: originalData
            }]
        };
        Echarts.render('scale', option);
    },
    //发电量统计
    generation:function (xData,yData,unit) {
        var option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                top: '18%',
                containLabel: true
            },
            xAxis :{
                type : 'category',
                data : xData,
                splitLine:{show: false},
                axisLabel:{
                    textStyle:{
                        color:'#9D9D9D'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#B1B1B1'
                    }
                },
                nameTextStyle:{
                    color:'#333'
                }
            },
            yAxis :{
                name:'('+unit+')',
                type : 'value',
                splitLine:{show: false},
                axisLabel:{
                    textStyle:{
                        color:'#9D9D9D'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#B1B1B1'
                    }
                },
                nameTextStyle:{
                    color:'#9D9D9D'
                }
            },
            series : [
                {   name:'发电量',
                    type:'bar',
                    barWidth: '44%',
                    data:yData,
                    itemStyle: {
                        normal: {
                            barBorderRadius:4,
                            color: new Echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#03AFFD'},
                                    {offset: 0.5, color: '#22BEED'},
                                    {offset: 1, color: '#33C6E4'}
                                ]
                            )
                        },
                        emphasis: {
                            barBorderRadius:4,

                            color: new Echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#03AFFD'},
                                    {offset: 0.5, color: '#22BEED'},
                                    {offset: 1, color: '#33C6E4'}
                                ]
                            )
                        }
                    }
                }
            ]
        }
        Echarts.render('electric', option);
    },
    //获取电站规模
    getPlantCount:function () {
        var that = this;
        $.http.POST('/screen/getPlantCount.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
            if(JSON.stringify(res.body) =="{}"){
                $("<p class='noDistribution'>").html("暂无数据").appendTo($("#plantScaleCharts"));
                return false
            }
            that.scalebar(res.body)
        })
    },
    //新闻详情弹窗
    newsDetailTem:function () {
        var tem = `<div class="newsDetail"></div>`
        return tem
    },
    //获取发电量统计
    getElectricityProfit:function () {
            var that = this;
            $.http.POST('/monitor/getElectricityProfit.do',{
                tokenId:Cookies.getCook('tokenId'),
                dimension:"day",
                startTime:"",
                endTime:""
            },function (res) {
                var xData = res.body.xData.slice(5)
                var yData = []
                var unit = res.body.unity1
                res.body.yData.map(function (item) {
                    if(item.name=="发电量"){
                        yData = item.value.slice(5)
                    }
                })
                that.generation(xData,yData,unit)
                $.http.POST('/monitor/getTotalInfo.do',{tokenId:Cookies.getCook('tokenId')},function (res) {
                    const totalGen = App.ConvertUnit({
                        unit:'kilowatt',
                        num:res.body.totalPower,
                        len:6,
                        split:4,
                        isInt:false
                    })
                    $(".totalGen").html(totalGen.num)
                    $(".totalGenUnit").html(totalGen.unit)
                })
            })
    },
    //获取随机数
    getrandom:function () {
      var random = Math.ceil(Math.random()*8)
        return random
    },
    //获取当前用户所有电站并渲染Tabel
    getPlant:function(nameLsit) {
        var that = this
        $.http.POST('/report/fuzzySearchPlant.do', {
            tokenId: Cookies.getCook('tokenId'),
            plantName: ''
        }, function (res) {
            $(".tableContent").empty()
            var X =Math.ceil(nameLsit.length/res.body.length)
            res.body.map(function (item,index) {
                for(let i = 0;i<X;i++){
                    var eachMoney = that.getrandom()
                    var divEl = `<div class="each">
                                   <span>${nameLsit[index*i+i]}</span>
                                   <span>${eachMoney}</span>
                                   <span>${item.plantName}</span>
                                   <span>${eachMoney*1348}</span>
                                </div>`
                    $(".tableContent").append(divEl)
                }
            })
            $(".tableContent").mCustomScrollbar({
                theme:"3d",
                axis:"xy" // vertical and horizontal scrollbar
            });
        })
    },
    //专为山阳造的数据
    renderPoverty(list){
        $(".tableContent").empty()
        var divEl =list.map(function (item) {
             return `<div class="each">
                           <span>${item.name}</span>
                           <span>${item.num}</span>
                           <span>${item.plantName}</span>
                           <span>500</span>
                        </div>`
        }).join("")
        $(".tableContent").append(divEl)
        $(".tableContent").mCustomScrollbar({
            theme:"3d",
            axis:"xy" // vertical and horizontal scrollbar
        });
    }
}