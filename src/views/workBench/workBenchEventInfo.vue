<template>
  <div class="workBenchEventInfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="searchView">
        <el-form>
          <el-col :span="9">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width: 90%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">~</el-col>
          <el-col :span="9">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date2" style="width: 90%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="tableView">
        <el-table
          :data="tableData"
          height="3.88rem"
          :summary-method="getSummaries"
          show-summary
          style="width: 100%;">
          <template v-for="item in workBenchEventInfoObj">
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
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchEventInfo',

  components: {
    headerBase
  },

  data () {
    return {
      form: {
        date1: '',
        date2: ''
      },
      tableData: [
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' },
        { industry: '移动', break: '1013', nobreak: '234', total: '' }
      ],
      workBenchEventInfoObj: [
        {prop: 'industry', label: '行业', width: ''},
        {prop: 'break', label: '故障类', width: ''},
        {prop: 'nobreak', label: '非故障类', width: ''},
        {prop: 'total', label: '总计', width: ''}
      ]
    }
  },

  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>
  .workBenchEventInfoView{width: 100%; text-align: center;}
  .workBenchEventInfoView .content{margin-top: 0.05rem; background: #ffffff;}
  .searchView{padding: 0.15rem 0.25rem;}
  .searchView >>> .el-form{height: 0.4rem;}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col-1{text-align: center; line-height: 0.4rem}
  .tableView >>> .el-table th{border-top: 0.01rem solid #e1e1e1; line-height: 0.25rem;}
  .tableView >>> .el-table .cell{text-align: center; padding: 0}
  .tableView >>> .el-table tr{line-height: 0.25rem;}
  .tableView >>> .el-table tr:nth-child(2n+1){background: #f7f7f7;}
  .tableView >>> .el-table tr:nth-child(2n){background: #ffffff;}
</style>
