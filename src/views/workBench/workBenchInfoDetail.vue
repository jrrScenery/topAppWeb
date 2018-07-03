<!--工作台-在保项目信息明细-->
<template>
  <div class="workBenchInfoDetailView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="programCell" v-for="item in programListArr" :key="item.id">
      <div class="cellTop">
        <el-row>
          <el-col :span="12">
            <div class="cellTopNum">{{item.num}}</div>
          </el-col>
          <el-col :span="12">
            <div class="cellTopState">合同规模：<span>{{item.scale}}</span></div>
          </el-col>
        </el-row>
      </div>
      <div class="cellContent">
        <p>{{item.title}}</p>
        <el-row>
          <el-col :span="12"><span class="tit">行业：{{item.industry}}</span></el-col>
          <el-col :span="12"><span class="tit">客户：{{item.customer}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="tit">服务开始：{{item.startTime}}</span></el-col>
          <el-col :span="12"><span class="tit">服务结束：{{item.endTime}}</span></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchInfoDetail',

  components: {
    headerBase
  },

  data () {
    return {
      programListArr: [
        {
          num: 'WVJAH60TSF',
          scale: '143800元',
          title: '凯捷2012年维保项目',
          industry: '企事业',
          customer: '凯捷咨询',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        },
        {
          num: 'WVJAH60TSF',
          scale: '143800元',
          title: '凯捷2012年维保项目',
          industry: '企事业',
          customer: '凯捷咨询',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        },
        {
          num: 'WVJAH60TSF',
          scale: '143800元',
          title: '凯捷2012年维保项目',
          industry: '企事业',
          customer: '凯捷咨询',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        }
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .workBenchInfoDetailView{width: 100%;}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopState{text-align: right; color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
