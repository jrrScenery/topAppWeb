<!--工作台-人员信息-->
<template>
  <div class="workBenchSupplierInfoOfCityView">
    <header-base-eleven :title="workBenchSupplierInfoTit"></header-base-eleven>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <!-- <router-link :to="{name:'workBenchTaskDetailInfo',query:{}}"> -->
      <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchSupplierInfoOfCityObj">
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
import headerBaseEleven from '../header/headerBaseEleven'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchSupplierInfoOfCity',

  components: {
    headerBaseEleven
  },

  data () {
    return {
      workBenchSupplierInfoTit: '供应商信息',
      tableData: [],
      busy:true,
      loadall: false,
      workBenchSupplierInfoOfCityObj: [
        {prop: 'name', label: '名称', width: '25%'},
        {prop: 'na', label: '供应种类', width: '25%'},
        {prop: 'res', label: '供应属性', width: '25%'},
        {prop: 'pro', label: '合作属性', width: '25%'}
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
      this.$router.push({name: 'workBenchSupplierInfoOfCitySingle', query: {}})
    },
  }
}
</script>

<style scoped>
  .workBenchSupplierInfoOfCityView{width: 100%;}
  .content{margin-top: 0.05rem; color: #666666;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>