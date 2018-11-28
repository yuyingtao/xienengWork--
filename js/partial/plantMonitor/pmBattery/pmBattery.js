/**
 * Created by SP0014 on 2018/3/13.
 * 电池监控
 */
define(function(){
    return pmBattery;
});
var pmBattery = {
    plantId:'',//电站id
    batteryTable:'', //电池信息表格
    Render:function(){
        var _this = this;
        _this.plantId = opts.plantId || ''
        _this.getData({tokenId:Cookies.getCook('tokenId'),plantId:_this.plantId})
    },
    getData:function(obj){
        if(this.batteryTable){
            $("#batteryTable tbody ").off('click');
            this.batteryTable.fnClearTable(false);
            this.batteryTable.fnDestroy()
        }
        this.batteryTable = $('#batteryTable').dataTable({
            ajax:{
                type:'POST',
                url:'/monitor/listBat.do',
                //data:obj,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                data:function(d){
                    d.plantId = obj.plantId;
                    // d.status = obj.status;
                    d.tokenId = obj.tokenId;
                    return JSON.stringify(d)
                },
                dataSrc: function(json){
                    Number(json.code) == 104 && App.alert(json);
                    json.recordsTotal = json.body.recordsTotal;
                    json.recordsFiltered = json.body.recordsFiltered;
                    return json.body.data
                }
            },
            // //bDestroy:true,
            bSort:false,
            bInfo:false,
            pageLength: 16,
            serverSide: true,  //启用服务器端分页
            "processing": true,
            searching: false,  //原生搜索
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            paging:true,
            bPaginate:true,
            stateSave : false,//记住分页
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
            },
            language:{
                "sProcessing": "处理中...",
                "sLengthMenu": "",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项",
                "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页",
                    "sJump": "跳转"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            columns: [
                {data:'batName',title:'名称'},
                {data:'status',title:'状态'},
                {data:'voltage',title:'电压(伏)'},
            ],
            headerCallback: function( thead, data, start, end, display ) {
            },
        })
    }

};