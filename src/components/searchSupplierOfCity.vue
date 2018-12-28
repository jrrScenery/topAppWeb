<!--任务列表查询-->
<template>
  <div class="searchSupplierOfCityView">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="供应种类">
        <el-select v-model="form.kindName" placeholder="请选择供应种类" multiple>
          <el-option v-for="item in kindNameList" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应属性">
        <el-select v-model="form.attName" placeholder="请选择供应属性" multiple>
          <el-option v-for="item in attNameList" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作属性">
        <el-select v-model="form.cattName" placeholder="请选择合作属性" multiple>
          <el-option v-for="item in cattNameList" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
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
  name: 'searchSupplierOfCity',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        kindName: '',
        attName: '',
        cattName: ''
      },
      kindNameList: [],
      attNameList:[],
      cattNameList:[]
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=getDict&type=NT_CASE_LEVEL","").then(res=>{
      console.log(res.data);
      // this.caseLevelArr = res.data;
    });
    this.form.kindName = this.queryData.kindName;
    this.form.attName = this.queryData.attName;
    this.form.cattName = this.queryData.cattName;
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
  .searchSupplierOfCityView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchSupplierOfCityView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchSupplierOfCityView >>> .el-select{width: 80%;}
  .searchSupplierOfCityView >>> .el-input__inner{padding: 0 0.05rem}
  .searchSupplierOfCityView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchSupplierOfCityView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchSupplierOfCityView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchSupplierOfCityView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchSupplierOfCityView >>> .bInput .el-input__inner{width: 80%;}
  .searchSupplierOfCityView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchSupplierOfCityView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchSupplierOfCityView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchSupplierOfCityView >>> .el-input__prefix{display: none;}
  .searchSupplierOfCityView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchSupplierOfCityView >>> .el-col-2{text-align: center;}
  .searchSupplierOfCityView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchSupplierOfCityView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchSupplierOfCityView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchSupplierOfCityView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchSupplierOfCityView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchSupplierOfCityView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>