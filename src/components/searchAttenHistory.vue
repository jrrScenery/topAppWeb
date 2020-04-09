<template>
  <div class="searchMakeAttenView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="查询类型" style="position: relative" label-width="0.8rem">
        <template>
          <div style="position: absolute; top: 0.25rem; left: -0.65rem; color: #999999; font-size: 0.1rem"></div>
          <el-radio-group v-model="form.wholeMonth" size="small">
            <el-radio-button v-for="item in Type" :label="item.value" :key="item.id">{{item.name}}</el-radio-button>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="日期类型" style="position: relative" label-width="0.8rem">
        <template>
          <div style="position: absolute; top: 0.25rem; left: -0.65rem; color: #999999; font-size: 0.1rem"></div>
          <el-radio-group v-model="form.dateType" size="small">
            <el-radio-button v-for="item in dateType" :label="item.value" :key="item.id">{{item.name}}</el-radio-button>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="查询月份" label-width="0.8rem">
        <el-date-picker type="month" v-model="form.month" clearable placeholder="请选择" style="width: 80%;" value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="searchBtn">
        <el-button @click="onCancel">取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "searchMakeAttenView",
  components: {},
  props: ["queryData"],
  data() {
    return {
      form: {
        wholeMonth: "",
        month: "",
        dateType:''
      },
      Type: [
        { name: "全月", value: "0", id: 0 },
        { name: "缺勤", value: "1", id: 1 }
      ],
      dateType:[
        {name:"工作日", value:1, id:1},
        {name:"自然日", value:2, id:2}
      ],
      monthArr: [],
      startMonth:'',
      endMonth:''
    };
  },
  created() {
    console.log("aaaaaaaaaaa");
    this.form.wholeMonth = this.queryData.wholeMonth;
    this.form.month = this.queryData.month;
    this.form.dateType = this.queryData.dateType;
  },
  methods: {
    onCancel() {
      let data = {
        popBg: false
      };
      this.$emit("change", data);
    },
    onSearch() {
      let form = this.form;
      this.$emit("search", form);
      let data = {
        popBg: false
      };
      this.$emit("change", data);
    },
  }
};
</script>
<style scoped>
.searchMakeAttenView {
  background: #ffffff;
  padding: 0.15rem 0.2rem 0.5rem;
  position: relative;
}
.searchMakeAttenView >>> .el-form-item {
  margin-bottom: 0.1rem;
}
.searchMakeAttenView >>> .el-select {
  width: 70%;
}
.searchMakeAttenView >>> .el-form-item__label {
  text-align: left;
  color: #999999;
  font-size: 0.13rem;
}
/* .searchMakeAttenView >>> .el-radio-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem;} */
/* .searchMakeAttenView >>> .el-radio-button.is-checked .el-radio-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;} */
.searchMakeAttenView >>> .searchBtn {
  position: absolute;
  bottom: -0.15rem;
  left: 0;
  right: 0;
  height: 0.4rem;
}
.searchMakeAttenView >>> .searchBtn .el-button {
  width: 50%;
  border: none;
  padding: 0;
  margin: 0;
  height: 0.4rem;
  border-radius: 0;
  color: #999999;
  font-size: 0.13rem;
}
.searchMakeAttenView >>> .searchBtn .el-button:hover {
  background: #ffffff;
}
.searchMakeAttenView >>> .searchBtn .searchBtnCell:hover {
  background: #2698d6;
}
.searchMakeAttenView >>> .searchBtn .el-form-item__content {
  margin: 0 !important;
  display: flex;
}
.searchMakeAttenView >>> .searchBtn .searchBtnCell {
  background: #2698d6;
  color: #ffffff;
}
</style>