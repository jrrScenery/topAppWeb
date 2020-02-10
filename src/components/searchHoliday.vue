<!--考勤详情查询条件-->
<template>
  <div class="searchHolidayView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="项目名称">
        <el-select v-model="form.project" placeholder="请选择项目名称">
          <el-option
            v-for="item in projectName"
            :label="item.proname"
            :value="item.value"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="姓名">
                <el-input v-model="form.name" class="bInput"></el-input>
      </el-form-item>-->
      <el-form-item class="searchBtn">
        <el-button @click="onCancel">取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "searchHoliday",
  props: ["searchData"],
  data() {
    return {
      form: {
        project: "",
        name: ""
      },
      projectName: [
        { proname: "神州数码维保项目", value: "0" },
        { proname: "去哪儿网外包框架项目", value: "1" },
        { proname: "机房搬迁项目", value: "2" }
      ]
    }; 
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
    noKeyword() {
      document.activeElement.blur();
    }
  }
};
</script>
<style scoped>
.searchHolidayView {
  background: #ffffff;
  padding: 0.15rem 0.2rem 0.5rem;
  position: relative;
}
.searchHolidayView >>> .el-form-item {
  margin-bottom: 0.1rem;
}
.searchHolidayView >>> .el-select {
  width: 80%;
}
.searchHolidayView >>> .el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.searchHolidayView >>> .el-form-item__label {
  text-align: left;
  color: #999999;
  font-size: 0.13rem;
}
.searchHolidayView >>> .bInput .el-input__inner {
  width: 80%;
}
.searchHolidayView >>> .bInput .el-input__inner:focus {
  border-color: #dcdfe6;
}
.searchHolidayView >>> .el-select-dropdown__item.selected {
  color: #2698d6;
}
.searchHolidayView >>> .el-select-dropdown__item span {
  color: #2698d6 !important;
}
.searchHolidayView >>> .searchBtn {
  position: absolute;
  bottom: -0.15rem;
  left: 0;
  right: 0;
  height: 0.4rem;
}
.searchHolidayView >>> .searchBtn .el-button {
  width: 50%;
  border: none;
  padding: 0;
  margin: 0;
  height: 0.4rem;
  border-radius: 0;
  color: #999999;
  font-size: 0.13rem;
}
.searchHolidayView >>> .searchBtn .el-button:hover {
  background: #ffffff;
}
.searchHolidayView >>> .searchBtn .searchBtnCell:hover {
  background: #2698d6;
}
.searchHolidayView >>> .searchBtn .el-form-item__content {
  margin: 0 !important;
  display: flex;
}
.searchHolidayView >>> .searchBtn .searchBtnCell {
  background: #2698d6;
  color: #ffffff;
}
</style>