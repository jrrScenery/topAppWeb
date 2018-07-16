<!--工作台-备件库存-->
<template>
  <div class="workBenchPartsView">
    <header-last :title="workBenchPartsTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="provinceName"
          label="城市"
          width="24%">
        </el-table-column>
        <el-table-column label="自有">
          <el-table-column
            prop="zyPartNumber"
            label="数量"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="zyPartAmount"
            label="金额"
            width="19%">
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商">
          <el-table-column
            prop="gysPartNumber"
            label="数量"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="gysPartAmount"
            label="金额"
            width="19%">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
export default {
  name: 'workBenchParts',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchPartsTit: '备件库存',
      tableData: []
    }
  },
  created () {
    this.$axios.get(global_.proxyServer+"?action=GetPartStat&EMPID="+global_.empId,{}).then(res=>{
      this.tableData = res.data.data;
      // console.log(this.tableData);
    });
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
  .content >>> .el-table__empty-block{position: initial}
</style>
