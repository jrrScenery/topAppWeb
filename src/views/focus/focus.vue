<!--关注-->
<template>
  <div class="focusView">
    <div class="content">

      <div class="notice">
        <div class="title">
          <div class="titleLeft">
            <router-link :to="{name:'mineNotice',params:{}}">
              <a>{{noticeTitle}}</a>
            </router-link>
          </div>
          <router-link :to="{name:'mineNotice',params:{}}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <div>
          <ul class="noticeTem" v-if="noticeData.length!=0" v-for="item in noticeData" :key="item.id">
            <router-link :to="{name:'mineNotice',params:{}}">
              <li class="li_focusView">    
                <template>
                  <span>{{item.SEND_NAME}} 于{{item.CREATE_ON}}{{item.BIZ_NAME}}，触发原因：<br/>{{item.TITLE}}</span>    
                </template>      
              </li>
            </router-link>
          </ul>
        </div>
      </div>

      <div class="event" v-loading="busy && !loadall" element-loading-text="加载中">
        <div class="title">
          <div class="titleLeft">
            <router-link :to="{name:'focusEventList'}">
              <a>{{eventTitle}}</a>
            </router-link>
          </div>
          <router-link :to="{name:'focusEventList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <div>         
          <ul class="tem" v-if="caseData.length!=0" v-for="item in caseData" :key="item.id">
            <router-link :to="{name:'eventShow',query:{caseId:item.CASEID}}">
              <li class="li_focusView" :key="item.id">    
                <template>
                  <span>{{item.CODE}} 关注原因:{{item.ITEM.split(",")[0]}}<br/> 客户名称：{{item.CUSTOM}}</span>    
                  <i class="el-icon-arrow-right"></i>
                </template>      
              </li>
            </router-link>
          </ul>          
        </div>
      </div>

      <div class="program">
        <div class="title">
          <div class="titleLeft">
            <router-link :to="{name:'programList'}">
            <a>{{programTitle}}</a><span>健康度小于80分</span>
            </router-link>
          </div>
          <router-link :to="{name:'programList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <div>
          <ul class="tem" v-if="projData.length!=0" v-for="item in projData" :key="item.id">
            <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}">
              <li class="li_focusView" :key="item.id">    
                <template>
                  <span>{{item.PROJECT_NAME}}</span>    
                  <i class="el-icon-arrow-right"></i>
                </template>      
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'


export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      noticeTitle:'通知',
      eventTitle: '需关注事件',
      programTitle: '需关注项目',
      more: '更多',
      caseData: [],
      projData:[],
      noticeData:[],
      busy:true,
      loadall: false     
    }
  },

  created:function(){
    this.fetchData();
  },

  methods:{
    fetchData:function(){
      fetch.get("?action=GetFocusCase&PAGE_NUM=1&PAGE_TOTAL=2","").then(res=>{
        // console.log("res",res.data);
        this.busy = true;
        this.loadall = true;
        this.caseData = res.data;
      }); 
      fetch.get("?action=GetFocusProject&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        this.projData = res.data;
      });
      fetch.get("?action=GetTaskMessage&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        this.noticeData = res.data;
      });
    }
    
  },
  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }


    // window.scanResult = (res) =>{
      
    //   let objtmp={};
    //   let strscan = res;
    //   let ar= []
    //   ar = strscan.split("|");
    //   console.log(ar);
    //   if(ar.length){
    //     ar.forEach(element => {
    //       if(element.length){
    //         let arsub = element.split("：")
    //         if('厂商'==arsub[0] ){
    //           objtmp.factory = arsub.length>1? arsub[1]:''
    //         }
    //         if('型号'== arsub[0]){
    //           objtmp.xinghao = arsub.length>1? arsub[1]:''
    //         }
    //         if('SN'== arsub[0]){
    //           objtmp.sn = arsub.length>1? arsub[1]:''
    //         }
    //         if('城市'== arsub[0]){
    //           objtmp.city = arsub.length>1? arsub[1]:''
    //         }
    //       }
    //     });
    //   }

    //   this.$router.push({name:"workBenchDeclare" , query:{num:objtmp.sn, type:objtmp.xinghao, firm:objtmp.factory,cityname:objtmp.city }})
    // }


  },
  activated(){
    if(!this.$route.meta.isUseCache){
      this.busy = true;
      this.loadall = false;
      this.caseData = [];
      this.projData = [];
      fetch.get("?action=checkSession",{}).then(res=>{
        this.fetchData();
      });
    }
    this.$route.meta.isUseCache = false;
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .focusView{width: 100%;}
  .content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem;font-size: 0.15rem;padding:0 0.1rem;}
  .content .notice .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem;font-size: 0.15rem;}
  .content .title a{color: black; font-weight: bold}
  .content .title span{color: red; font-size:0.04rem ;border-left: 5px}
  .content .title .titleRight{font-size: 0.13rem;margin-right: 0.1rem}
  .event, .notice, .program{background-color: #ffffff;margin-bottom: 0.2rem;}
  .tem{border-top: 0.01rem solid #e5e5e5;;height:100%;}
  .noticeTem{padding:0 0.1rem;}
  .event span, .notice span, .program span{line-height: 0.25rem;height: 0.25rem;font-size: 0.13rem;color: #000;}
  .tem .li_focusView{height:100%;display: flex; justify-content: space-between; align-items: center;background: #ffffff; border-bottom: 0rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0.01rem 0.2rem;}
  .tem .li_focusView:nth-child(1){border-top: 0 solid #e5e5e5;}
  .tem .li_focusView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .tem .li_focusView span{width: 100%;height: 100%; text-align: left; color: #262626;margin-bottom: 0.02rem}
</style>

