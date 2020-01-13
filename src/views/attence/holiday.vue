<template>
  <div class="viewHolidaysView">
    <!-- <header-atten-detail2 :title="viewHolidaysTit"></header-atten-detail2> -->
    <header-atten-detail
      :title="viewHolidaysTit"
      :searchType="searchType"
      :queryData="searchData"
      @searchNotice="searchNotice"
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
            <span class="bolder"><router-link :to="{name:'holidayDetail',query:{name:item.name}}">{{item.holiday}}</router-link></span>
            <span class="bolder"><router-link :to="{name:'holidayDetail2',query:{name:item.name}}">{{item.holiday2}}</router-link></span>
          </div>
    <!-- <div v-for="items in tableData" :key="items.name">
            <span style="width:34%">{{items.name}}</span>
            <router-link :to="{name:'holidayDetail'}"><span style="width:33%">{{items.holiday}}</span></router-link>
            <span style="width:33%">{{items.holiday2}}</span>
    </div>-->
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import headerAttenDetail from "../header/headerAttenDetail";
// import global_ from "../../components/Global";
// import headerBaseEight from "../header/headerBaseEight";
// import loadingtmp from "@/components/load/loading";
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
              holiday: "3",
              holiday2: "0.2"
            },
            {
              name: "罗儿",
              holiday: "2",
              holiday2: "3"
            }
          ]
        },
        {
          itemName: "去哪儿网外包框架项目",
          detail: [
            {
              name: "文静",
              holiday: "1",
              holiday2: "0.5"
            }
          ]
        }
      ],
      searchType: "holiday",
      // tableData: [
      //   {
      //     name: "程文静",
      //     holiday: "2",
      //     holiday2: "0.3"
      //   },
      //   {
      //     name: "罗儿",
      //     holiday: "1.5",
      //     holiday2: "2"
      //   },
      //   {
      //     name: "小罗",
      //     holiday: "3.5",
      //     holiday2: "3"
      //   },
      //   {
      //     name: "萝莉",
      //     holiday: "4",
      //     holiday2: "2"
      //   }
      // ],
    };
  },

  methods: {
    // searchNotice(formData) {
    //   console.log("formData", formData);
    //   this.searchData = formData;
    //   this.getAttenInfo();
    // }
  },
  created() {}
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
/* .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 20px!important;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
} */
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
.el-table >>> td,
.el-table >>> th {
  padding: 0.04rem;
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
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  height: 0;
}
.el-table >>> thead {
  color: #606266;
}
</style>