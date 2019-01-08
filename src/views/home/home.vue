<!--工作台-->
<template>
  <div class="homeView">
    <div style="text-align:center;margin-top:0.1rem" v-for="items in workBenchObj" :key="items.id" v-if="items.arr.length!=0">

      <ul class="ul_workBench" >
          <template v-for="item in items.arr">
            <li class="li_workBench" :key="item.id">
              <router-link :to="{name:item.href,params:item.params}" >
                <img  :src="item.imgSrc" alt="">
              </router-link>
              <span>{{item.text}}</span>
            </li>
        </template>
      </ul>
    </div>
    <div class="newInfo" v-loading="busy && !loadall" element-loading-text="加载中">
      <img src='../../assets/images/new.jpg' alt="">
      <div style="width:80%">
        <ul class="ul_mineView">
          <div v-for="item in eventListArr" :key="item.id">
            <router-link :to="{name:'mineNotice',params:{}}">
              <li class="li_mineView" >
                <template>
                  <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;background: #ff0000;"></span>
                  <span>{{item.TITLE}}</span>
                  <i class="el-icon-arrow-right"></i>
                </template>
              </li>
            </router-link>
          </div>
          <div v-for="item in caseData" :key="item.id">
            <router-link :to="{name:'eventShow',query:{caseId:item.CASEID}}">
              <li class="li_mineView">
                <template>
                  <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;background: #ff0000;"></span>
                  <span>{{item.CODE}} {{item.CUSTOM}} {{item.ITEM}} </span>
                  <i class="el-icon-arrow-right"></i>
                </template>
              </li>
            </router-link>
          </div>
          <div v-for="item in projData" :key="item.id">
            <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}">
              <li class="li_mineView">
                <template>
                  <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;background: #ff0000;"></span>
                  <span>{{item.PROJECT_NAME}} {{item.START_DATE}} {{item.END_DATE}} </span>
                  <i class="el-icon-arrow-right"></i>
                </template>
              </li>
            </router-link>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'workBench',

  components: {
  },

  data () {
    return {
      workBenchObj: [
        {arr: []},
        {arr: []},
        {arr: []}
      ],
      eventListArr: [],
      caseData:[],
      projData:[],
      page:1,
      pageSize:1,
      busy:true,
      loadall: false
    }
  },
  activated(){
    // console.log(this.$route.meta.isUseCache);
    this.workBenchObj = [
        {arr: []},
        {arr: []},
        {arr: []}
    ];
    this.getWorkBenchObj();  
    if(!this.$route.meta.isUseCache){
      this.busy = true;
      this.loadall = false;
      this.caseData = [];
      fetch.get("?action=checkSession",{}).then(res=>{
        this.getEventList();
      });
    }
    this.$route.meta.isUseCache = false;
  },
  created(){
    this.getWorkBenchObj();
    this.getEventList();
  },
  methods: {
    getWorkBenchObj(){
      let permissions = JSON.parse(localStorage.getItem("userPermission"));
      var m=0;
      var n=0;
      for(let i=0;i<permissions.length;i++){
        if(permissions[i].PRIVID=='workFlow_my_task'){
          m++;
        }
        if(permissions[i].PRIVID=='workFlow_case_once'){
          n++;
        }
      }
      if(m!=0){
        this.workBenchObj[0].arr[0] = {imgSrc: require('@/assets/images/my_1.png'), text: '我的任务', href: 'workBenchMyTask',params: {type: 'my'},display:false};
        this.workBenchObj[0].arr[1] = {imgSrc: require('@/assets/images/my_2.png'), text: '我的事件', href: 'workBenchMyEvent',params: {type: 'my'},display:true};
        this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_3.png'), text: '我的项目', href: 'workBenchMyPro',params: {type: 'my'},display:true};
        if(n!=0){
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉',href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
        }else{
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉',href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
        }
      }else{
        this.workBenchObj[0].arr[0] = {imgSrc: require('@/assets/images/my_2.png'), text: '我的事件', href: 'workBenchMyEvent',params: {type: 'my'},display:true};
        this.workBenchObj[0].arr[1] = {imgSrc: require('@/assets/images/my_3.png'), text: '我的项目', href: 'workBenchMyPro',params: {type: 'my'},display:true};
        if(n!=0){
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉',href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
        }else{
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true},
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉',href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr = []
        }
      }
    },

    getEventList(flag){
      // const loading = this.$loading({
      //   lock: true,
      //   text: '加载中……',
      //   background: 'rgba(0, 0, 0, 0)'
      // })
      let url = "?action=GetTaskMessage&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      fetch.get(url,"").then(res=>{
        // console.log("eventListArr:",res);
        this.eventListArr = res.data;
      });

      fetch.get("?action=GetFocusCase&PAGE_NUM=1&PAGE_TOTAL=1","").then(res=>{
        // console.log("caseData:",res);
        // loading.close();
        this.busy = true;
        this.loadall = true;
        this.caseData = res.data;
      });

      fetch.get("?action=GetFocusProject&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        // console.log("projData:",res);
        this.projData = res.data;
      });
    },
  },

  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .homeView{ width: 100%;}
  .homeView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;font-size: 0.15rem}
  .homeView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
  .homeView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
  .homeView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
  .homeView img{ width: 0.3rem; height: 0.3rem; margin: auto;}
  .homeView .newInfo{display:flex;margin-top: 0.15rem;background:#ffffff}
  .homeView .newInfo .newImg{width:20%;text-align: center;}
  .homeView .newInfo img{width: 0.6rem; height: 0.6rem; border-radius: 50%; }
  /* .workBenchView .newInfo .newImg img{height:100%;width: 100%;} */
  .homeView .ul_mineView{}
  .homeView .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 100%; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.12rem; line-height: 0.2rem; padding: 0.05rem 0.2rem;}
  .homeView .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .homeView .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .homeView .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626;}
  .homeView .ul_mineView .li_mineView span{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }
</style>
