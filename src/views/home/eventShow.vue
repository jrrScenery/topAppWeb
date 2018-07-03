<!--首页-事件详情-->
<template>
  <div class="eventShowView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="eventShowTabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first"><event-base-info></event-base-info></el-tab-pane>
        <el-tab-pane label="进展情况" name="second"><event-progress></event-progress></el-tab-pane>
        <el-tab-pane label="人员地图" name="third"><event-people></event-people></el-tab-pane>
        <el-tab-pane label="备件地图" name="fourth"><event-parts></event-parts></el-tab-pane>
      </el-tabs>
    </div>
    <div class="eventShowFooter">
      <el-row>
        <el-col :span="7">
          <div>
            <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
            <span>补充说明</span>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.145rem; height: 0.145rem;" alt="">
            <span>服务评价</span>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.15rem; height: 0.135rem;" alt="">
            <span>相关报修</span>
          </div>
        </el-col>
        <el-col :span="3"><div class="el-icon-more"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import eventBaseInfo from '../../components/event/eventBaseInfo'
import eventProgress from '../../components/event/eventProgress'
import eventPeople from '../../components/event/eventPeople'
import eventParts from '../../components/event/eventParts'
export default {
  name: 'eventShow',

  components: {
    headerBase,
    eventBaseInfo,
    eventProgress,
    eventPeople,
    eventParts
  },

  data () {
    return {
      activeName: 'first',
      eventShowArr: [
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .eventShowTabs{margin-top: 0.05rem; background: #ffffff;}
  .eventShowTabs >>> .el-tabs__header{margin: 0 0 0.1rem;}
  .eventShowTabs >>> .el-tabs__item.is-active{color: #2698d6;}
  .eventShowTabs >>> .el-tabs__active-bar{background: #2698d6;}
  .eventShowTabs >>> .el-tabs__nav{width: 100%; text-align: center;}
  .eventShowTabs >>> .el-tabs__item{width: 25%; padding: 0; font-size: 0.14rem; color: #666666;}
  .eventShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
  .eventShowFooter .el-row{}
  .eventShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
  .eventShowFooter .el-row .el-col img{vertical-align: sub;}
  .eventShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}
</style>
