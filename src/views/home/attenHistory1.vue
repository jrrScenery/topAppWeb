<template>
  <div class="makeUpAttView">
    <header-atten-detail :title="attenHistoryTit" :searchType="searchType" :queryData="searchData" @searchNotice="searchNotice"></header-atten-detail>
    <div style="height:0.45rem"></div>
    <div class="makeUpAttContent">
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
import headerAttenDetail from "../header/headerAttenDetail";
import fetch from "../../utils/ajax";
import transfrom from "@/utils/dateTransform.js";
export default {
  name: "attenHistory",
  components: {
    headerAttenDetail
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
      searchData: {
        wholeMonth: "0", //type=0代办查看全月，type=1代表查看缺勤
        month: this.$route.query.dateStr
      }
    };
  },
  created() {
    console.log("bbbbbbbb",this.searchData);
    console.log(this.searchData.month.length);
    if(this.searchData.month==""){
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
      this.searchData.month = year + "-" + month;
    }
    if(this.searchData.month.length>7){
      this.searchData.month = this.searchData.month.slice(0,7);
    }
    this.leaveType = transfrom.getLeaveType().leaveType;
    this.getAttenInfo();
  },
  methods: { 
    getAttenInfo() {
      this.processStatus = transfrom.getLeaveType().processStatus;
      let params = {
        wholeMonth: this.searchData.wholeMonth,
        month: this.searchData.month,
        staffName:this.$route.query.staffName,
        itcode:this.$route.query.itcode
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
    searchNotice(formData) {
      this.isSearch = true;
      this.searchData = formData;
      this.getAttenInfo();
    }
  }
};
</script>
<style scoped>
.makeUpAttView {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
}
.makeUpAttContent {
  font-size: 0.12rem;
  text-align: center;
  margin-bottom: 0.6rem;
}
.makeUpAttContent >>> .el-table--border::after,
.el-table--group::after,
.el-table::before {
  z-index: -1;
}
.makeUpAttContent >>> td {
  padding: 0rem;
}
.makeUpAttContent >>> .leaveTypeSelect {
  width: 80%;
  margin: 0.01rem 0;
}
.makeUpAttContent >>> .leaveTypeSelect .el-input__icon {
  width: 10px;
  height: 0.3rem;
}
.makeUpAttContent >>> .leaveTypeSelect .el-input__inner {
  text-align: center;
  padding-left: 0.05rem;
  padding-right: 0.1rem;
  height: 0.3rem;
}
.makeUpAttContent >>> .timePicker {
  width: 80%;
}
.makeUpAttContent >>> .timePicker .el-input__inner {
  padding-left: 0.05rem;
  text-align: center;
  padding-right: 0;
}
.makeUpAttContent >>> .el-table .cell,
.el-table th {
  padding: 0;
  text-align: center;
}
.makeUpAttContent >>> .el-textarea__inner {
  padding: 0.05rem;
  height: 100%;
}

.makeUpAttView >>> .el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.submitBtn >>> .el-form-item__content {
  margin: 0 !important;
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
.makeUpAttContent >>> .norecord {
  text-align: center;
  margin-top: 0.3rem;
  color: #999999;
}
</style>