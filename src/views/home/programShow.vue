<!--首页-项目详情-->
<template>
  <div class="programShowView">
    <header-last :title="programShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr">
        <div class="cellTop">
          <el-row>
            <el-col :span="8">
              <div class="cellTopNum">{{projectInfo.PROJECT_CODE}}</div>
            </el-col>
            <el-col :span="9">
              <div class="cellTopColor">
                <span style="background: #00c400"></span>{{projectInfo.HEALTH_BASE_VALUE}}
                <span style="background: #ffd300"></span>{{projectInfo.HEALTH_CURRENT_VALUE}}
              </div>
            </el-col>
            <el-col :span="7">
              <div class="cellTopState">状态：<span>{{projectInfo.PROJECT_STATUS}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="cellContent">
          <p>{{item.PROJECT_NAME}}</p>
          <el-row>
            <el-col :span="12"><span class="tit">业务类型：{{projectInfo.BUSINESS_TYPE}}</span></el-col>
            <el-col :span="12"><span class="tit">开始时间：{{projectInfo.START_DATE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">业务小类：{{projectInfo.BUSINESS_CLASS}}</span></el-col>
            <el-col :span="12"><span class="tit">结束时间：{{projectInfo.END_DATE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">项目级别：{{projectInfo.PROJECT_LEVEL}}</span></el-col>
            <el-col :span="12"><span class="tit">销售姓名：{{projectInfo.SALESMAN_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">交付类型：{{projectInfo.DELIVERY_TYPE_NAME}}</span></el-col>
            <el-col :span="12"><span class="tit">销售电话：{{projectInfo.SALESMAN_MOBILE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">签约类型：{{projectInfo.CONTRACT_WAY}}</span></el-col>
            <el-col :span="12"><span class="tit">PM姓名：{{projectInfo.PM_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">客户名称：{{projectInfo.CUSTOMER_CONTACT}}</span></el-col>
            <el-col :span="12"><span class="tit">PM电话：{{projectInfo.PM_MOBILE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">责任交付部门：{{projectInfo.AREA_NAME}}</span></el-col>
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
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
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
    headerLast,
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
      programShowTit: '需关注项目',
      programListArr: [
        {

        }
      ],
      projectInfo:{},
      activeName: 'first'
    }
  },

  created () {
    this.$axios.get(global_.proxyServer+"?action=GetProjectInfo&EMPID="+global_.empId+"&PROJECT_ID="+this.$route.query.projectId,{}).then(res=>{
      console.log(res)
      let baseInfo = res.data.data;
      this.projectInfo = baseInfo;
    });
  },

  mounted () {
    window.addEventListener('scroll', this.handleScroll,true)
  },

  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let headerTop = document.querySelector('.el-tabs__header')
      let bijiaoHeight = document.querySelector('.programTable').offsetTop - 45
      if (scrollTop >= bijiaoHeight) {
        headerTop.classList.add('moveTop')
        headerTop.style.top = (Number(scrollTop) / 100) - (bijiaoHeight / 100) + 'rem'
      } else {
        headerTop.classList.remove('moveTop')
        headerTop.style.top = 0 + 'rem'
      }
    },
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll,true)
  },
}
</script>

<style scoped>
  .programCell{padding: 0 0.15rem 0.1rem; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin-right: 0.05rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
  .programShowView >>> .el-tabs__item{font-size: 0.14rem; color: #666666}
  .programShowView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .programShowView >>> .el-tabs__item.is-active{color: #2698d6;}
  .programShowView >>> .el-tabs__header{padding: 0 0.1rem; margin: 0}
  .programShowView >>> .el-tabs__header .el-tabs__nav-prev{font-size: 0.2rem}
  .programShowView >>> .el-tabs__header .el-tabs__nav-next{font-size: 0.2rem}
  .programTable{background: #ffffff; padding-bottom: 0.2rem;}
  .programShowView >>> .moveTop{z-index: 999; background: #ffffff; -webkit-transform: translateZ(0)}
</style>
