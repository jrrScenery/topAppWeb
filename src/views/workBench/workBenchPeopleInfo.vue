<!--工作台-人员信息-->
<template>
  <div class="workBenchPeopleInfoView">
    <header-last :title="workBenchPeopleInfoTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <!-- <router-link :to="{name:'workBenchTaskDetailInfo',query:{}}"> -->
      <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        @cell-click="cellClick"
        style="width: 100%">
        <el-table-column
          prop="AREANAME"
          label="地点"
          width="24%">
        </el-table-column>
        <el-table-column 
        width="76%"
        label="人员数量">
          <el-table-column
            prop="C1"
            label="机动人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="C2"
            label="驻场人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="C3"
            label="个人合作"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="C4"
            label="公司合作"
            width="19%">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- </router-link> -->
    </div>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchPeopleInfo',

  components: {
    headerLast,
    footerHome
  },

  data () {
    return {
      workBenchPeopleInfoTit: '人员管理',
      tableData: [],
      busy:true,
      loadall: false
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
    cellClick (row,column) {
      console.log("row",row)
      console.log("column",column);
      if(column.property=='AREANAME'){
        this.$router.push({name: 'workBenchPeopleInfoOfCity', query: {areaName:row.AREANAME,type:''}})
      }else if(column.property=='C1'){
        this.$router.push({name: 'workBenchPeopleInfoOfCity', query: {areaName:row.AREANAME,type:'JD'}})
      }else if(column.property=='C2'){
        this.$router.push({name: 'workBenchPeopleInfoOfCity', query: {areaName:row.AREANAME,type:'ZC'}})
      }else if(column.property=='C3'){
        this.$router.push({name: 'workBenchPeopleInfoOfCity', query: {areaName:row.AREANAME,type:'GR'}})
      }else if(column.property=='C4'){
        this.$router.push({name: 'workBenchPeopleInfoOfCity', query: {areaName:row.AREANAME,type:'GS'}})
      }
    },
  }
}
</script>

<style scoped>
  .workBenchPeopleInfoView{width: 100%;}
  .content{margin-top: 0.05rem; color: #666666;bottom: 0.45rem}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>
