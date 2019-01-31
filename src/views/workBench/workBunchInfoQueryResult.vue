<!--工作台-所有项目-->
<template>
  <div class="workBenchMyProAllView">
    <header-last :title="workBenchMyProTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchMyProAllContent" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="programCell" v-for="info in programListArr" :key="info.id">
            <router-link :to="{name:'programShow',query:{projectId:info.PROJECT_ID,type:'home_page'}}">
            <div class="cellTop">
            <el-row>
                <el-col :span="11">
                <div class="cellTopNum">{{info.PROJECT_CODE}}</div>
                </el-col>
                <el-col :span="5">
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
                <el-col :span="8">
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
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBunchInfoQueryResult',
  components: {
    headerLast,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchMyProTit: '所有项目',
      programListArr:[],
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      isSearch:0,
      searchData: {
        industry:[]
      },
    }
  },

  mounted () {
  },

  activated(){ 
    // this.searchData={
    //   business:'',
    //   customer:'',
    //   industry:[],
    //   PM:'',
    //   proName:'',
    //   sale:''
    // }
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;
      this.programListArr = [];
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },

  methods: {
    getEventList(){ 
        let strurl = "?action=GetProjectList&TYPE=all";
        let urlparam = {PAGE_NUM: this.page, PAGE_TOTAL: this.pageSize}
        // if(this.isSearch){
        //     urlparam.BUSINESS_TYPE = this.searchData["business"]
        //     urlparam.INDUSTRY = this.searchData["industry"].join(",")
        //     urlparam.PROJECT_NAME = this.searchData["proName"]
        //     urlparam.CUST_NAME = this.searchData["customer"]
        //     urlparam.PM_NAME = this.searchData["PM"]
        //     urlparam.SALE_NAME = this.searchData["sale"]
        // }else{
            urlparam.BUSINESS_TYPE = this.$route.query.business
            urlparam.INDUSTRY = this.$route.query.industry
            urlparam.PROJECT_NAME = this.$route.query.proName
            urlparam.CUST_NAME = this.$route.query.customer
            urlparam.PM_NAME =this.$route.query.PM
            urlparam.SALE_NAME =this.$route.query.sale
        // }

        var flag = this.page>1;
        fetch.get(strurl,urlparam).then(res => {
            console.log("GetProjectList:",res);
            if(flag){
                this.programListArr = this.programListArr.concat(res.data);
            }else{
                this.programListArr = res.data;
            }
            if(0 == res.data.length || res.data.length<this.pageSize ){
                this.busy = false;
                this.loadall = true;
            }
            else{
                this.busy = false;
                this.page++
            }
        });
      
    },
    loadMore(){
        if(this.busy || this.loadall) return;
        this.busy = true;
        setTimeout(() => {
            this.getEventList();
        }, 500);
    },
  },
//   //在页面离开时记录滚动位置
//   beforeRouteLeave (to, from, next) {
//     if (to.name == 'programShow') {
//       this.scrollTop = document.querySelector('.workBenchMyProAllContent').scrollTop;
//       console.log("scrollTop:",this.scrollTop)
//     }   
//     next();
//   },
//   //进入该页面时，用之前保存的滚动位置赋值
//   beforeRouteEnter (to, from, next) {
//     console.log("next:",next);
//     next(vm => {
//       console.log("vmvmvm",vm.scrollTop);
//       document.querySelector('.workBenchMyProAllContent').scrollTop = vm.scrollTop
//     })
//   },
}
</script>

<style scoped>
  .workBenchMyProAllView{width: 100%;}
  .workBenchMyProAllContent{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;}
  .workBenchMyProAllView >>> .el-tabs__header{margin-bottom: 0.46rem; background: #ffffff;}
  .workBenchMyProAllContent >>> .el-tabs__nav{width: 100%;position: fixed;background:#fff;top: 0.45rem;}
  .workBenchMyProAllContent >>> .el-tabs__active-bar{background: #2698d6}
  .workBenchMyProAllContent >>> .el-tabs__nav .el-tabs__item{width: 33.33333333%; text-align: center; padding: 0; color: #999999}
  .workBenchMyProAllContent >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.2rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6; word-break:break-all;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;font-size: 0.14rem}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.14rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;font-size: 0.13rem}
</style>
