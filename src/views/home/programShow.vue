<!--首页-项目详情-->
<template>
  <div class="programShowView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr">
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
            <el-col :span="12"><span class="tit">业务类型：{{item.type}}</span></el-col>
            <el-col :span="12"><span class="tit">开始时间：{{item.startTime}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">业务小类：{{item.stype}}</span></el-col>
            <el-col :span="12"><span class="tit">结束时间：{{item.endTime}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">项目级别：{{item.level}}</span></el-col>
            <el-col :span="12"><span class="tit">销售姓名：{{item.sale}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">交付类型：{{item.payType}}</span></el-col>
            <el-col :span="12"><span class="tit">销售电话：{{item.phone}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">签约类型：{{item.signType}}</span></el-col>
            <el-col :span="12"><span class="tit">PM姓名：{{item.PMname}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">客户名称：{{item.custom}}</span></el-col>
            <el-col :span="12"><span class="tit">PM电话：{{item.PMphone}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">责任交付部门：{{item.department}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="programTable">
        <el-tabs v-model="activeName">
          <el-tab-pane label="健康度" name="first"><pro-health></pro-health></el-tab-pane>
          <el-tab-pane label="设备清单" name="second"><pro-machine></pro-machine></el-tab-pane>
          <el-tab-pane label="巡检计划" name="third"><pro-plan></pro-plan></el-tab-pane>
          <el-tab-pane label="相关报修" name="fourth"><pro-repair></pro-repair></el-tab-pane>
          <el-tab-pane label="分析报表" name="fifth"><pro-report></pro-report></el-tab-pane>
          <el-tab-pane label="文档下载" name="sixth"><pro-file-down></pro-file-down></el-tab-pane>
          <el-tab-pane label="满意度" name="seventh"><pro-satisfy></pro-satisfy></el-tab-pane>
          <el-tab-pane label="意见反馈" name="eighth"><pro-feedback></pro-feedback></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import proHealth from '../../components/program/proHealth'
import proMachine from '../../components/program/proMachine'
import proPlan from '../../components/program/proPlan'
import proRepair from '../../components/program/proRepair'
import proReport from '../../components/program/proReport'
import proFileDown from '../../components/program/proFileDown'
import proSatisfy from '../../components/program/proSatisfy'
import proFeedback from '../../components/program/proFeedback'
export default {
  name: 'programShow',

  components: {
    headerBase,
    proHealth,
    proMachine,
    proPlan,
    proRepair,
    proReport,
    proFileDown,
    proSatisfy,
    proFeedback
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
          type: '运维',
          startTime: '2018-01-01',
          stype: '运维-基础运维',
          endTime: '2018-01-01',
          level: 'A',
          sale: '章三',
          payType: '正式交付',
          phone: '13888888888',
          signType: '新签',
          PMname: '章三',
          custom: '北京电信',
          PMphone: '13888888888',
          department: '北区运维一部',
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
  .programCell{padding: 0 0.2rem 0.1rem; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.05rem 0 0.1rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
  .programShowView >>> .el-tabs__item{font-size: 0.14rem; color: #666666}
  .programShowView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .programShowView >>> .el-tabs__item.is-active{color: #2698d6;}
  .programShowView >>> .el-tabs__header{margin: 0 0.1rem}
  .programShowView >>> .el-tabs__header .el-tabs__nav-prev{font-size: 0.2rem}
  .programShowView >>> .el-tabs__header .el-tabs__nav-next{font-size: 0.2rem}
  .programTable{background: #ffffff; padding-bottom: 0.2rem;}
</style>
