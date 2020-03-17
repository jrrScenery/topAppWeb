<template>
  <div class="viewHolidaysView">
    <header-last :title="viewHolidaysTit"></header-last>
    <div style="height:0.45rem"></div>
    <div class="tableHead">
      <el-table style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="holiday" label="剩余年假"></el-table-column>
      </el-table>
    </div>
    <div class="SelectListCell">
      <div class="title">
        <div class="proSLAInfoCell" v-for="items in itemLists" :key="items.itemName">
          <div class="proSLAInfoTit">{{items.itemName}}</div>
          <div class="divTable" v-for="item in items.detail" :key="item.id" style="width:100%;background:#f7f7f7;">
            <span class="bolder" style="width:40%;text-align:left;margin-left:0.4rem">{{item.REALNAME}}</span>
            <span class="bolder" style="width:37%;text-align:right;">
              <router-link :to="{name:'holidayDetail',query:{staffId:item.EMPID,name:item.REALNAME}}" style="color:#2698d6;text-decoration:underline">{{item.LEAVE_REMAIN_DAYS}}</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
export default {
  name: "holiday",
  components: {
    headerLast
  },
  data() {
    return {
      viewHolidaysTit: "查看年假",
      itemLists: [],
      searchType: "holiday",
    };
  },
  created() {
    this.queryAnnualLeave();
  },
  methods: {
    queryAnnualLeave(){
      fetch.get("?action=/attendance/queryAnnualLeave",{}).then(res=>{
        console.log("queryAnnualLeave",res);
        if(res.STATUSCODE=='1'){
          this.itemLists = res.data;
        }else{
          this.$message({
              message:res.MESSAGE,
              type: 'error',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
          })
        }
      })
    }
  },
  
};
</script>


<style scoped>
.viewHolidaysView {
  width: 100%;
}
.content {
  width: 100%;
  position: absolute;
  top: 0.45rem;
  bottom: 0;
  margin-top: 0.05rem;
  overflow: scroll;
}
.viewHolidaysView >>> .proSLAInfoCell span {
  display: inline-block;
  width: 50%;
  color: #666666;
  line-height: 0.3rem;
  text-align: center;
  background: #f7f7f7;
}
.viewHolidaysView >>> .proSLAInfoCell .tableTitle {
  color: #2698d6;
  padding-left: 0.25rem;
  position: relative;
  background: #ffffff;
}
.viewHolidaysView >>> .proSLAInfoCell .tableTitle:before {
  width: 0.05rem;
  height: 0.12rem;
  content: "";
  position: absolute;
  left: 0.1rem;
  top: 0.09rem;
  background: #2698d6;
}
.viewHolidaysView >>> .proSLAInfoCell .divTable {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}
.viewHolidaysView >>> .tableTd .divTable span {
  display: inline-block;
  width: 50%;
  overflow: hidden;
  text-align: center;
}
.tableHead >>> .el-table th {
  padding-top: 0.08rem !important;
  padding-bottom: 0.08rem !important;
  color: #666;
}
/* .tableHead >>> .el-table__body {
  width: 100% !important;
} */
.tableHead >>> .el-table__header {
  width: 100% !important;
}
.tableHead >>> .el-table {
  font-size: 0.13rem;
  text-align: center;
}
.tableHead >>> .el-table th:nth-child(1) {
  text-align: left;
  background: #f7f7f7;
  padding-left:0.35rem;
}
.tableHead >>> .el-table th:nth-child(2) {
  text-align: left;
  background: #f7f7f7;
  padding-left:0.95rem;
}
/* .tableHead >>> .el-table td {
  border: none;
  text-align: center;
} */
.tableHead >>> .el-table__row {
  background: #f7f7f7 !important;
}
.tableHead >>> .el-table__empty-block {
  display: none;
}
.SelectListCell>>> .el-table th {
  padding: 0.08rem!important;
  color:#666;
}
.SelectListCell >>> .el-table__body {
  width: 100% !important;
}
.SelectListCell >>> .el-table__header {
  width: 100% !important;
}
.SelectListCell >>> .el-table {
  font-size: 0.13rem;
  text-align: center;
}
.SelectListCell >>> .el-table th {
  text-align: center;
  background: #f7f7f7;
}
.SelectListCell >>> .el-table td {
  border: none;
  text-align: center;
}
.SelectListCell >>> .el-table__row {
  background: #f7f7f7 !important;
}
.SelectListCell >>> .el-table__empty-block {
  display: none;
}
.proSLAInfoCell {
  width: 100%;
  background-color: white;
}
.proSLAInfoCell .proSLAInfoTit {
  position: relative;
  line-height: 0.35rem;
  margin-left: 0.15rem;
  font-size: 0.14rem;
  color: #2698d6;
}
.proSLAInfoCell .proSLAInfoTit::before {
  position: absolute;
  top: 0.1rem;
  left: -0.1rem;
  width: 0.05rem;
  height: 0.15rem;
  content: "";
  background: #2698d6;
}
/* .el-table--border::after,
.el-table--group::after,
.el-table::before {
  height: 0;
} */
</style>