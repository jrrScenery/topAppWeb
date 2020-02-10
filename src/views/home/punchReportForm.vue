<template>
    <div class="punchReportFormView">
        <header-punch-report :title="headerPunchReportTit" :searchType="searchType" :queryData='searchData' @searchPro='getSearParams'></header-punch-report>
        <div style="height:0.45rem"></div>
        <div class="echarsPunchView" v-if="isVisiable">
            <div class="chartPunchOne">
                <div class="BtmTit">{{chartOneTit}}</div>
                <div id="myChartOne" :style="{width: '100%', height: '2rem'}"></div>
            </div> 
            <div class="chartPunchTwo">               
                <div class="BtmTit">{{chartTwoTit}}</div>
                <router-link :to="{name:'checkAttenDetail',query:{searchData:this.searchData}}">
                    <div class="checkDetail">查看详情</div>
                </router-link>
                <div id="myChartTwo" :style="{width: '100%'}"></div>
            </div>
        </div>
        <div class="norecord" v-else>暂无考勤明细汇总</div>
    </div>
</template>
<script>
import headerPunchReport from "../header/headerPunchReport";
import fetch from '../../utils/ajax'
export default {
    name:'punchReportForm',
    components:{
        headerPunchReport
    },
    data(){
        return{
            headerPunchReportTit:'考勤明细汇总表',
            searchType:'punchReportForm',
            chartOneTit:'考勤统计',
            chartTwoTit:'异常打卡项目部',
            searchData:{
                area:'',
                projectGroup:'',
                date:'',
                prjName:'',
                staffName:'',
                itcode:''
            },
            isSearch:false,
            resizefun:null,
            isVisiable:true,
            counts:''
        }
    },
    created(){
        console.log("0000000000000");
        this.getChartData();
    },
    mounted(){},
    //移除事件监听，避免内存泄漏
    beforeDestroy() {
        window.removeEventListener('resize', this.resizefun)
        this.resizefun = null
    },
    methods:{
        fetch1(params){
            var url = "?action=/attendance/querySummary";
            fetch.get(url,params).then(res=>{
                console.log("fetch1",res)
                if(res.STATUSCODE=='1'){
                    this.attenSumArr = res.data;
                    let attenSum = res.data;
                    let dataArrayX = [];
                    let dataArray = [];
                    for(let i=0;i<attenSum.length;i++){
                        dataArray[i] = {};
                        dataArrayX[i] = attenSum[i].STATUS
                        if(attenSum[i].STATUS==0){
                            dataArray[i].name = "考勤正常";
                        }else{
                            dataArray[i].name = "考勤异常";
                        }
                        
                        dataArray[i].value = attenSum[i].NUM
                    }
                    this.oneData = dataArray;
                    this.oneDataX = dataArrayX;
                    this.drawLineOne();
                }else{
                    this.isVisiable = false
                }
            });
        },
        fetch2(params){
            var url = "?action=/attendance/querySummary";
            fetch.get(url,params).then(res=>{
                console.log("fetch2",res);
                if(res.STATUSCODE=='1'){
                    this.counts = res.detail;
                    let attenSumDetail = res.detail;
                    let xData=[],xLabel = [],xLabels=[],xConcat=[],yData=[]
                    for(let i=attenSumDetail.length-1;i>=0;i--){
                        xLabel = [];
                        xLabel[0] = attenSumDetail[i].PROJECT_AREA;
                        xLabel[1] = attenSumDetail[i].NUM;
                        xLabel[2] = attenSumDetail[i].RATIO;
                        xLabels[attenSumDetail.length-i-1] = xLabel;
                        xData[attenSumDetail.length-i-1] = attenSumDetail[i].RATIO;
                        yData[attenSumDetail.length-i-1] = attenSumDetail[i].PROJECT_AREA;
                    }
                    xConcat.push(xData);
                    xConcat.push(xLabels);
                    this.twoDataX = xConcat;
                    this.twoDataY = yData;
                    this.drawLineTwo();
                }
            })
        },
        drawLineOne(){
            let myChartBox = document.getElementById('myChartOne');
            this.myChartOne = echarts.init(myChartBox);
            this.myChartOne.setOption({               
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 0,
                    bottom: 0,
                    data: this.oneDataX
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: this.oneData,
                    itemStyle: {
                        normal:{
                            label:{
                                show:true,
                                formatter: '{b} : {c} \n ({d}%)'
                            },
                            labelLine:{
                                show:true
                            },
                            color:function(params) {
                            //自定义颜色
                                var colorList = [          
                                    '#FF0000', '#228B22',
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }]
            })
        },
        drawLineTwo(){
            // 初始化echarts实例
            let myChartTwo = this.$echarts.init(document.getElementById('myChartTwo'));
            myChartTwo.setOption({
                grid: {
                    top: '5%',
                    left: '0',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.twoDataY
                },
                series: [{
                    name: this.twoDataX[1],
                    type: 'bar',
                    data: this.twoDataX[0],
                    barWidth: 20,
                    itemStyle: {
                        normal:{
                            color: '#FF0000',
                            label:{
                                fontSize:'12',
                                show:true,
                                formatter: function(params){
                                    var params_list = []
                                    var params_split = params.seriesName.split(",")
                                    for (var i=0; i<params_split.length; i=i+3){
                                        params_list.push(params_split.slice(i,i+3))
                                    }
                                    for (var i=0; i<params_list.length; i++){
                                        if (params.name == params_list[i][0]) {
                                            return (params_list[i][2].toString()+"%")
                                        }
                                    }
                                },
                                position:'inside'                       
                            },
                            labelLine:{
                                show:true
                            }
                        }
                    }
                }]
            }) 
            this.autoHeight = this.counts.length * 35 + 50;
            myChartTwo.getDom().style.height = this.autoHeight + "px";
            myChartTwo.resize();            
        },
        freshCharts(params){
            this.fetch1(params);
            this.fetch2(params);
        },
        getSearParams (searchData) {
            // if(searchData.staffName!=""){
            //     this.$router.push({name:'attenHistory',query:{staffName:searchData.staffName,dateStr:searchData.date}})
            // }else{
                this.searchData = searchData;
                this.getChartData();
            // }
        },
        getChartData(){
            let params = {};
                params.parentArea = this.searchData.area;
                params.projectArea = this.searchData.projectGroup;
                params.day = this.searchData.date;
                params.prjName = this.searchData.prjName;
                params.staffName = this.searchData.staffName;
                params.itcode = this.searchData.itcode;
            this.counts = [];
            this.freshCharts(params)
        },
    }
}
</script>
<style scoped>
.echarsPunchView{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;background: #ffffff}
.BtmTit{margin-top: 15px;position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.16rem; color: #2698d6;}
.BtmTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.BtmTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.checkDetail{float:right;color:#2698d6;margin-right:0.2rem}
.punchReportFormView>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}

/* .punchReportFormView{margin-top: 0.05rem; width: 100%; background: #ffffff;}
.echarsPunchView{width: 100%;margin: auto 0;background: red}
.BtmTit{margin-top: 15px;position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.16rem; color: #2698d6;}
.BtmTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.BtmTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.checkDetail{float:right;color:#2698d6}
.punchReportFormView>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999} */
</style>