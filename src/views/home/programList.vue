<!--首页-需关注项目-->
<template>
  <div class="programListView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr">
        <router-link :to="{name:'programShow'}">
        <div class="cellTop">
          <el-row>
            <el-col :span="8">
              <div class="cellTopNum">{{item.num}}</div>
            </el-col>
            <el-col :span="10">
              <div class="cellTopColor">
                <span style="background: #00c400"></span>{{item.numone}}
                <span style="background: #ffd300"></span>{{item.numtwo}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="cellTopState">状态：<span>{{item.state}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="cellContent">
          <p>{{item.title}}</p>
          <el-row>
            <el-col :span="12"><span class="tit">销售：{{item.sale}}</span></el-col>
            <el-col :span="12"><span class="tit">项目经理：{{item.proLeader}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">开始时间：{{item.startTime}}</span></el-col>
            <el-col :span="12"><span class="tit">结束时间：{{item.endTime}}</span></el-col>
          </el-row>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'programList',

  components: {
    headerBase
  },

  data () {
    return {
      programListArr: [
        {
          num: 'WVJAH60TSF',
          numone: '90.2',
          numtwo: '90.2',
          state: '执行中',
          title: '2017年河南联通IT设备维保服务公开招标项目',
          sale: '绍振洲',
          proLeader: '绍振洲',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        },
        {
          num: 'WVJAH60TSF',
          numone: '90.2',
          numtwo: '90.2',
          state: '执行中',
          title: '2017年河南联通IT设备维保服务公开招标项目',
          sale: '绍振洲',
          proLeader: '绍振洲',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        },
        {
          num: 'WVJAH60TSF',
          numone: '90.2',
          numtwo: '90.2',
          state: '执行中',
          title: '2017年河南联通IT设备维保服务公开招标项目',
          sale: '绍振洲',
          proLeader: '绍振洲',
          startTime: '2017-06-01',
          endTime: '2017-06-01'
        },
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #e0002a;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.05rem 0 0.1rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
