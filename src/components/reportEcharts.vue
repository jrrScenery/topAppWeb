<!--分析报表-->
<template>
  <div class="echartsView">
    <div class="chartOne">
      <div class="BtmTit">{{chartOneTit}}</div>
      <div id="myChartOne" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartTwo">
      <div class="BtmTit">{{chartTwoTit}}</div>
      <div id="myChartTwo" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartThree">
      <div class="BtmTit">{{chartThreeTit}}</div>
      <div id="myChartThree" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartFour">
      <div class="BtmTit">{{chartFourTit}}</div>
      <div id="myChartFour" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartFive">
      <div class="BtmTit">{{chartFiveTit}}</div>
      <div id="myChartFive" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartSix">
      <div class="BtmTit">{{chartSixTit}}</div>
      <div id="myChartSix" :style="{width: '100%', height: '2rem'}"></div>
    </div>
  </div>
</template>

<script>
import fetch from '../utils/ajax'

// let echarts = require('echarts/lib/echarts')
export default {
  name: 'reportEcharts',
  props:['startMonth','endMonth'],
  components: {

  },

  data () {
    return {
      chartOneTit: '月度报修数量统计',
      chartTwoTit: '厂商报修数统计',
      chartThreeTit: '技术方向报修数统计',
      chartFourTit: '设备型号报修数统计',
      chartFiveTit: '报障级别统计',
      chartSixTit: '备件更换量统计',
      oneDataX: [],
      oneData:  [],
      sixDataX:[],
      sixData:[],
      factoryData:[{value: 335, name: 'IBM'},
        {value: 310, name: 'DELL'},
        {value: 234, name: '华为'},
        {value: 135, name: 'HP'},
        {value: 1548, name: 'CISCO'}],
      deviceTypeData:[
        {value: 335, name: 'IBM'},
        {value: 310, name: 'DELL'},
        {value: 234, name: '华为'},
        {value: 135, name: 'HP'},
        {value: 1548, name: 'CISCO'}
      ],
      deviceModelXData:['HP DL580G7', 'IBM X3650 M4', 'HP VLS12000', 'IBM X3650 M3', 'DELL PER720', '华为S8508', 'CISCO UCS B460 M4', 'CISCO B440 M2'],
      deviceModelYData:[182, 289, 294, 104, 144, 230, 230, 230],
      caseLevelData:[
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ]
    }
  },

  mounted () {
    this.drawLine()
  },

  created () {
    this.reFetchAll()
  },

  methods: {
    onSubmit () {
      //console.log('submit')
    },
    crtTimeFtt(val) {
      if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + '-' + (date.getMonth() + 1) ;//+ '-' + date.getDate()
      }
    },
    reFetchAll(){
      this.fetchAll(this.crtTimeFtt(this.startMonth),this.crtTimeFtt(this.endMonth));
    },
    fetchAll(startDay,endDay){

      var projectId = this.$route.query.projectId;
      
      var url = "?action=GetStatisticsCaseData&dimensionType=date&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        //console.log(reportData);
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
          dataArray[i] = reportData[i].NUMS;
        }
        this.oneData = dataArray;
        this.oneDataX = dataArrayX;
        this.drawLineOne();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=factory&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
        }
        this.factoryData = dataArray;
        this.drawLineTwo();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=deviceType&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
        }
        this.deviceTypeData = dataArray;
        this.drawLineThree();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=deviceModel&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var xData = [] ,yData = [];
        for(var i=0;i<reportData.length;i++){
          xData[i] = reportData[i].DIMENSIONTYPE;
          yData[i] = reportData[i].NUMS;
        }
        this.deviceModelXData = xData;
        this.deviceModelYData = yData;
        this.drawLineFour();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=caseLevel&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        if(typeof(reportData)!='undefined'){
          for(var i=0;i<reportData.length;i++){
            dataArray[i] = {};
            dataArray[i].name = reportData[i].DIMENSIONTYPE;
            dataArray[i].value = reportData[i].NUMS;
          }
          this.caseLevelData = dataArray;
          this.drawLineFive();          
        }
      });

      var url = "?action=GetStatisticsCaseData&dimensionType=partUse&timeRangeType=month&ORGID="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        //console.log(reportData);
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
          dataArray[i] = reportData[i].NUMS;
        }
        this.sixData = dataArray;
        this.sixDataX = dataArrayX;
        this.drawLineSix();
      });

    },
    drawLineOne () {
      let myChartBox = document.getElementById('myChartOne')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartOne = echarts.init(myChartBox)
      this.myChartOne.setOption({
        color: ['#3398DB'],
        grid: {
          top: '5%',
          left: '0',
          right: '0',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.oneDataX,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '50%',
            data: this.oneData,
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            }
          }
        ]
      })
    },
    drawLineTwo () {
      let myChartBox = document.getElementById('myChartTwo')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartTwo = echarts.init(myChartBox)
      this.myChartTwo.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.factoryData,
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal:{
                label:{
                  show:true,
                  formatter: '{b} : {c} \n ({d}%)'
                },
                labelLine:{
                  show:true
                }
              }
            }
          }
        ]
      })
    },
    drawLineThree () {
      let myChartBox = document.getElementById('myChartThree')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartThree = echarts.init(myChartBox)
      this.myChartThree.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.deviceTypeData,
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal:{
                label:{
                  show:true,
                  formatter: '{b} : {c} \n ({d}%)'
                },
                labelLine:{
                  show:true
                }
              }
            }
          }
        ]
      })
    },
    drawLineFour () {
      let myChartBox = document.getElementById('myChartFour')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartFour = echarts.init(myChartBox)
      this.myChartFour.setOption({
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
          data: this.deviceModelXData
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: this.deviceModelYData,
            itemStyle: {
              normal:{
                label:{
                  show:true,
                  formatter: '{c}'
                },
                labelLine:{
                  show:true
                }
              }
            }
          },
        ]
      })
    },
    drawLineFive () {
      let myChartBox = document.getElementById('myChartFive')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartFive = echarts.init(myChartBox)
      this.myChartFive.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'inner'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.caseLevelData,
            itemStyle: {
              normal:{
                label:{
                  show:true,
                  formatter: '{b} : {c} \n ({d}%)'
                },
                labelLine:{
                  show:true
                }
              }
            }
          }
        ]
      })
    },
    drawLineSix () {
      let myChartBox = document.getElementById('myChartSix')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartSix = echarts.init(myChartBox)
      this.myChartSix.setOption({
        color: ['red'],
        grid: {
          top: '5%',
          left: '0',
          right: '0',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.sixDataX,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '50%',
            data: this.sixData,
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            }
          }
        ]
      })
    },
    drawLine () {
      //this.drawLineOne()
      //this.drawLineTwo()
      //this.drawLineThree()
      //this.drawLineFour()
      //this.drawLineFive()
      //this.drawLineSix()
    }
  }
}
</script>

<style scoped>
  .echartsView{padding: 0 0.15rem;}
  .echartsView .BtmTit{ line-height: 0.3rem;}
</style>
