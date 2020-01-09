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
      <el-form-item label="查询月份" label-width="0.8rem">
        <el-date-picker type="month" v-model="form.month" clearable placeholder="请选择" style="width: 80%;" value-format="yyyy-MM">
          <!-- <el-option
            v-for="item in monthArr"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          ></el-option> -->
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
        month: ""
      },
      Type: [
        { name: "全月", value: "0", id: 0 },
        { name: "缺勤", value: "1", id: 1 }
      ],
      monthArr: [],
      startMonth:'',
      endMonth:''
    };
  },
  created() {
    // this.startMonth = this.GetMonthStr(-360);
    // this.endMonth = this.GetMonthStr(0);
    this.form.wholeMonth = this.queryData.wholeMonth;
    let date = new Date();
    let year = date.getFullYear();
    let currentMonth = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    // console.log("date.getMonth的值是多少呀：" + date.getMonth());
    // var month = [];
    // var selectItem = [];
    // month[0] = date.getMonth();
    // if (date.getMonth() == 0) { 
    //   month[0] = 12;
    //   year = year - 1;
    // }
    // selectItem[0] = year + "-" + month[0];
    // for (var i = 1; i < 11; i++) {   
    //   month[i] = month[i - 1] - 1;
    //   if (month[i] == 0) {
    //     month[i] = 12;
    //     year = year - 1;
    //   }
    //   if (month[i] < 10) {
    //     month[i] = "0" + month[i];
    //   }
    //   selectItem[i] = year + "-" + month[i];
    // }
    this.form.month = date.getFullYear() + "-" + currentMonth;
    // let current = date.getFullYear() + "-" + currentMonth;
    // let last = year + "-" + lastMonth;
    // this.monthArr = [
    //   { id: 0, value: current },
    //   { id: 1, value: selectItem[0] },
    //   { id: 2, value: selectItem[1] },
    //   { id: 3, value: selectItem[2] },
    //   { id: 4, value: selectItem[3] },
    //   { id: 5, value: selectItem[4] },
    //   { id: 6, value: selectItem[5] },
    //   { id: 7, value: selectItem[6] },
    //   { id: 8, value: selectItem[7] },
    //   { id: 9, value: selectItem[8] },
    //   { id: 10, value: selectItem[9] },
    //   { id: 11, value: selectItem[10] }
    // ];
  },
  methods: {
    onCancel() {
      console.log("sssssssss");
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