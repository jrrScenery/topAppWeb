<template>
  <div class="holidayDetailView">
    <header-last :title="holidayDetailTit"></header-last>
    <div style="height:0.45rem"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="firstTabTit" name="first">
          <add-holiday></add-holiday>
        </el-tab-pane>
        <el-tab-pane :label="secondTabTit" name="second" lazy>
          <consume-holiday></consume-holiday>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerLast from "../header/headerLast";
import addHoliday from "../../components/holiday/addHoliday";
import consumeHoliday from "../../components/holiday/consumeHoliday";
import fetch from "../../utils/ajax";
export default {
  name: "holidayDetail",
  components: {
    headerLast,
    addHoliday,
    consumeHoliday
  },
  data() {
    return {
      holidayDetailTit: "假期详情",
      activeName: 'first',
      firstTabTit: '',
      secondTabTit: '',
      staffId:this.$route.query.staffId,
      name:this.$route.query.name
    //   todoListArr:[],
    }
  },

  methods: {},
  created() {
      this.firstTabTit='年假累计';
      this.secondTabTit='年假消耗';
     },
  methods:{
  }
};
</script>


<style scoped>
.holidayDetailView {
  width: 100%;
}
.content{margin: 0 0; background: #ffffff; position: relative;}
.content >>> .el-tabs__header{margin: 0 0 0rem;}
.content >>> .el-tabs__item.is-active{color: #2698d6;}
.content >>> .el-tabs__active-bar{background: #2698d6;}
.content >>> .el-tabs__nav{width: 100%; text-align: center;}
.content >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>