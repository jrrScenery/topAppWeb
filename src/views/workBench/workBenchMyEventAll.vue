<!--工作台-所有事件-->
<template>
  <div class="workBenchMyEventView">
    <header-base :title="workBenchMyEventTit" @searchPro="searchProInfo"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in opinionTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <router-link :to="{name:'eventShow',query:{caseId:item.CASE_ID}}">
            <div class="eventCell" v-for="info in item.eventListArr" :key="info.id">
              <div class="cellTop">
                <el-row>
                  <el-col :span="11">
                    <div class="cellTopNum">
                      <span v-if="info.CASE_LEVEL == 1 || info.CASE_LEVEL == 2" style="background: #ff0000;">{{info.CASE_LEVEL}}</span>
                      <span v-if="info.CASE_LEVEL == 3" style="background: #ff9900;">{{info.CASE_LEVEL}}</span>
                      <span v-if="info.CASE_LEVEL == 4" style="background: #ffff00;">{{info.CASE_LEVEL}}</span>
                      <span v-if="info.CASE_LEVEL == 5" style="background: #1ca2a5;">{{info.CASE_LEVEL}}</span>{{info.CASE_NO}}
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <span v-if="info.CASE_TYPEID == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
                    <span v-if="info.CASE_TYPEID == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
                    <span v-if="info.CASE_TYPEID == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></span>
                    <span v-if="info.CASE_TYPEID == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
                    <span v-if="info.CASE_TYPEID == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
                  </el-col>
                  <el-col :span="12">
                    <div class="cellTopTime"><span>{{info.CREATE_DATE}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <el-row>
                  <el-col :span="12"><span class="tit">状态：</span><span>{{info.DEAL_STATUS_NAME}}</span></el-col>
                  <el-col :span="12"><span class="tit">类型：</span><span>{{info.CASE_TYPE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">厂商：</span><span>{{info.FACTORY}}</span></el-col>
                  <el-col :span="12"><span class="tit">型号：</span><span>{{info.DEVICE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">序列号：</span><span>{{info.SN}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">说明：</span><span>{{info.PROBLEM_DETAIL}}</span></el-col>
                </el-row>
              </div>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
            </router-link>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
export default {
  name: 'workBenchMyEventAll',

  components: {
    headerBase,
    loadingtmp
  },

  data () {
    return {
      workBenchMyEventTit: '所有事件',
      opinionTab: [
        {
          name: 'first',
          label: '事件处理',
          eventListArr: []
        },
        {
          name: 'second',
          label: '分析诊断',
          eventListArr: []
        },
        {
          name: 'third',
          label: '现场实施',
          eventListArr: []
        },
        {
          name: 'fourth',
          label: '关闭处理',
          eventListArr: []
        },
        {
          name: 'fifth',
          label: '全部',
          eventListArr: []
        }
      ],
      activeName: 'first',
      searchpage:1,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 1,
      formData: []
    }
  },
  methods: {
    tabClick (e) {
      console.log(e)
      if (e.label === '事件处理') {
        this.tab_box = 1
      }
      if (e.label === '分析诊断') {
        this.tab_box = 2
      }
      if (e.label === '现场实施') {
        this.tab_box = 4
      }
      if (e.label === '关闭处理') {
        this.tab_box = 5
      }
      if (e.label === '全部') {
        this.tab_box = 6
      }
      this.loadMore()
      // console.log(this.tab_box)
    },
    returnList (flag, res, obj) {
      if(flag){
        obj = obj.concat(res.data.data);
      }else{
        obj = res.data.data;
      }
      if(0 == res.data.data.length){
        this.busy = true;
        this.loadall = true;
      }
      else{
        this.busy = false;
        this.page++
      }
      return obj
    },
    getEventList(flag){
      if (this.tab_box === 1) {
        this.page = 1
        this.loadall = false
        this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize, CASE_STEP: 1}}).then(res => {
          // console.log(0, '-----------------', res)
          let obj = this.opinionTab[0].eventListArr
          this.opinionTab[0].eventListArr = this.returnList(flag, res, obj)
        });
      }
      if (this.tab_box === 2) {
        this.page = 1
        this.loadall = false
        this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize, CASE_STEP: 2}}).then(res => {
          // console.log(1, '-----------------', res.data.data)
          let obj = this.opinionTab[1].eventListArr
          this.opinionTab[1].eventListArr = this.returnList(flag, res, obj)
        });
      }
      if (this.tab_box === 4) {
        this.page = 1
        this.loadall = false
        this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize, CASE_STEP: 4}}).then(res => {
          // console.log(2, '-----------------', res.data.data)
          let obj = this.opinionTab[2].eventListArr
          this.opinionTab[2].eventListArr = this.returnList(flag, res, obj)
        });
      }
      if (this.tab_box === 5) {
        this.page = 1
        this.loadall = false
        this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize, CASE_STEP: 5}}).then(res => {
          // console.log(3, '-----------------', res.data.data)
          let obj = this.opinionTab[3].eventListArr
          this.opinionTab[3].eventListArr = this.returnList(flag, res, obj)
        });
      }
      if (this.tab_box === 6) {
        this.page = 1
        this.loadall = false
        this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize}}).then(res => {
          // console.log(4, '-----------------', res.data.data)
          let obj = this.opinionTab[4].eventListArr
          this.opinionTab[4].eventListArr = this.returnList(flag, res, obj)
        });
      }
    },
    loadMore(){
      this.busy = true;
      if (this.tab_box == 7) {
        this.searchProInfo(this.formData);
      } else {
        setTimeout(() => {
          this.getEventList(this.page>1);
        }, 500);
      }
    },

    // 搜索条件data
    searchProInfo (formData) {
      if (formData.industry instanceof Object || formData.industry instanceof Object) {
        formData.industry = formData.industry.join(',')
        formData.type = formData.type.join(',')
        this.formData = formData
      }
      console.log(this.formData)
      this.loadall = false
      this.activeName = 'fifth'
      this.tab_box = 7
      this.$axios.get(global_.proxyServer + "?action=GetCaseList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.searchpage, PAGE_TOTAL: this.pageSize, INDUSTRY_NAME: formData.industry, CASE_TYPEID: formData.type, CREATE_DATE_BEGIN: formData.startTime, CREATE_DATE_END: formData.endTime, CUSTOMER_NAME: formData.customer, PROJECT_NAME: formData.proName, SALE_NAME: formData.sale, PM_NAME: formData.PM, CASE_NO: formData.eventNum, KEYWORD: formData.keyWord}}).then(res => {
        if(this.searchpage>1){
          this.opinionTab[4].eventListArr = this.opinionTab[4].eventListArr.concat(res.data.data);
        }else{
          this.opinionTab[4].eventListArr = res.data.data;
        }
        if(0 == res.data.data.length){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.searchpage++
        }
      })
    }
  }
}
</script>

<style scoped>
  .workBenchMyEventView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll;}
  .content >>> .el-tabs__header{margin: 0; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 20%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
</style>
