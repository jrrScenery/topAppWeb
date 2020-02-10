<template>
  <div class="consumeHolidayView">
    <div class="consumeHolidayContent">
      <div v-if="consumeList.length!=0">
        <ul class="ul_mineView" v-for="item in consumeList" :key="item.id">
          <li class="li_mineView">
            <template>
              <div style="width:100%;padding-top:0.1rem;padding-left:0.2rem;padding-bottom:0.07rem;">{{item.date}}</div>
              <span style="padding-left:0.2rem;color:#2698D6">{{name}}</span>
              <span>{{text}}</span>
              <span style="color:#2698D6">{{item.days}}</span>
              <span>{{text1}}</span>
            </template>
          </li>
        </ul>
      </div>
      <div class="norecord" v-else>暂无更多数据</div>
    </div>
    <!-- <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp> -->
  </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js";
import fetch from "../../utils/ajax";
export default {
  name: "consumeHoliday",
  components: {
    // loadingtmp
  },
  data() {
    return {
      name:this.$route.query.name,
      text:"",
      text1:"天",
      id:this.$route.query.id,
      consumeList: [
        {
          date: "2019-11-12",
          days: "1.125"
        },
        {
          date: "2020-01-01",
          days: "1.875"
        }
      ]
    };
  },
  created() {
    if(this.id=='0'){
      this.text='年假消耗';
    }else{
      if(this.id=='1'){
        this.text='调休假消耗';
      }
    }
  },
  methods: {}
};
</script>
<style scoped>
.consumeHolidayView {
  width: 100%;
  height: 100%;
}
.consumeHolidayContent {
  /* padding: 0.1rem; */
  background: #ffffff;
  overflow: scroll;
}
.consumeHolidayContent >>> .norecord {
  text-align: center;
  margin-top: 0.3rem;
  color: #999999;
}
.ul_mineView {
}
.ul_mineView .li_mineView {
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  height: 0.65rem;
  background: #ffffff;
  border-bottom: 0.01rem solid #e5e5e5;
  font-size: 0.14rem;
  /* line-height: 0.5rem; */
}
.ul_mineView .li_mineView span {
  width: 100%;
  text-align: left;
  color: #262626;
}
</style>