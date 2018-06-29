<!--事件详情搜索-->
<template>
  <div class="searchView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业">
          <el-option label="IT" value="shanghai"></el-option>
          <el-option label="医药" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件类型">
        <el-checkbox-group v-model="form.type" size="small">
          <el-checkbox-button label="故障" name="type"></el-checkbox-button>
          <el-checkbox-button label="RMA" name="type"></el-checkbox-button>
          <el-checkbox-button label="巡检" name="type"></el-checkbox-button>
          <el-checkbox-button label="咨询" name="type"></el-checkbox-button>
          <el-checkbox-button label="非故障技术支持" name="type"></el-checkbox-button>
        </el-checkbox-group>
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
      <el-form-item label="创建时间" style="margin-bottom: 0.3rem">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">～</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item class="searchBtn">
        <el-button>取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        startTime: '',
        endTime: ''
      }
    }
  },

  watch: {},

  created () {
  },

  methods: {
    onSearch () {
      console.log('search!')
    }
  }
}
</script>

<style scoped>
  .searchView{background: #ffffff; padding: 0.15rem 0.2rem; position: relative;}
  .searchView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchView >>> .el-select{width: 80%;}
  .searchView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchView >>> .el-checkbox-button__inner{border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #e0002a; background: #fef4f3; color: #e0002a; box-shadow: none;}
  .searchView >>> .bInput .el-input__inner{width: 80%;}
  .searchView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-select-dropdown__item.selected{color: #e0002a;}
  .searchView >>> .el-select-dropdown__item span{color: #e0002a!important;}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col-2{text-align: center;}
  .searchView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchView >>> .searchBtn .searchBtnCell{background: #e0002a; color: #ffffff;}
</style>
