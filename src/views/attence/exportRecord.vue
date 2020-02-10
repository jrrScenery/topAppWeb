<template>
  <div class="exportRecordView">
    <header-last :title="exportRecordTit"></header-last>
    <div style="height:0.45rem"></div>
    <!-- <div style="background:white">
      <img src="../../assets/images/export.png" class="img" @click="centerDialogVisible = true" />
    </div> -->
    <div style="text-align:center;margin-top:0.1rem" v-for="items in obj" :key="items.id" >
          <div v-if="items.arr.length!=0">
              <ul class="ul_workBench">
                  <template v-for="item in items.arr">
                      <li class="li_workBench" :key="item.id" @click="centerDialogVisible = true">
                          <img :src="item.imgSrc" alt="">
                          <span>{{item.text}}</span>
                      </li>
                  </template>
              </ul>
          </div>
      </div>    

    <el-dialog title="导出考勤报表" :visible.sync="centerDialogVisible" center>
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="project" :label-width="formLabelWidth">
          <el-select v-model="form.project" placeholder="请选择项目名称" filterable>
            <el-option
            v-for="item in projectArr"
            :key="item.PROJECT_ID"
            :label="item.PROJECT_NAME"
            :value="item.PROJECT_ID"
            style="max-width: 300px"
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="month"
            placeholder="选择月"
            :picker-options="pickerOptions0"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">考勤汇总</el-radio>
            <el-radio :label="2">考勤明细</el-radio>
            <el-radio :label="3">打卡明细</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
export default {
  name: "exportRecord",
  components: {
    headerLast
  },
  data() {
    return {
      exportRecordTit: "导出报表",
      dialogFormVisible: false,
      centerDialogVisible: false,
      form: {
        email: "",
        project: "",
        date: "",
        radio: 1
      },
      pickerOptions0: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      formLabelWidth: "0.5rem",
      projectArr:[],
      obj:[
        {arr:[]},
      ]
    };
  },
  created() {
    this.getObj();
    var date = new Date();
    var m = date.getMonth() + 1; //默认显示当前月
    if (m < 10) m = "0" + m;
    var dd = date.getFullYear() + "-" + m;
    this.form.date = dd;
    fetch.get("?action=/attendance/getExportProList", {}).then(res => {
      console.log("queryPunchList", res);
      if (res.STATUSCODE == "1") {
        this.projectArr = res.data;
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
  methods: {
    getObj(){
      this.obj[0].arr[0]={imgSrc: require('@/assets/images/export.png'), text: '考勤相关报表', display:false};
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    submit() {
      if (this.form.email == "") {
        this.$message({
          message: "请填写邮箱信息",
          type: "warning",
          center: true,
          customClass: "msgdefine"
        });
      } else {
        let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (!myReg.test(this.form.email)) {
          this.$message({
            message: "请检查邮箱格式",
            type: "warning",
            center: true,
            customClass: "msgdefine"
          });
        } else {
          // if (this.form.project == "") {
          //   this.$message({
          //     message: "请选择项目",
          //     type: "warning",
          //     center: true,
          //     customClass: "msgdefine"
          //   });
          // }
          //  else {
            if (this.form.date == "") {
              this.$message({
                message: "请选择月份",
                type: "warning",
                center: true,
                customClass: "msgdefine"
              });
            } else {
              const loading = this.$loading({
                lock: true,
                text: "发送中...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.3)"
              });
              let params = {};
              params.email = this.form.email;
              params.projectId = this.form.project;
              params.month = this.form.date;
              params.type = this.form.radio;
              fetch
                .questionPost("?action=/attendance/exportExl", params)
                .then(res => {
                  console.log("res", res);
                  loading.close();
                  if (res.STATUSCODE == "1") {
                    this.$message({
                      message: "发送成功",
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
                      duration: 1000,
                      customClass: "msgdefine"
                    });
                  }
                });
            }
          // }
        }
      }
    }
  }
};
</script>
<style scoped>
.exportRecordView {
  width: 100%;
  overflow: scroll;
  position: relative;
  font-size: 0.12rem;
  margin: 0.05rem 0;
}
.exportRecordView .ul_workBench{display: flex;flex-wrap: wrap;padding: 0.15rem 0.1rem;margin-top: 0.01rem;background: #ffffff;font-size: 0.15rem;height:100%}
.exportRecordView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
.exportRecordView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
.exportRecordView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
.ul_workBench img{ width: 0.3rem; height: 0.3rem; margin: auto;}
.demo-ruleForm {
  margin: 0 0;
}
.fy {
  text-align: center;
  margin-top: 0.1rem;
}
.export {
  background-color: #2698d6;
  color: white;
  /* padding: 0.07rem 0.12rem; */
  height: 0.4rem;
  font-size: 0.13rem;
  border-radius: 0.05rem;
  float: right;
  margin-right: 0.2rem;
}
.exportRecordView >>> .el-dialog {
  width: 90%;
}
.exportRecordView >>> .el-radio-group {
  line-height: 0.2rem;
}
.exportRecordView >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.exportRecordView >>> .img {
  width: 0.5rem;
  height: 0.6rem;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
}
.exportRecordView .el-radio + .el-radio {
  margin-left: 0;
}
.exportRecordView .el-radio-group {
  padding-top: 0.1rem;
}
.exportRecordView .el-select-dropdown__wrap{max-width: 200px}
</style>
<style>
.exportRecordView .el-dialog__body{padding: 0.1rem 0.05rem}
</style>