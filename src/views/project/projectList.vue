<!---工作台-项目列表-->
<template>
  <div class="programListView">
    <header-base :title="projectListTit"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr">
        <router-link :to="{name:'programShow',params:{projectId:item.PROJECT_ID}}">
        <div class="cellTop">
          <el-row>
            <el-col :span="8">
              <div class="cellTopNum">{{item.PROJECT_CODE}}</div>
            </el-col>
            <el-col :span="9">
              <div class="cellTopColor">
                <span style="background: #00c400"></span>{{item.HEALTH_BASE_VALUE}}
                <span style="background: #ffd300"></span>{{item.HEALTH_CURRENT_VALUE}}
              </div>
            </el-col>
            <el-col :span="7">
              <div class="cellTopState">状态：<span>{{item.PROJECT_STATUS}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="cellContent">
          <p>{{item.title}}</p>
          <el-row>
            <el-col :span="12"><span class="tit">销售：{{item.SALESMAN_NAME}}</span></el-col>
            <el-col :span="12"><span class="tit">项目经理：{{item.PM_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">开始时间：{{item.START_DATE}}</span></el-col>
            <el-col :span="12"><span class="tit">结束时间：{{item.END_DATE}}</span></el-col>
          </el-row>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import headerBase from '../header/headerBase'
export default {
  name: 'projectList',

  components: {
    headerBase
  },

  data () {
    return {
      projectListTit: '需关注项目',
      programListArr: [
      ]
    }
  },

  methods: {

  },
  created:function(){
    let url = "?action=GetProjectList&EMPID=1012856&TYPE="+this.$route.params.type+"&PAGE_NUM=1&PAGE_TOTAL=10";
    let result = fetch.get(url,"");
    result.then(res => {
       this.programListArr = res.data;
    });

  }
}
</script>

<style scoped>
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
