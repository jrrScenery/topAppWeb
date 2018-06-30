<!--工作台-人员信息-->
<template>
  <div class="workBenchPartsView">
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
        <el-table-column label="自有">
          <el-table-column
            prop="ownNum"
            label="数量"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="ownMoney"
            label="金额"
            width="19%">
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商">
          <el-table-column
            prop="otherNum"
            label="数量"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="otherMoney"
            label="金额"
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
  name: 'workBenchParts',

  components: {
    headerBase
  },

  data () {
    return {
      tableData: [{
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
      }, {
        city: '北京',
        ownNum: '625',
        ownMoney: '315',
        otherNum: '421',
        otherMoney: '271'
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
  .workBenchPartsView{width: 100%;}
  .content{margin-top: 0.05rem;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
</style>
