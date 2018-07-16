<!--工作台-在保项目信息明细-->
<template>
  <div class="workBenchInfoDetailView">
    <header-base-three :title="workBenchInfoDetailTit"></header-base-three>
    <div style="height: 0.45rem;"></div>
    <div class="content">
        <div class="programCell" v-for="item in programListArr" :key="item.id">
          <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}" > 
            <div class="cellTop">
              <el-row>
                <el-col :span="12">
                  <div class="cellTopNum">{{item.PROJECT_CODE}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="cellTopState">合同规模：<span>{{item.CONTRACT_AMOUNT}}</span></div>
                </el-col>
              </el-row>
            </div>
          </router-link>
          <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}" > 
          <div class="cellContent">
            <p>{{item.title}}</p>
            <el-row>
              <el-col :span="12"><span class="tit">行业：{{item.INDUSTRY}}</span></el-col>
              <el-col :span="12"><span class="tit">客户：{{item.CUST_NAME}}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span class="tit">服务开始：{{item.PROJECT_START_DATE}}</span></el-col>
              <el-col :span="12"><span class="tit">服务结束：{{item.PROJECT_END_DATE}}</span></el-col>
            </el-row>
          </div>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import headerBaseThree from '../header/headerBaseThree'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'workBenchInfoDetail',

  components: {
    headerBaseThree
  },

  data () {
    return {
      workBenchInfoDetailTit: '在保项目情况明细',
      programListArr: []
    }
  },
  created () {
    var url = "?action=GetProjectStatList"; 
    url +=  "&BUSINESS_TYPE=" +  this.$route.query.business + "&INDUSTRY_NAME=" + this.$route.query.industry;
    fetch.get(url,{}).then(res => {
      console.log(res.data);
      this.programListArr = res.data
    })
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
