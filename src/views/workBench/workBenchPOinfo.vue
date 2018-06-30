<!--工作台-PO信息-->
<template>
  <div class="workBenchPOinfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="city"
          label="城市"
          width="24%">
        </el-table-column>
        <el-table-column label="供应商类型">
          <el-table-column
            prop="people"
            label="人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="parts"
            label="备件"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="logistics"
            label="物流"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="subpackage"
            label="分包"
            width="19%">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchPoinfo',

  components: {
    headerBase
  },

  data () {
    return {
      tableData: [{
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }, {
        city: '北京',
        people: '625',
        parts: '315',
        logistics: '421',
        subpackage: '271'
      }],
      workBenchPeopleInfo: [
        {}
      ]
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .workBenchPOinfoView{width: 100%;}
  .content{margin-top: 0.05rem;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
</style>
