<!--新增备件填写-->
<template>
  <div class="addPartsView">
    <header-last :title="declareTitle"></header-last>
    <div style="height: 0.45rem;"></div>
      <div class="content">
          <el-form ref="form" :model="form" label-width="1rem">
            <el-form-item label="备件来源">
              <!-- <el-input v-model="form.creatorRolename" class="bInput"></el-input> -->
              <el-radio-group v-model="form.partsSource" disabled>
                <el-radio label="1">供货件</el-radio>
                <el-radio label="2">换下件</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <hr class="secondBoundaries"></hr> -->
            <el-form-item label="PN/FRU">
              <el-input v-model="form.pnFru" placeholder="请输入PN/FRU" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="序列号">
              <el-input v-model="form.SN" placeholder="请输入序列号" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="备件类型">
              <el-select v-model="form.partsType" placeholder="请选择备件类型" clearable>
                <el-option v-for="item in partsTypeList" :label="item.partsTypeName" :value="item.partsTypeId" :key="item.id"></el-option>
              </el-select>
              <!-- <el-input v-model="form.standardWorkload" class="bInput"></el-input> -->
            </el-form-item>
            <el-form-item label="*是否有包装">
              <el-radio-group v-model="form.ifPackage">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*是否已带走">
              <el-radio-group v-model="form.ifTakeaway">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*使用情况">
              <el-radio-group v-model="form.useStatus" disabled>
                <el-radio label="1">已使用件</el-radio>
                <el-radio label="2">未使用件</el-radio>
                <el-radio label="3">坏件</el-radio>
                <el-radio label="4">DOA不可用</el-radio>
                <el-radio label="5">未到场</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*能否回收">
              <el-radio-group v-model="form.isRecycle">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="回收件说明">
              <el-input placeholder="请输入回收件说明" v-model="form.useStatusRemark" class="bInput"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        
        </div>

  </div>
</template>

<script>
import headerLast from "../header/headerLast"
import fetch from "../../utils/ajax.js"


export default {
  name: "addParts",

  components: {
      headerLast,
  },
  // props: ["queryData"],

  data () {
    return {
      declareTitle:"新增备件",
      form: {
        partsSource: "2",
        pnFru: "",
        SN: "",
        ifPackage: "",
        ifTakeaway: "",
        useStatus: "3",
        isRecycle: "",
        useStatusRemark: "",
        partsType: "",
        caseId: this.$route.query.caseId,
      },
      partsTypeList: [],
    };
  },
  created (){
    // this.form.expectStart = this.$route.query.expectStart;
    // this.form.expectEnd = this.$route.query.expectEnd;
    // this.form.creatorRolename = this.$route.query.creatorRolename;
    // this.form.standardWorkload = this.$route.query.standardWorkload;
    // this.form.wayWorkload = this.$route.query.wayWorkload;
    // this.form.caseId = this.$route.query.caseId;
    // this.form.workId = this.$route.query.workId;
    fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
      this.partsTypeList = res.DATA;
      console.log(this.partsTypeList)
    });
    
  },
  methods: {
    onSubmit (formName) {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      console.log("FFFFFFFFFFFFFFF", vm.form)
      console.log("EEEEEEEEEEEE", this.$refs[formName].validate)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = "&PARTS_SOURCE="+this.form.partsSource+"&PN_FRU="+this.form.pnFru+"&SN="+this.form.SN+"&TYPE="+this.form.partsType+"&USE_STATUS="+this.form.useStatus+"&USE_STATUS_REMARK="+this.form.useStatusRemark+"&IF_PACKAGE="+this.form.ifPackage+"&IF_TAKEAWAY="+this.form.ifTakeaway+"&IS_RECYCLE="+this.form.isRecycle+"&UPDATE_DATE="+this.getCurrentTime(1)[0];
          fetch.get("?action=/parts/updatePartsGathering"+params,"").then(res=>{
              console.log("VVVVVVVVV", res)
              loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine'
                });

                  let nowcaseid = vm.form.caseId;
                  console.log("ZAZAZAZAZA", nowcaseid);
                  setTimeout(function(){vm.$router.push({ name: "sparePartsSortOut",query:{caseId:nowcaseid}})},1000);
              }
              else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
              }
              
          });
        } else {
          this.$message({
                  message:"请正确填写",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
          return false
        }
      })
    },
    //   let form = this.form;
    //   fetch.get("?action=/work/DeclareWorkload"+"&START_TIME="+form.expectStart+"&END_TIME="+form.expectEnd+"&CASE_ID="+form.caseId+"&WORK_ID="+form.workId+"&NORMAL_WORKLOAD="+form.standardWorkload+"&EXTRA_WORKLOAD="+form.wayWorkload,{}).then(res=>{
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaa", res)
    //   })
      
    // },
    noKeyword () {
      document.activeElement.blur()
    },

    standardDate(join,...num){
      let arr = [];
      num.forEach((item)=>{
        item.toString().length<2?arr.push('0'+item):arr.push(item);
      });
      return arr.join('-')
    },
    getFormerTime (n) {
      let nowYear = new Date().getFullYear() - 1, yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      return yearArr
    },
    getCurrentTime (n) {
      let nowYear = new Date().getFullYear(), yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    }
  }


}
</script>

<style scoped>
  .addPartsView{width:100%;background: #ffffff;}
  .content{margin-top: 0.05rem;background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333; padding: 0px 0px}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
   
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}

  .secondBoundaries{padding: 0 20px 0;margin: 20px 0;line-height: 10px;z-index: 999}
</style>