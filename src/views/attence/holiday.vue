<template>
  <div class="viewHolidaysView">
    <header-atten-detail
      :title="viewHolidaysTit"
      :searchType="searchType"
    ></header-atten-detail>
    <div style="height:0.45rem"></div>
    <div class="SelectListCell">
      <el-table style="width: 100%">
        <el-table-column prop="name" label="姓名" width="34%" style="text-align:center"></el-table-column>
        <el-table-column prop="holiday" label="剩余年假" width="33%" style="text-align:center"></el-table-column>
        <el-table-column prop="holiday2" label="剩余调休假" width="33%" style="text-align:center"></el-table-column>
      </el-table>
    </div>
    <div class="SelectListCell">
      <div class="title">
        <div class="proSLAInfoCell" v-for="items in itemLists" :key="items.itemName">
          <div class="proSLAInfoTit">{{items.itemName}}</div>
          <div class="divTable" v-for="item in items.detail" :key="item.id" style="width:100%;background:#f7f7f7;">
            <span class="bolder">{{item.name}}</span>
            <span class="bolder">
              <router-link :to="{name:'holidayDetail',query:{name:item.name,id:'0'}}" style="color:#2698d6;text-decoration:underline">{{item.ngHoliday}}</router-link>
            </span>
            <span class="bolder">
              <router-link :to="{name:'holidayDetail',query:{name:item.name,id:'1'}}" style="color:#2698d6;text-decoration:underline">{{item.txHoliday}}</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerAttenDetail from "../header/headerAttenDetail";
import fetch from "../../utils/ajax";
export default {
  name: "holiday",
  components: {
    headerAttenDetail
  },
  data() {
    return {
      viewHolidaysTit: "查看年假/调休假",
      itemLists: [
        {
          itemName: "神州数码维保项目",
          detail: [
            {
              name: "程文静",
              ngHoliday: "3",
              txHoliday: "0.2"
            },
            {
              name: "罗儿",
              ngHoliday: "2",
              txHoliday: "3"
            }
          ]
        },
        {
          itemName: "去哪儿网外包框架项目",
          detail: [
            {
              name: "文静",
              ngHoliday: "1",
              txHoliday: "0.5"
            }
          ]
        }
      ],
      searchType: "holiday",
    };
  },

  methods: {
  },
  created() {
  }
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
  width: 33%;
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
  width: 33%;
  overflow: hidden;
  text-align: center;
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