<!--事件详情搜索&意见和投诉查询&我的事件、所有事件查询-->
<template>
  <div class="searchView">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业" multiple>
          <el-option v-for="item in industryType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户">
        <el-input v-model="form.customer" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.proName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="销售">
        <el-input v-model="form.sale" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="PM">
        <el-input v-model="form.PM" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="事件编号">
        <el-input v-model="form.eventNum" class="bInput"></el-input>
      </el-form-item> 
      <el-form-item label="关键词">
        <el-input v-model="form.keyWord" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="form.area" placeholder="请选择区域">
          <el-option v-for="item in areaArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关注原因">
        <!-- <el-input v-model="form.careReason" class="bInput"></el-input> -->
        <el-select v-model="form.careReason" placeholder="请选择关注原因">
          <el-option v-for="item in reasonArr" :label="item.name" :value="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="margin-bottom: 0.15rem">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">～</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
        </el-col>
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
  name: 'searchView',

  components: {

  },

  data () {
    return {
      form: {
        industry: '',
        type: [],
        customer: '',
        proName: '',
        sale: '',
        PM: '',
        eventNum: '',
        keyWord: '',
        startTime: '',
        endTime: '',
        area:'',
        careReason:''
      },
      industryType: [],
      Type: [],
      areaArr:[],
      reasonArr:[]
    }
  },

  watch: {},

  props: ['queryData'],

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
      // console.log(res.data);
      this.industryType = res.data;
      // console.log("this.industryType:",this.industryType)
    });

    fetch.get("?action=/system/getTopArea","").then(res=>{
      this.areaArr = res.data;
      console.log("this.areaArr:",this.areaArr)
    });
    fetch.get("?action=getDict&type=CASE_EMERGENCY_REASON","").then(res=>{
      this.reasonArr = res.data;
      console.log("this.reasonArr:",this.reasonArr)
    });

    this.form.industry = this.queryData.industry;
    this.form.customer = this.queryData.customer;
    this.form.proName = this.queryData.proName;
    this.form.sale = this.queryData.sale;
    this.form.PM = this.queryData.PM;
    this.form.eventNum = this.queryData.eventNum;
    this.form.keyWord = this.queryData.keyWord;
    this.form.area = this.queryData.area;
    this.form.careReason = this.queryData.careReason;
    // this.form.industry = this.queryData.industry;
    this.form.startTime = this.queryData.startTime;
    this.form.endTime = this.queryData.endTime;
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
  .searchView{background: #ffffff; padding: 0.1rem 0.2rem 0; position: relative;overflow: scroll;}
  .searchView >>> .el-form-item{margin-bottom: 0.01rem;}
  .searchView >>> .el-select{width: 80%;}
  .searchView >>> .el-input__inner{padding: 0 0.05rem}
  .searchView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchView >>> .bInput .el-input__inner{width: 80%;}
  .searchView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col-2{text-align: center;}
  .searchView >>> .searchBtn{position: relative; bottom: 0; left: 0; right: 0; height: 0.4rem;}
  .searchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>
