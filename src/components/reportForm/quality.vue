<template>
  <div class="qualityView">
    <div class="qualityTop">
      <span>筛选条件</span>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-select v-model="form.time" placeholder="时间段">
            <el-option
              v-for="item in optionTime"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="指标分类">
            <el-option
              v-for="item in optionType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="qualityEcharts">
      <div id="myChart" :style="{width: '100%', height: '3.5rem'}"></div>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
export default {
  name: 'quality',
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [{
        value: '选项1',
        label: '全年'
      }, {
        value: '选项2',
        label: '2017'
      }, {
        value: '选项3',
        label: '2018'
      }],
      optionType: [{
        value: '选项1',
        label: '部门指标排名'
      }, {
        value: '选项2',
        label: '部门指标明细'
      }, {
        value: '选项3',
        label: '岗位角色指标排名'
      }]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .qualityView{padding: 0 0.25rem; color: #999999}
  .qualityView .qualityTop{display: flex; justify-content: space-between;}
  .qualityView span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
</style>
