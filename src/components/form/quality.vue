<!--质量-->
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
      <div class="qualityTit">{{echartsTit}}</div>
      <div id="myChart" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="qualityTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <template v-for="item in qualityTableObj">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quality',
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [
        {value: '选项1', label: '全年'},
        {value: '选项2', label: '2017'},
        {value: '选项3', label: '2018'}
      ],
      optionType: [
        {value: '选项1', label: '部门指标排名'},
        {value: '选项2', label: '部门指标明细'},
        {value: '选项3',label: '岗位角色指标排名'}
      ],
      echartsTit: '部门指标排名',
      tableData: [
        {ranking: '1', department: '总控部门', score: '100'},
        {ranking: '1', department: '东区服务部', score: '98'},
        {ranking: '1', department: '南区服务部', score: '92.79'}
      ],
      qualityTableObj: [
        {prop: 'ranking', label: '排名序列', width: '30%'},
        {prop: 'department', label: '部门', width: '40%'},
        {prop: 'score', label: '综合分值', width: '30%'}
      ]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChartBox = document.getElementById('myChart')
      myChartBox.style.width = window.innerWidth - 30  + 'px'
      this.myChart = echarts.init(myChartBox)
      this.myChart.setOption({
        grid: {
          top: '5%',
          left: '0',
          right: '6%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          barWidth: '30%',
          data: ['总控中心', '东区服务部', '南区服务部', '北区二部服务部', '北区一部服务部', '专业化服务部', '备件']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [182, 289, 234, 970, 144, 230, 290]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  canvas{width: 100%!important;}
  .qualityView{padding: 0 0.25rem 0.15rem; color: #999999}
  .qualityView .qualityTop{display: flex; justify-content: space-between;}
  .qualityView span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
  .qualityEcharts{margin: 0.1rem 0;}
  .qualityEcharts .qualityTit{line-height: 0.3rem;}
  .qualityTable >>> th{color: #333333; padding: 0; height: 0.3rem; line-height: 0.3rem; background: #f7f7f7}
  .qualityTable >>> td{color: #666666; padding: 0; height: 0.3rem; line-height: 0.3rem;}
  .qualityTable >>> .cell{font-size: 0.13rem; text-align: center}
</style>
