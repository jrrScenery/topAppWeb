<!--工作台-在保项目信息-->
<template>
  <div class="workBenchInfoView">
    <header-base-five :title="workBenchInfoTit"  :queryData="searchData"  @searchPro="getSearParams"></header-base-five>
    <div style="height: 0.45rem;"></div>
    <div class="tableTh"><span>客户</span><span>客户数量</span><span>项目数量</span><span>合同规模</span></div>
    <div class="tableTd" v-for="items in workBenchInfoObj" :key="items.name"  >
      <div class="tableTitle">{{items.name}}</div>
      <div class="divTable" v-for="item in items.arr" :key="item.id">
        <router-link v-if="item.INDUSTRY=='合计'" :to="{name:'workBenchIndustryCustomerList',query:{BUSINESS_TYPE:item.BUSINESS_TYPE,INDUSTRY_NAME:item.INDUSTRY}}">
          <span class="bolder">{{item.INDUSTRY}}</span>          
          <span class="bolder">{{item.CUST_NUM}}</span>        
          <span class="bolder">{{item.PRO_NUM}}</span>         
          <span class="bolder">{{item.AMOUNT}}</span>         
        </router-link>
        <router-link v-else :to="{name:'workBenchIndustryCustomerList',query:{BUSINESS_TYPE:item.BUSINESS_TYPE,INDUSTRY_NAME:item.INDUSTRY}}">
          <span>{{item.INDUSTRY}}</span>
          <span>{{item.CUST_NUM}}</span>
          <span>{{item.PRO_NUM}}</span>
          <span>{{item.AMOUNT}}</span>         
        </router-link>       
      </div>      
    </div>
    <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerBaseFive from '../header/headerBaseFive'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchInfo',

  components: {
    headerBaseFive,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchInfoTit: '项目管理',
      workBenchInfoObj: [],
      busy:true,
      loadall: false,
      isSearch:false,
      searchData: {
        industry:[]
      },
    }
  },
  created () {
    this.getProjectStat();
  },
  mounted(){
   
  },
  methods: {
    getProjectStat(){
      let urlparam = {};
      if(this.searchData){
        urlparam.BUSINESS_TYPE = this.searchData["business"]
        urlparam.INDUSTRY = this.searchData["industry"].join(",")
        urlparam.PROJECT_NAME = this.searchData["proName"]
        urlparam.CUST_NAME = this.searchData["customer"]
        urlparam.PM_NAME = this.searchData["PM"]
        urlparam.SALE_NAME = this.searchData["sale"]
      }
      console.log("urlparam",urlparam)
      fetch.get('?action=GetProjectStat',urlparam).then(res => {
        console.log(res.data)
        if("0"== res.STATUSCODE){
          let logData = res.data;
          let temparr= [] ;
          let tempTypeId = -1;
          logData.forEach(function(v,i,ar){
            if(0 == temparr.length || v.BTSORT!= temparr[temparr.length-1]["typeid"] ){
              temparr.push({"typeid":v.BTSORT,"inx":i,"name":v.BUSINESS_TYPE,arr:[]});
              console.log(temparr[temparr.length-1]["typeid"])
            }
            temparr[temparr.length-1]["arr"].push(v);
          })
          console.log(temparr);
          this.workBenchInfoObj= temparr;
        }
        this.busy = false;
        this.loadall = true;
      })
    },
    getSearParams (searchData) {
      this.searchData = searchData;  
      this.busy = false;
      this.isSearch = true;
      this.page = 1;
      this.loadall= false;
      this.workBenchInfoObj = [];
      this.$router.push({name:'workBunchInfoQueryResult',query:{business:searchData.business,industry:searchData["industry"].join(","),
        proName:searchData.proName,customer:searchData.customer,PM:searchData.PM,sale:searchData.sale}})
      // this.getProjectStat();
    },
  },
}

</script>

<style scoped>
  .workBenchInfoView{width: 100%; color: #999999; line-height: 0.3rem;}
  .tableTh span{display: inline-block; width: 23%; color: #666666; line-height: 0.4rem; text-align: center;}
  .tableTh span:last-child{width: 31%;}
  .tableTd .tableTitle{color: #2698d6; padding-left: 0.25rem; position: relative; background: #ffffff;}
  .tableTd .tableTitle:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.09rem; background: #2698d6;}
  .tableTd .divTable{text-align: center; display: flex; flex-wrap: wrap;}
  .tableTd .divTable a{display: flex; width: 100%; color: #999999}
  .tableTd .divTable a:nth-child(2n+1){background: #f7f7f7;}
  .tableTd .divTable a:nth-child(2n){text-align: center; background: #ffffff;}
  .tableTd .divTable a span{display: inline-block; width: 23%; overflow: hidden; text-align: center;}
  .tableTd .divTable a span:last-child{width: 31%; text-align: right; padding-right: 0.05rem}
  .bolder{font-weight: bold} /*新加*/
</style>
