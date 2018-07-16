<!--工作台-我的项目-->
<template>
  <div class="workBenchMyProView">
    <header-base-two :title="workBenchMyProTit"></header-base-two>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in workBenchMyProTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">

            <div class="programCell" v-for="info in item.programListArr" :key="info.id">
              <div class="cellTop">
                <el-row>
                  <el-col :span="8">
                    <div class="cellTopNum">{{info.num}}</div>
                  </el-col>
                  <el-col :span="9">
                    <div class="cellTopColor">
                      <span style="background: #00c400"></span>{{info.numone}}
                      <span style="background: #ffd300"></span>{{info.numtwo}}
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="cellTopState">状态：<span>{{info.state}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <p>{{info.title}}</p>
                <el-row>
                  <el-col :span="12"><span class="tit">销售：{{info.sale}}</span></el-col>
                  <el-col :span="12"><span class="tit">项目经理：{{info.proLeader}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">开始时间：{{info.startTime}}</span></el-col>
                  <el-col :span="12"><span class="tit">结束时间：{{item.endTime}}</span></el-col>
                </el-row>
              </div>
            </div>

          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerBaseTwo from '../header/headerBaseTwo'
export default {
  name: 'workBenchMyPro',

  components: {
    headerBaseTwo
  },

  data () {
    return {
      workBenchMyProTit: '我的项目',
      workBenchMyProTab: [
        {
          name: 'first',
          label: '执行中',
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
            }
          ]
        },
        {
          name: 'second',
          label: '已过保',
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
            }
          ]
        },
        {
          name: 'third',
          label: '全部',
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
            }
          ]
        }
      ],
      activeName: 'first'
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .workBenchMyProView{width: 100%;}
  .content{margin-top: 0.05rem;}
  .content >>> .el-tabs__header{margin: 0; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
