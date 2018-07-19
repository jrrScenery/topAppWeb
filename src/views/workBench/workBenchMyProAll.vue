<!--工作台-所有项目-->
<template>
  <div class="workBenchMyProView">
    <header-base-five :title="workBenchMyProTit" @searchPro="searchProInfo"></header-base-five>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in workBenchMyProTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <div class="programCell" v-for="info in item.programListArr" :key="info.id">
              <router-link :to="{name:'programShow',query:{projectId:info.PROJECT_ID}}">
              <div class="cellTop">
                <el-row>
                  <el-col :span="8">
                    <div class="cellTopNum">{{info.PROJECT_CODE}}</div>
                  </el-col>
                  <el-col :span="9">
                    <div class="cellTopColor">
                      <span v-if="info.BASE_COLOR == 0"></span>
                      <span v-if="info.BASE_COLOR == 1" style="background: #ff0000"></span>
                      <span v-if="info.BASE_COLOR == 2" style="background: #ffff00"></span>
                      <span v-if="info.BASE_COLOR == 3" style="background: #009900"></span>{{info.HEALTH_BASE_VALUE}}
                      <span v-if="info.NOW_COLOR == 0"></span>
                      <span v-if="info.NOW_COLOR == 1" style="background: #ff0000"></span>
                      <span v-if="info.NOW_COLOR == 2" style="background: #ffff00"></span>
                      <span v-if="info.NOW_COLOR == 3" style="background: #009900"></span>{{info.HEALTH_CURRENT_VALUE}}
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="cellTopState" v-if="info.PROJECT_STATUS">状态：<span>{{info.PROJECT_STATUS}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <p>{{info.PROJECT_NAME}}</p>
                <el-row>
                  <el-col :span="12"><span class="tit">销售：{{info.SALESMAN_NAME}}</span></el-col>
                  <el-col :span="12"><span class="tit">项目经理：{{info.PM_REALNAME}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">开始时间：{{info.START_DATE}}</span></el-col>
                  <el-col :span="12"><span class="tit">结束时间：{{info.END_DATE}}</span></el-col>
                </el-row>
              </div>
              </router-link>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerBaseFive from '../header/headerBaseFive'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
export default {
  name: 'workBenchMyProAll',

  components: {
    headerBaseFive,
    loadingtmp
  },

  data () {
    return {
      workBenchMyProTit: '所有项目',
      workBenchMyProTab: [
        {
          name: 'first',
          label: '执行中',
          programListArr: []
        },
        {
          name: 'second',
          label: '已过保',
          programListArr: []
        },
        {
          name: 'third',
          label: '全部',
          programListArr: []
        }
      ],
      activeName: 'first',
      searchpage:1,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 0,
      formData: []
    }
  },

  mounted () {
  },

  methods: {
    tabClick (e) {
      console.log(e)
      if (e.label === '执行中') {
        this.tab_box = 0
      }
      if (e.label === '已过保') {
        this.tab_box = 1
      }
      if (e.label === '全部') {
        this.tab_box = 2
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
      for (let i = 0; i < this.workBenchMyProTab.length; i++) {
        if (this.tab_box === i) {
          this.page = 1
          this.loadall = false
          if (this.tab_box === 2) {
            this.page = 1
            this.loadall = false
            this.$axios.get(global_.proxyServer + "?action=GetProjectList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize}}).then(res => {
              let obj = this.workBenchMyProTab[2].programListArr
              this.workBenchMyProTab[2].programListArr = this.returnList(flag, res, obj)
            });
          } else {
            this.$axios.get(global_.proxyServer + "?action=GetProjectList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize, IF_SURANCE: i}}).then(res => {
              let obj = this.workBenchMyProTab[i].programListArr
              this.workBenchMyProTab[i].programListArr = this.returnList(flag, res, obj)
            });
          }
        }
      }
    },
    loadMore(){
      this.busy = true;
      if (this.tab_box == 3) {
        this.searchProInfo(this.formData);
      } else {
        setTimeout(() => {
          this.getEventList(this.page>1);
        }, 500);
      }
    },

    // 搜索条件data
    searchProInfo (formData) {
      if (formData.industry instanceof Object) {
        formData.industry = formData.industry.join(',')
        this.formData = formData
      }
      console.log(this.formData)
      this.loadall = false
      this.activeName = 'third'
      this.tab_box = 3
      this.$axios.get(global_.proxyServer + "?action=GetProjectList&EMPID=1012856&TYPE=all", {params: {PAGE_NUM: this.searchpage, PAGE_TOTAL: this.pageSize, BUSINESS_TYPE: formData.business, INDUSTRY: formData.industry, CUST_NAME: formData.customer, PROJECT_NAME: formData.proName, SALE_NAME: formData.sale, PM_NAME: formData.PM}}).then(res => {
        if(this.searchpage>1){
          this.workBenchMyProTab[2].programListArr = this.workBenchMyProTab[2].programListArr.concat(res.data.data);
        }else{
          this.workBenchMyProTab[2].programListArr = res.data.data;
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
  .workBenchMyProView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll;}
  .content >>> .el-tabs__header{margin: 0; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6; word-break:break-all;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
