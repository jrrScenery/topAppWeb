<!--工作台-所有事件-->
<template>
  <div class="workBenchMyEventView">
    <header-base :title="workBenchMyEventTit" :queryData="formData" @searchPro="getSearParams"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="(item) in opinionTab">
          <el-tab-pane :label="item.label+'('+item.num+')'" :name="item.name" :key="item.id">
            <div class="eventCell" v-for="info in item.eventListArr" :key="info.id">
              <router-link :to="{name:'eventShow',query:{caseId:info.CASE_ID}}">
              <div class="cellTop">
                <el-row>
                  <el-col :span="11">
                    <div class="cellTopNum">
                      <span class="speventlevel" :class="'speventlevelcolor'+info.CASE_LEVEL" >{{info.CASE_LEVEL}}</span>{{info.CASE_NO}}
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <span class="spheathcolor" :class="'spheathcolor'+info.CASE_HEALTH" ></span>
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
import headerBase from '../header/headerBase'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
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
          label: '执行中',
          eventListArr: [],
          num:0
        },
        {
          name: 'second',
          label: '已关闭',
          eventListArr: [],
          num:0
        },
        {
          name: 'third',
          label: '全部',
          eventListArr: [],
          num:0
        }
      ],
      activeName: 'first',
      searchpage:1,
      issearch:0,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 1,
      formData: null,
      objpages:{"first":{page:1,loadall:false, IF_CLOSE:'N',idx:0,issearch:0},"second":{page:1,loadall:false,IF_CLOSE:'Y',idx:1,issearch:0},
      "third":{page:1,loadall:false,IF_CLOSE:'',idx:2,issearch:0}}
    }
  },
  created () {
    
  },
  methods: {
    tabClick (e) {
      console.log("tabclick");
      var objnowpage = this.objpages[this.activeName];
      this.loadall= objnowpage.loadall;
      if(this.issearch != objnowpage.issearch ){
        objnowpage.page= 1
        objnowpage.loadall = false
        objnowpage.eventListArr= []
        objnowpage.issearch = this.issearch;
        this.loadMore();
        return ;
      }
      if(objnowpage.page==1 && !objnowpage.loadall){
        this.loadMore();
      }
    },
    returnList (flag, res, obj) {
      if(flag){
        obj = obj.concat(res.data);
      }else{
        obj = res.data;
      }
      if(0 == res.data.length||res.data.length<this.pageSize){
        this.busy = false;
        this.loadall = true;
        this.objpages[this.activeName]["loadall"] =true;
      }
      else{
        this.busy = false;
        this.objpages[this.activeName]["page"]++
      }
      return obj
    },
    getEventList(){
      var flag = this.objpages[this.activeName]["page"]>1;
      let objnowpage = this.objpages[this.activeName];     
      let strurl = "?action=GetCaseList&TYPE=all";
      let urlparam = {PAGE_NUM: objnowpage.page, PAGE_TOTAL: this.pageSize, IF_CLOSE: objnowpage.IF_CLOSE}

      if(this.formData){
        urlparam.CUST_ID = this.formData["customer"]
        urlparam.INDUSTRY_NAME = this.formData["industry"].join(",")
        urlparam.CREATE_DATE_BEGIN = this.formData["startTime"]
        urlparam.CREATE_DATE_END = this.formData["endTime"]
        urlparam.CASE_TYPEID = this.formData["type"].join(",");
        urlparam.SALE_NAME = this.formData["sale"]
        urlparam.PM_NAME = this.formData["PM"]
      }

      fetch.get(strurl,urlparam).then(res => {
        if('0'== res.STATUSCODE){
          
          let obj = this.opinionTab[objnowpage.idx].eventListArr;
          this.opinionTab[objnowpage.idx].eventListArr = this.returnList(flag, res, obj)

          let totData= res.totalData;
          let i= 0;
          if(!this.opinionTab[0]['num']){
            for(var p in totData){
              this.opinionTab[i]['num']= totData[p];
              i++
            }
          }
        }
        else{

        }
      });
      
      
    },

    loadMore(){
      if(this.busy || this.objpages[this.activeName]["loadall"])return false;
      this.busy = true;
      
      console.log("loadMore");
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    getSearParams (formData) {
      this.activeName="fifth";
      this.objpages["fifth"]["page"] = 1;
      this.objpages["fifth"]["loadall"]= false;
      this.loadall = false;
      this.opinionTab[4].eventListArr = [];
      this.objpages["fifth"]["issearch"] = 1;
      this.issearch=1;
      this.formData = formData;
      this.loadMore();
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
  .content >>> .el-tabs__nav .el-tabs__item{width: 33.33333333%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .speventlevel{}
  .speventlevelcolor1{ background:#ff0000; }
  .speventlevelcolor2{ background:#ff0000; }
  .speventlevelcolor3{ background:#ff9900; }
  .speventlevelcolor4{ background:#ffff00; }
  .speventlevelcolor5{ background:#1ca2a5; }

  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .spheathcolor1{background: #009900;}
  .spheathcolor2{background: #ffff00;}
  .spheathcolor3{background: #ff9900;}
  .spheathcolor4{background: #ff0000;}
</style>
