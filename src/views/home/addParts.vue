<!--新增备件填写-->
<template>
  <div class="addPartsView">
      <div class="content">
          <el-form ref="form" :model="form" label-width="1rem">
            <el-form-item label="备件来源">
              <el-radio-group v-model="form.partsSource" disabled>
                <el-radio label="1">供货件</el-radio>
                <el-radio label="2">换下件</el-radio>
              </el-radio-group>
            </el-form-item>
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
              <el-select v-model="form.useStatus" placeholder="选择使用情况" clearable>
                <el-option v-for="use in useStatusList" :label="use.useStatusName" :value="use.useStatusId" :key="use.id"></el-option>
              </el-select>
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
            <el-form-item class="submitCell">
              <el-button @click="onCancel">取消</el-button>
              <el-button class="submitBtn" type="primary" @click="onSubmit('form')">提交</el-button>
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
      useStatus: "",
      useStatusList: [
        {"useStatusName": "已使用件", "useStatusId": "1"},
        {"useStatusName": "未使用件", "useStatusId": "2"},
        {"useStatusName": "坏件", "useStatusId": "3"},
        {"useStatusName": "DOA不可用", "useStatusId": "4"},
        {"useStatusName": "未到场", "useStatusId": "5"},
      ],
    };
  },
  created (){

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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = "&PARTS_SOURCE="+this.form.partsSource+"&PN_FRU="+this.form.pnFru+"&SN="+this.form.SN+"&TYPE="+this.form.partsType+"&USE_STATUS="+this.form.useStatus+"&USE_STATUS_REMARK="+this.form.useStatusRemark+"&IF_PACKAGE="+this.form.ifPackage+"&IF_TAKEAWAY="+this.form.ifTakeaway+"&IS_RECYCLE="+this.form.isRecycle+"&UPDATE_DATE="+this.getCurrentTime(1)[0];
          fetch.get("?action=/parts/updatePartsGathering"+params,"").then(res=>{
            console.log("params", params)
            console.log(res)
            loading.close();
            if(res.STATUSCODE=="0"){
              this.$message({
                message:'提交成功',
                type: 'success',
                center: true,
                customClass: 'msgdefine'
              });

                let nowcaseid = vm.form.caseId;
                setTimeout(function(){vm.$router.push({ name: "sparePartsSortOut",query:{caseId:nowcaseid}})},1000);
                let data = {
                  popBg: false
                }
                this.$emit('change', data)
            }
            else{
              this.$message({
                message:res.MESSAGE+"发生错误",
                type: 'error',
                center: true,
                customClass: 'msgdefine'
              });
              let data = {
                popBg: false
              }
              this.$emit('change', data)
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
    onCancel () {
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
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
  .content{width:100%; margin-top: 0.5rem;background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333; padding: 0px 0px}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
   

  .content >>> .submitCell{position: relative}
  .content >>> .submitCell .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .content >>> .submitCell .el-button:hover{background: #ffffff;}
  .content >>> .submitCell .searchBtnCell:hover{background: #2698d6;}
  .content >>> .submitCell .el-form-item__content{margin: 0!important; display: flex;}
  .content >>> .submitCell .submitBtn{background: #2698d6; color: #ffffff;}

  /* .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.41rem; position: relative; bottom: 0;} */

  .secondBoundaries{padding: 0 20px 0;margin: 20px 0;line-height: 10px;z-index: 999}
</style>