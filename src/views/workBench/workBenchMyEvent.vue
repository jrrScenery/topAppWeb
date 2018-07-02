<!--工作台-我的事件-->
<template>
  <div class="workBenchMyEventView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in opinionTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">

            <div class="eventCell" v-for="info in item.eventListArr" :key="info.id">
              <div class="cellTop">
                <el-row>
                  <el-col :span="10">
                    <div class="cellTopNum">
                      <span style="background: #1ca2a5;">5</span>{{info.num}}
                    </div>
                  </el-col>
                  <el-col :span="2"><div class="cellTopColor" style="background: #e9c430"></div></el-col>
                  <el-col :span="12">
                    <div class="cellTopTime"><span>{{info.timeone}}</span><span style="margin-left: 0.05rem;">{{info.timetwo}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <el-row>
                  <el-col :span="12"><span class="tit">状态：</span><span>{{info.state}}</span></el-col>
                  <el-col :span="12"><span class="tit">类型：</span><span>{{info.type}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">厂商：</span><span>{{info.firm}}</span></el-col>
                  <el-col :span="12"><span class="tit">型号：</span><span>{{info.model}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">序列号：</span><span>{{info.serialNum}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">说明：</span><span>{{info.desc}}</span></el-col>
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
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchMyEvent',

  components: {
    headerBase
  },

  data () {
    return {
      opinionTab: [
        {
          name: 'first',
          label: '事件处理',
          eventListArr: [
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            },
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            }
          ]
        },
        {
          name: 'second',
          label: '分析诊断',
          eventListArr: [
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            },
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            }
          ]
        },
        {
          name: 'third',
          label: '现场实施',
          eventListArr: [
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            },
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            }
          ]
        },
        {
          name: 'fourth',
          label: '关闭处理',
          eventListArr: [
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            },
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            }
          ]
        },
        {
          name: 'fifth',
          label: '全部',
          eventListArr: [
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
            },
            {
              num: 'CS1608260014',
              timeone: '2016-08-26',
              timetwo: '09:24:57',
              state: '待管理人处理',
              type: '非故障技术支持',
              firm: 'IBM',
              model: '9117-570(P5 570)',
              serialNum: '16549843215641',
              desc: '16549843215641'
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
  .workBenchMyEventView{width: 100%;}
  .content{margin-top: 0.05rem;}
  .content >>> .el-tabs__header{margin: 0; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__active-bar{background: #e0002a}
  .content >>> .el-tabs__nav .el-tabs__item{width: 20%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #e0002a}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.1rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #e0002a;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0 0.15rem 0.12rem; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
</style>
