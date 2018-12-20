<!--工作台-人员信息-->
<template>
  <div class="workBenchPOStaffView">
    <header-base-p-o-staff :title="workBenchPOStaffTit"></header-base-p-o-staff>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <!-- <router-link :to="{name:'workBenchTaskDetailInfo',query:{}}"> -->
      <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchPOStaffObj">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
        </template>
      </el-table>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import headerBasePOStaff from '../header/headerBasePOStaff'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchPOStaff',

  components: {
    headerBasePOStaff
  },

  data () {
    return {
      workBenchPOStaffTit: 'OP管理',
      tableData: [],
      busy:true,
      loadall: false,
      workBenchPOStaffObj: [
        {prop: 'name', label: '供应商', width: '25%'},
        {prop: 'na', label: '类型', width: '25%'},
        {prop: 'res', label: '实际支付日期', width: '25%'},
        {prop: 'jin', label: '金额', width: '25%'}
      ],
    }
  },
  created () {
    fetch.get("?action=GetPersonStat",{}).then(res=>{
      this.tableData = res.data;
      this.busy= false;
      this.loadall = true;
      console.log(this.tableData);
    });
  },
  methods: {
    rowClick (row) {
      console.log(row)
      this.$router.push({name: 'workBenchPartsOwnListSingle', query: {}})
    },
  }
}
</script>

<style scoped>
  .workBenchPOStaffView{width: 100%;}
  .content{margin-top: 0.05rem; color: #666666;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>