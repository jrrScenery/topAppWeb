<!--业务-->
<template>
  <div class="businessView">
    <div class="businessTop">
      <el-form ref="form" :model="form" label-width="0.6rem">
        <el-form-item label="行业" >
          <el-select v-model="form.industry" placeholder="请选择行业">
            <el-option v-for="item in industryType" :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="form.custom"></el-input>
        </el-form-item>
        <el-form-item label="项目">
          <el-input v-model="form.program"></el-input>
        </el-form-item>
        <el-form-item label="时间段">
          <el-col :span="11">
            <el-date-picker type="month"  @focus="noKeyword" placeholder="开始日期" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">~</el-col>
          <el-col :span="11">
            <el-date-picker type="month"  @focus="noKeyword" placeholder="结束日期" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item :inline="true">
          <el-button  @click="freshCharts">查询</el-button>
        </el-form-item>
        
      </el-form>
    </div>
    <!-- <div class="businessBtm"><report-echarts></report-echarts></div> -->

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

  </div>
</template>

<script>
import fetch from '../../utils/ajax'

export default {
  name: 'business',
  data () {
    return {
      form: {
        custom: '',
        program: '',
        startTime: this.getFormerTime(1)[0],
        endTime: this.getCurrentTime(1)[0],
        industry: ''
      },
      industryType: [],
      chartOneTit: '月度报修数量统计',
      chartTwoTit: '厂商报修数统计',
      chartThreeTit: '报障级别统计',
      chartFourTit: '设备型号报修数统计',
      chartFiveTit: '技术方向报修数统计',
      chartSixTit: '备件更换量统计',
      oneDataX: [],
      oneData:  [],
      sixDataX:[],
      sixData:[],
      factoryData:[],
      factoryDataX:[],
      deviceTypeData:[],
      deviceModelXData:[],
      deviceModelYData:[],
      caseLevelData:[]
    }
  },
  created () {
    fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
      this.industryType = res.data;
    });
    this.freshCharts();
  },
  methods: {
    
    freshCharts(){
      let params = {timeStart:this.form.startTime,timeEnd:this.form.endTime,PROJECT_NAME:this.form.custom,CUST_NAME:this.form.program,INDUSTRY:this.form.industry}
      this.fetch1(params);
      this.fetch2(params);
      this.fetch3(params);
      this.fetch4(params);
      this.fetch5(params);
      this.fetch6(params);
    },
    noKeyword () {
      document.activeElement.blur()
    },
    crtTimeFtt(val) {
      if (val != null) {
        var date = new Date(val);
        var month = date.getMonth() + 1;
        if(month<10){
          month = "0" + month;
        }
        return date.getFullYear() + '-' + month ;//+ '-' + date.getDate()
      }
    },
    fetch1(params){
      var url = "?action=GetStatisticsCaseData&dimensionType=date&timeRangeType=month";
      fetch.get(url,params).then(res=>{
        var reportData = res.DATA;
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
    },
    fetch2(params){
      let url = "?action=GetStatisticsCaseData&dimensionType=factory&timeRangeType=month";
      fetch.get(url,params).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
        }
        this.factoryData = dataArray;
        this.factoryDataX = dataArrayX;
        this.drawLineTwo();
      });
    },
    fetch5(params){
      let url = "?action=GetStatisticsCaseData&dimensionType=deviceType&timeRangeType=month";
      fetch.get(url,params).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
        }
        this.deviceTypeData = dataArray;
        this.drawLineFive();
      });
    },
    fetch4(params){
      let url = "?action=GetStatisticsCaseData&dimensionType=deviceModel&timeRangeType=month";
      fetch.get(url,params).then(res=>{
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
    },
    fetch3(params){
      let url = "?action=GetStatisticsCaseData&dimensionType=caseLevel&timeRangeType=month";
      fetch.get(url,params).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        if(typeof(reportData)!='undefined'){
          for(var i=0;i<reportData.length;i++){
            dataArray[i] = {};
            dataArray[i].name = reportData[i].DIMENSIONTYPE;
            dataArray[i].value = reportData[i].NUMS;
          }
          this.caseLevelData = dataArray;
          this.drawLineThree();          
        }
      });
    },
    fetch6(params){
      var url = "?action=GetStatisticsCaseData&dimensionType=partUse&timeRangeType=month";
      fetch.get(url,params).then(res=>{
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
      console.log(this.factoryDataX)
      let myChartBox = document.getElementById('myChartTwo')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartTwo = echarts.init(myChartBox)

/*      this.myChartTwo.setOption(
        {
            title : {
                text: '同名数量统计',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: this.factoryDataX,

                //selected: data.selected
            },
            series : [
                {
                    name: '姓名',
                    type: 'pie',
                    radius : '55%',
                    center: ['40%', '50%'],
                    data: this.factoryData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
      )*/
      this.myChartTwo.setOption({
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: this.factoryDataX
        },
        series: [
          {
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
            data: this.factoryData,
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
    drawLineFive () {
      let myChartBox = document.getElementById('myChartFive')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartFive = echarts.init(myChartBox)
      this.myChartFive.setOption({
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
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
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
      myChartBox.style.height = '300px'
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
                  formatter: '{c}',
                  position:'right'
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
    drawLineThree () {
      let myChartBox = document.getElementById('myChartThree')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChartThree = echarts.init(myChartBox)
      this.myChartThree.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            startAngle:0,
            minAngle:10,
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
                  formatter: '{b} : {c}  ({d}%)'
                },
                labelLine:{
                  show:true
                },
                position: 'top'
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
    standardDate(join,...num){
      let arr = [];
      num.forEach((item)=>{
        item.toString().length<2?arr.push('0'+item):arr.push(item);
      });
      return arr.join('-')
    },
    getFormerTime (n) {
      let nowYear = new Date().getFullYear() - 1, yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      return yearArr
    },
    getCurrentTime (n) {
      let nowYear = new Date().getFullYear(), yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    }

  }
}
</script>

<style scoped>
  .businessView{}
  .businessView .businessTop{padding: 0 0.25rem; margin-bottom: 0.1rem}
  .businessView >>> .el-form-item__label{text-align: left}
  .businessView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .businessView >>> .line{text-align: center}
  .businessView >>> .el-input__inner{ }
  .businessView >>> .el-select{ width: 100%;; }
  /* .businessView >>> .el-input__icon{display: none} */
  .businessView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .businessView >>> .el-input__inner:focus{border-color: #dcdfe6;}
  .businessView >>> .el-input__prefix{display: none;}
  .businessView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .echartsView{ width: 96%; margin: 0 auto;}
</style>
