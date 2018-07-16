<!--首页-关注事件-->
<template>
  <div class="eventListView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="eventCell" v-for="item in eventListArr">
        <router-link :to="{name:'eventShow',params:{caseId:item.CASE_ID}}">
        <div class="cellTop">
          <el-row>
            <el-col :span="11">
              <div class="cellTopNum">
                <span v-if="item.CASE_LEVEL == 1 || item.CASE_LEVEL == 2" style="background: #ff0000;">{{item.CASE_LEVEL}}</span>
                <span v-if="item.CASE_LEVEL == 3" style="background: #ff9900;">{{item.CASE_LEVEL}}</span>
                <span v-if="item.CASE_LEVEL == 4" style="background: #ffff00;">{{item.CASE_LEVEL}}</span>
                <span v-if="item.CASE_LEVEL == 5" style="background: #1ca2a5;">{{item.CASE_LEVEL}}</span>{{item.CASE_NO}}
              </div>
            </el-col>
            <el-col :span="1"><div class="cellTopColor" style="background: #e9c430"></div></el-col>
            <el-col :span="12">
              <div class="cellTopTime"><span>{{item.CREATE_DATE}}</span><span style="margin-left: 0.05rem;"></span></div>
            </el-col>
          </el-row>
        </div>

        <div class="cellContent">
          <el-row>
            <el-col :span="12"><span class="tit">厂商：</span><span>{{item.FACTORY}}</span></el-col>
            <el-col :span="12"><span class="tit">型号：</span><span>{{item.DEVICE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">状态：</span><span>{{item.DEAL_STATUS_NAME}}</span></el-col>
            <el-col :span="12"><span class="tit">类型：</span><span>{{item.CASE_TYPE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">告警项：</span><span>{{item.PROBLEM_DETAIL}}</span></el-col>
          </el-row>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBase from '../header/headerBase'
export default {
  name: 'eventList',

  components: {
    headerBase
  },

  data () {
    return {
      eventListArr: [
        {
          num: 'CS1608260014',
          timeone: '2016-08-26',
          timetwo: '09:24:57',
          firm: 'IBM',
          model: '9117-570(P5 570)',
          state: '待管理人处理',
          type: '非故障技术支持',
          alarm: 'CASE人员到场OLA超时'
        },
        {
          num: 'CS1608260014',
          timeone: '2016-08-26',
          timetwo: '09:24:57',
          firm: 'IBM',
          model: '9117-570(P5 570)',
          state: '待管理人处理',
          type: '非故障技术支持',
          alarm: 'CASE人员到场OLA超时'
        }
      ]
    }
  },

  methods: {

  },

  created:function(){

    this.$axios.get(global_.proxyServer+"?action=GetCaseList&EMPID="+global_.empId+"&TYPE="+this.$route.params.type+"&PAGE_NUM=1&PAGE_TOTAL=10",{}).then(res=>{
      this.eventListArr = res.data.data;
      console.log(this.eventListArr);
    });
  }

}
</script>

<style scoped>
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.1rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.03rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0 0 -0.03rem; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
</style>
