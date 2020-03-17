<template>
  <div class="naturalDayView">
    <div class="naturalDayContent">
        <el-form ref="form" :model="form" label-width="65px" style="dispaly:flex">
            <el-form-item label="查询类型" label-width="0.8rem">
                <el-radio-group v-model="form.wholeMonth" size="small">
                    <el-radio-button v-for="item in Type" :label="item.value" :key="item.id">{{item.name}}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="查询月份" label-width="0.8rem" class="searchBtn">
                <el-date-picker type="month" v-model="form.month" clearable placeholder="请选择" style="width: 40%;" value-format="yyyy-MM">
                </el-date-picker>
                <el-button class="searchBtnCell" @click="onSearch" >查询</el-button>
            </el-form-item>
        </el-form>
        <div v-if="tableData.length!=0">
          <el-table :data="tableData" border current-row-key style="height: 100%;font-size:0.12rem">
            <el-table-column label="打卡时间" min-width="25%">
              <template slot-scope="scope">
                <div>{{ scope.row.PUNCH_DATE }}</div>
                <div>{{ scope.row.BEGIN_TIME }}-{{scope.row.END_TIME}}</div>
              </template>
            </el-table-column>
            <el-table-column label="请假" min-width="30%">
              <template slot-scope="scope">
                <div>{{leaveType[scope.row.LEAVE_TYPE]}}</div>
                <div>{{scope.row.ABS_BEGIN_TIME}}-{{scope.row.ABS_END_TIME}}</div>
                <!-- <div></div> -->
              </template>
            </el-table-column>
            <el-table-column label="说明" min-width="25%">
              <template slot-scope="scope">                
                <div>{{ scope.row.REASON}}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" min-width="15%" class="statusColumn">
              <template slot-scope="scope">
                  <div>
                    <span>{{ processStatus[scope.row.PROCESS_STATUS]}}</span>
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="norecord" v-else>暂无考勤记录</div>
    </div>
  </div>
</template>
<script>
// import headerAttenDetail from "../header/headerAttenDetail";
import fetch from "../../utils/ajax";
import transfrom from "@/utils/dateTransform.js";
export default {
  name: "attenHistory",
  components: {
    // headerAttenDetail
  },
  data() {
    return {
      attenHistoryTit: "考勤历史",
      searchType: "attenHistory",
      tableData: [],
      leaveType:[],
      processStatus: [], //{0:"未提交"},{1:"审批中"},{2:"已审批"},{3:"修改"},{4:"关闭"}
      isSearch: false,
      pickerOptions: {
        start: "09:00",
        step: "00:00",
        end: "18:00"
      },
      form: {
        wholeMonth: "0",
        month: this.$route.query.dateStr
      },
      searchData: {
        wholeMonth: "0", //type=0代办查看全月，type=1代表查看缺勤
        month: this.$route.query.dateStr
      },
      Type: [
        { name: "全月", value: "0", id: 0 },
        { name: "缺勤", value: "1", id: 1 }
      ],
    };
  },
  created() {
    console.log("bbbbbbbb",this.searchData);
    console.log(this.searchData.month.length);
    if(this.form.month==""){
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
      this.form.month = year + "-" + month;
    }
    if(this.form.month.length>7){
      this.form.month = this.form.month.slice(0,7);
    }
    this.leaveType = transfrom.getLeaveType().leaveType;
    this.getAttenInfo();
  },
  methods: { 
    getAttenInfo() {
      this.processStatus = transfrom.getLeaveType().processStatus;
      let params = {
        wholeMonth: this.form.wholeMonth,
        month: this.form.month,
        staffName:this.$route.query.staffName,
        itcode:this.$route.query.itcode,
        staffId:this.$route.query.staffId,
        type:2
      };
      fetch.get("?action=/attendance/queryAttendanceList", params).then(res => {
        console.log("queryAttendanceList", res);
        if (res.STATUSCODE === "1") {
          this.tableData = res.data;
        } else {
          this.$message({
            message: res.MESSAGE,
            type: "error",
            center: true,
            duration: 2000,
            customClass: "msgdefine"
          });
        }
      });
    },
    onSearch(){
        this.getAttenInfo();
    }
  }
};
</script>
<style scoped>
.naturalDayView {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
}
.naturalDayContent {
  font-size: 0.12rem;
  text-align: left;
  margin-bottom: 0.6rem;
}
.naturalDayContent >>> .el-table--border::after,
.el-table--group::after,
.el-table::before {
  z-index: -1;
}
.naturalDayContent >>> td {
  padding: 0rem;
}
/* .naturalDayContent >>> .timePicker {
  width: 80%;
}
.naturalDayContent >>> .timePicker .el-input__inner {
  padding-left: 0.05rem;
  text-align: center;
  padding-right: 0;
} */
.naturalDayContent >>> .el-table .cell,
.el-table th {
  padding: 0;
  text-align: center;
}
/* .naturalDayContent >>> .el-textarea__inner {
  padding: 0.05rem;
  height: 100%;
} */

.naturalDayView >>> .el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.naturalDayView .el-form-item{margin-bottom: 0.08rem}
.submitBtn >>> .el-form-item__content {
  margin: 0 !important;
  padding-left: 0
}
.submitBtn >>> .el-form-item__content .el-button {
  width: 100%;
  border: 0.01rem solid #2698d6;
  background: #2698d6;
  border-radius: 0;
  font-size: 0.16rem;
  color: #ffffff;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
}
.naturalDayContent >>> .norecord {
  text-align: center;
  margin-top: 0.3rem;
  color: #999999;
}
.naturalDayContent >>> .el-button{margin-left: 0.2rem}
.naturalDayContent >>> .searchBtn .el-button:hover {
  background: #ffffff;
}
.naturalDayContent >>> .searchBtn .searchBtnCell:hover {
  background: #2698d6;
}
.naturalDayContent >>> .searchBtn .el-form-item__content {
  margin: 0 !important;
  display: flex;
}
.naturalDayContent >>> .searchBtn .searchBtnCell {
  background: #2698d6;
  color: #ffffff;
}
</style>