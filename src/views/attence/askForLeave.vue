<template>
  <div class="askForLeaveView">
    <header-last :title="askForLeaveTit"></header-last>
    <div style="height:0.45rem"></div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="项目名称" prop="name" label-width="0.8rem" required>
        <el-select v-model="ruleForm.name" placeholder="请选择项目名称" class="selectItem">
          <el-option
            v-for="item in projectArr"
            :key="item.PROJECT_ID"
            :label="item.PROJECT_NAME"
            :value="item.PROJECT_ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假类型" prop="region" label-width="0.8rem" required>
        <el-select v-model="ruleForm.region" placeholder="请选择请假类型" class="selectItem">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" required label-width="0.8rem" style="time">
        <el-col :span="11">
          <el-form-item prop="startDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.startDate"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="startTime">
            <el-time-picker
              placeholder="选择时间"
              format="HH:mm"
              value-format="HH:mm"
              v-model="ruleForm.startTime"
              style="width:90%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" required label-width="0.8rem" style="time">
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.endDate"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions1"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endTime">
            <el-time-picker
              placeholder="选择时间"
              format="HH:mm"
              value-format="HH:mm"
              v-model="ruleForm.endTime"
              style="width:90%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="请假事由" prop="desc" label-width="0.8rem" required>
        <el-input type="textarea" placeholder="请输入请假事由" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="选择图片" label-width="0.8rem">
        <img id="showpic" :src="uploadres" ref="showpic" class="imgout" @click="takePhoto" />
      </el-form-item>
      <input id="docId" type="hidden" v-model="ruleForm.docId" />
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
import transfrom from "@/utils/dateTransform.js"
export default {
  name: "askForLeave",
  components: {
    headerLast
  },
  data() {
    return {
      isMax: false,
      askForLeaveTit: "请假申请",
      ruleForm: {
        name: "",
        region: 1,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        desc: "",
        docId: ""
      },
      dialogVisible: false,
      disabled: false,
      pickerOptions0: {
        disabledDate: time => {
          // if (this.ruleForm.endDate) {
          //   return (
          //     time.getTime() > new Date(this.ruleForm.endDate).getTime() ||
          //     time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //   ); //不能用&&嗷
          // } 
          // else {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
          // }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.ruleForm.startDate) {
            return (
              time.getTime() <
              new Date(this.ruleForm.startDate).getTime() - 24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
          }
        }
      },
      options: [
        {value: 0,label: "请选择"},
        {value: 1,label: "调休"},
        {value: 2,label: "病假"},
        {value: 3,label: "事假"},
        {value: 4,label: "年假"},
        {value: 5,label: "婚假"},
        {value: 6,label: "产假"},
        {value: 7,label: "哺乳假"},
        {value: 8,label: "丧假"},
        {value: 9,label: "产检假"},
        {value: 10,label: "陪产假"}
      ],
      projectArr: [],
      uploadres: require("../../assets/images/takephoto.png")
    };
  },
  created() {
    var date = new Date();
    var m = date.getMonth() + 1; //默认显示当前月
    var d = date.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    var dd = date.getFullYear() + "-" + m + "-" + d;
    this.ruleForm.startDate = dd;
    this.ruleForm.endDate = dd;
    fetch.get("?action=/attendance/queryItfProjectList", {}).then(res => {
      console.log("queryPunchList", res);
      if (res.STATUSCODE == "1") {
        this.projectArr = res.data;
        if(res.data.length!=0){
          this.ruleForm.startTime=res.data[0].START_TIME;
          this.ruleForm.endTime=res.data[0].END_TIME;
        }
      } else {
        this.$message({
          message: res.MESSAGE + "发生错误",
          type: "error",
          center: true,
          duration: 1000,
          customClass: "msgdefine"
        });
      }
    });
  },
  mounted() {
    window.photoResult = this.getPhotoUrl;
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.name == "") {
        this.$message({
          message: "请选择项目编号",
          type: "warning",
          center: true,
          duration: 1000,
          customClass: "msgdefine"
        });
      } else {
        if (this.ruleForm.region == "") {
          this.$message({
            message: "请选择请假类型",
            type: "warning",
            center: true,
            duration: 1000,
            customClass: "msgdefine"
          });
        } else {
          if (
            this.ruleForm.startDate == "" ||
            this.ruleForm.endDate == "" ||
            this.ruleForm.startTime == "" ||
            this.ruleForm.endTime == ""
          ) {
            this.$message({
              message: "请完善请假时间",
              type: "warning",
              center: true,
              duration: 2000,
              customClass: "msgdefine"
            });
          } else {
            if (this.ruleForm.desc == "") {
              this.$message({
                message: "请填写请假事由",
                type: "warning",
                center: true,
                duration: 2000,
                customClass: "msgdefine"
              });
            } else {
              var date = new Date();
              var m = date.getMonth() + 1;
              var d = date.getDate();
              if (m < 10) m = "0" + m;
              if (d < 10) d = "0" + d;
              var dd = date.getFullYear() + "-" + m + "-" + d;
              var hour = date.getHours();
              var minute = date.getMinutes();
              if (hour < 10) hour = "0" + hour;
              if (minute < 10) minute = "0" + minute;
              var time = hour + ":" + minute;
              if (this.ruleForm.startDate == dd && this.ruleForm.startTime < time) {
                this.$message({
                  message: "请假开始时间不得早于当前时间",
                  type: "warning",
                  center: true,
                  duration: 2000,
                  customClass: "msgdefine"
                });
              } else {
                if (this.ruleForm.startTime >= this.ruleForm.endTime) {
                  this.$message({
                    message: "开始时间必须小于结束时间",
                    type: "warning",
                    center: true,
                    duration: 2000,
                    customClass: "msgdefine"
                  });
                  // }
                }else if(this.ruleForm.startDate > this.ruleForm.endDate){
                  this.$message({
                    message: "开始日期必须小于结束日期",
                    type: "warning",
                    center: true,
                    duration: 2000,
                    customClass: "msgdefine"
                  });
                } else {
                  const loading = this.$loading({
                    lock: true,
                    text: "提交中...",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.3)"
                  });
                  console.log(this.ruleForm);
                  let dataJson = {};
                  dataJson.projectId = this.ruleForm.name;
                  dataJson.beginTime = this.ruleForm.startDate;
                  dataJson.beginMin = this.ruleForm.startTime;
                  dataJson.endTime = this.ruleForm.endDate;
                  dataJson.endMin = this.ruleForm.endTime;
                  dataJson.leaveType = transfrom.getLeaveType().myabsence[this.ruleForm.region];
                  dataJson.leaveDescribe = this.ruleForm.desc;
                  dataJson.file = this.ruleForm.docId;
                  let data = {};
                  data.data = JSON.stringify(dataJson);
                  fetch
                    .questionPost("?action=/attendance/submitLeave", data)
                    .then(res => {
                      console.log("res", res);
                      loading.close();
                      if (res.STATUSCODE == "1") {
                        this.$message({
                          message: "提交成功",
                          type: "success",
                          center: true,
                          duration: 1000,
                          customClass: "msgdefine"
                        });
                      } else {
                        this.$message({
                          message: res.MESSAGE + "发生错误",
                          type: "error",
                          center: true,
                          duration: 2000,
                          customClass: "msgdefine"
                        });
                      }
                    });
                }
              }
            }
          }
        }
      }
    },
    takePhoto: function() {
      let ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        var info = { action: "takePhoto" };
        window.webkit.messageHandlers.ioshandle.postMessage({ body: info });
      } else if (/(Android)/i.test(ua) && /mobile/i.test(ua)) {
        var value = "{action:takePhoto}";
        android.getClient(value);
      }
    },
    getPhotoUrl: function(photodata) {
      let loading = this.$loading({
        lock: true,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.3)"
      });
      var data = new FormData();
      data.append("FILETYPE", "jpg");
      // data.append("FILE",'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==')
      data.append("FILE", photodata);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      fetch.post("?action=upload", data, config).then(res => {
        console.log("upload", res);
        if (res["STATUSCODE"] == "0") {
          this.ruleForm.docId = res.data.docId;
          this.$refs.showpic.src = photodata;
        } else {
          this.$toast(res.MESSAGE);
        }
        loading.close();
      });
    }
  },
  beforeDestroy() {
    window.photoResult = null;
  }
};
</script>
<style scoped>
.askForLeaveView {
  width: 100%;
  overflow: scroll;
  font-size: 0.12rem;
  margin: 0.05rem 0.05rem;
}
.demo-ruleForm{
  margin-left:0.1rem;
}
.askForLeaveView >>> .el-form-item{margin-left:0rem!important;}
.askForLeaveView .el-input--prefix >>> .el-input__inner {
  padding-left: 0.25rem;
}
.askForLeaveView .el-input--suffix >>> .el-input__inner {
  padding-right: 0rem;
}
.askForLeaveView .el-col-2 {
  width: 0rem;
}
.askForLeaveView .el-input__icon {
  width: 0.2rem;
}
.askForLeaveView >>> .el-form-item {
  margin-bottom: 0.05rem;
  margin-left: 0.1rem;
}
.askForLeaveView >>> .selectItem {
  width: 88%;
}
.askForLeaveView >>> .el-textarea__inner {
  width: 88%;
}
.submitBtn {
  width: 100%;
  border: 0.01rem solid #2698d6;
  background: #2698d6;
  border-radius: 0;
  font-size: 0.16rem;
  color: #ffffff;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
.askForLeaveView >>> .imgout img {
  height: 0.78rem;
  width: auto;
  margin: 0 auto;
  max-width: 0.78rem;
}
.askForLeaveView >>> .imgout {
  border: 1px solid #ccc;
  height: 0.8rem;
  width: 0.86rem;
  margin-left: -0.6rem;
  margin-top: 0.5rem;
  padding:0.1rem;
}
</style>