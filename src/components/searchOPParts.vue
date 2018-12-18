<!--任务列表查询-->
<template>
  <div class="searchOPPartsView">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="供应商">
        <el-input v-model="form.projectNo" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.projectName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="实际支付日期">
        <el-input v-model="form.caseNo" class="bInput"></el-input>
      </el-form-item>
      
      <el-form-item class="searchBtn">
        <el-button @click="onCancel">取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import fetch from '../utils/ajax'
export default {
  name: 'searchPartsSupplierList',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        jobName: '',
        resourceType: '',
        projectDepartment: ''
      },
      caseLevelArr: []
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=getDict&type=NT_CASE_LEVEL","").then(res=>{
      console.log(res.data);
      this.caseLevelArr = res.data;
    });
    this.form.jobName = this.queryData.projectNo;
    this.form.resourceType = this.queryData.projectName;
    this.form.projectDepartment = this.queryData.caseNo;
  },

  methods: {
    onCancel () {
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    onSearch () {
      let form = this.form
      this.$emit('search', form)
      // console.log(this.form, '------------------')
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    }
  }
}
</script>

<style scoped>
  .searchOPPartsView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchOPPartsView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchOPPartsView >>> .el-select{width: 80%;}
  .searchOPPartsView >>> .el-input__inner{padding: 0 0.05rem}
  .searchOPPartsView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchOPPartsView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchOPPartsView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchOPPartsView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchOPPartsView >>> .bInput .el-input__inner{width: 80%;}
  .searchOPPartsView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchOPPartsView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchOPPartsView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchOPPartsView >>> .el-input__prefix{display: none;}
  .searchOPPartsView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchOPPartsView >>> .el-col-2{text-align: center;}
  .searchOPPartsView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchOPPartsView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchOPPartsView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchOPPartsView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchOPPartsView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchOPPartsView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>