export default{
    formatDate(date) {  
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        let d = date.getDate();     
        return y + '-' + m + '-' + d;  
    },
    // GetDateStr(AddDayCount){
    //     var dd = new Date();
    //     dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    //     var y = dd.getFullYear();
    //     var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    //     var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    //     return y + "-" + m + "-" + d;
    // },
    getLeaveType(){
        let data = {
            loaType:{
                0: "请假",
                1: "加班",
                2: "考勤",
                3: "报派工",
                4: "批量加班"
            },
            myattence: {
                0: 0,
                1: 1,
                2: 3,
                3: 4,
                4: 5,
                5: 6,
                6: 7,
                7: 8,
                8: 9,
                9: 13,
                10: 14,
                11: 15,
                12: 16,
                13:17
            },
            myabsence:{
                0:0,
                1:2,
                2:3,
                3:4,
                4:5,
                5:6,
                6:7,
                7:8,
                8:9,
                9:13,
                10:14
            },
            myabsencereserve: {
                0: 0,
                1: 1,
                3: 2,
                4: 3,
                5: 4,
                6: 5,
                7: 6,
                8: 7,
                9: 8,
                13: 9,
                14: 10,
                15: 11,
                16: 12,
                17:13
            },
            leaveType:{
                0: "请选择",
                1: "因公",
                2: "调休",
                3: "病假",
                4: "事假",
                5: "年假",
                6: "婚假",
                7: "产假",
                8: "哺乳假",
                9: "丧假",
                10: "迟到",
                11: "早退",
                12: "旷工",
                13: "产检假",
                14: "陪产假",
                15:"分包替岗",
                16:"漏打卡",
                17:"去case地"
            },  
            relaxation:{
                0:"调休",
                1:"有偿"
            },
            processStatus:{
                0 : "未提交",
                1 : "审批中",
                2 : "已审批",
                3: "修改"
            },
        }
        return data;
    },
}