<!--关注-->
<template>
  <div class="focusView">
    <div class="content">

        <div class="notice">
        <div class="title">
          <div class="titleLeft">
            <!-- <img src="../../assets/images/index_1.png" alt=""> -->
            <router-link :to="{name:'mineNotice',params:{}}">
              <!-- {{eventTitle+'('+eventTitleTotal+')'}} -->
              <a>{{noticeTitle}}</a>
            </router-link>
          </div>
          <router-link :to="{name:'mineNotice',params:{}}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <div>
          <ul class="noticeTem" v-if="noticeData.length!=0" v-for="item in noticeData" :key="item.id">
            <el-row >
                <el-col><span>{{item.SEND_NAME}}</span><span>于</span>
                <span>{{item.CREATE_ON}}</span><span>{{item.BIZ_NAME}}</span><span>，</span><span>触发原因：</span>
                <span>{{item.TITLE}}</span></el-col>
                <!-- <el-col :span="16"><span>关注原因:</span>{{item.ITEM.split(",")[0]}}</el-col> -->
            </el-row>
          </ul>
        </div>
      </div>


      <div class="event">
        <div class="title">
          <div class="titleLeft">
            <!-- <img src="../../assets/images/index_1.png" alt=""> -->
            <router-link :to="{name:'focusEventList'}">
              <!-- {{eventTitle+'('+eventTitleTotal+')'}} -->
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
            <el-row>
            <el-col :span="23">
            <el-row>
                <el-col :span="8" ><span>{{item.CODE}}</span></el-col>
                <el-col :span="16"><span>关注原因:</span><span>{{item.ITEM.split(",")[0]}}</span></el-col>
            </el-row>
            <el-row>
                <el-col><span>客户名称：</span><span>{{item.CUSTOM}}</span></el-col>
                <!-- <el-col>{{}}</el-col> -->
            </el-row>
            </el-col>
            <el-col :span="1"><i class="el-icon-arrow-right"></i>
            </el-col>
            </el-row>
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
            <el-row>
                <el-col :span="23"><span>{{item.PROJECT_NAME}}</span></el-col>
                <el-col :span="1"><i class="el-icon-arrow-right"></i></el-col>
            </el-row>
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
      noticeData:[]     
    }
  },

  created:function(){
     fetch.get("?action=GetFocusCase&PAGE_NUM=1&PAGE_TOTAL=2","").then(res=>{
        // console.log("res",res.data);
        this.caseData = res.data;
      }); 
      fetch.get("?action=GetFocusProject&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        this.projData = res.data;
      });
      fetch.get("?action=GetTaskMessage&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        this.noticeData = res.data;
      });
  },

  methods:{
    fetchData:function(){
    }
    
  },
  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }


    window.scanResult = (res) =>{
      
      let objtmp={};
      let strscan = res;
      let ar= []
      ar = strscan.split("|");
      console.log(ar);
      if(ar.length){
        ar.forEach(element => {
          if(element.length){
            let arsub = element.split("：")
            if('厂商'==arsub[0] ){
              objtmp.factory = arsub.length>1? arsub[1]:''
            }
            if('型号'== arsub[0]){
              objtmp.xinghao = arsub.length>1? arsub[1]:''
            }
            if('SN'== arsub[0]){
              objtmp.sn = arsub.length>1? arsub[1]:''
            }
            if('城市'== arsub[0]){
              objtmp.city = arsub.length>1? arsub[1]:''
            }
          }
        });
      }

      this.$router.push({name:"workBenchDeclare" , query:{num:objtmp.sn, type:objtmp.xinghao, firm:objtmp.factory,cityname:objtmp.city }})
    }


  },
  mounted:function(){
    
  },
  activated(){
    // console.log(this.$route.meta.isUseCache);
    if(!this.$route.meta.isUseCache){
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
  /* .content{margin: 0 0.14rem; display: block;} */
  .content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem;
   font-size: 0.15rem;padding:0 0.1rem;}
   .content .notice .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem;
   font-size: 0.15rem;}
  .content .title a{color: black; font-weight: bold}
  .content .title span{color: red; font-size:0.04rem ;border-left: 5px}
  .content .title .titleRight{font-size: 0.13rem;margin-right: 0.1rem}
  /* .content .title img{width: 0.18rem; height: 0.18rem; vertical-align: text-bottom; margin-right: 0.08rem;} */
  .event, .notice, .program{background-color: #ffffff;margin-bottom: 0.2rem;}
  /* .notice{background-color: #ffffff;margin-bottom: 0.2rem; border:1px solid red;padding:0 0.1rem;} */
  .tem{border-top: 2px solid #9b9a9a;padding:0 0.1rem;}
  .noticeTem{padding:0 0.1rem;}
  .event span, .notice span, .program span{line-height: 0.25rem;height: 0.25rem;font-size: 0.15rem;color: #000;}
  .el-icon-arrow-right {
   font-size: 0.25rem;color:#858585;padding-top: 0.1rem 
}
</style>

