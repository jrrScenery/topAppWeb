<!--工作台-->
<template>
  <div class="homeView">
    <div class="swiper">
      <el-carousel arrow="always" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in imgObj" :key="item.id">
          <img :src="item.imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="text-align:center;margin-top:0.1rem" v-for="items in workBenchObj" :key="items.id" >
      <div v-if="items.arr.length!=0">
        <ul class="ul_workBench" >
          <template v-for="item in items.arr">
            <li class="li_workBench" :key="item.id" v-if="item.text!='考勤'">
              <router-link :to="{name:item.href,params:item.params}">
                <img :src="item.imgSrc" alt="">
              </router-link>
              <span>{{item.text}}</span>
            </li>
            <li class="li_workBench" :key="item.id" v-else>
              <router-link :to="{name:item.href,params:item.params}">
                <img  :src="item.imgSrc" alt="">
              </router-link>
              <span>{{item.text}}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
import Location from "@/utils/getRefreshLocation"
import BMap from 'BMap'
export default {
  name: 'workBench',

  components: {
  },

  data () {
    return {
      imgObj: [
        {imgSrc: require('@/assets/images/swiper_1.jpg')},
        {imgSrc: require('@/assets/images/swiper_2.jpg')},
        {imgSrc: require('@/assets/images/swiper_3.jpg')},
        {imgSrc: require('@/assets/images/swiper_4.jpg')},
        {imgSrc: require('@/assets/images/swiper_5.jpg')}
      ],
      workBenchObj: [
        {arr: []},
        {arr: []},
        {arr: []},
        {arr: []}
      ],
      location:[],
      latitude:'',
      longitude:'',
    }
  },
  mounted() {
    let _this = this; // 定时器
    this.getLocation();
    this.timer = setInterval(function() {
      _this.address = _this.getLocation(); // =>获取位置的方法
    }, 1000*60*60);
  },
  activated(){
    this.workBenchObj = [
        {arr: []},
        {arr: []},
        {arr: []},
        {arr: []}
    ];
    this.getWorkBenchObj();  
  },
  created(){
    this.getWorkBenchObj();  
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
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/kq.png'), text: '考勤',href: 'attendence',params: {type: 'my'},display:true};
          this.workBenchObj[3].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          // this.workBenchObj[3].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '评价', href: 'rateTest',params: {type: 'my'},display:true};         
        }else{
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/kq.png'), text: '考勤',href: 'attendence',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          // this.workBenchObj[3].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '评价', href: 'rateTest',params: {type: 'my'},display:true};
        }
      }else{
        this.workBenchObj[0].arr[0] = {imgSrc: require('@/assets/images/my_2.png'), text: '我的事件', href: 'workBenchMyEvent',params: {type: 'my'},display:true};
        this.workBenchObj[0].arr[1] = {imgSrc: require('@/assets/images/my_3.png'), text: '我的项目', href: 'workBenchMyPro',params: {type: 'my'},display:true};
        if(n!=0){
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/kq.png'), text: '考勤',href: 'attendence',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          // this.workBenchObj[3].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '评价', href: 'rateTest',params: {type: 'my'},display:true};
        }else{
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true},
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/kq.png'), text: '考勤',href: 'attendence',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          // this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '评价', href: 'rateTest',params: {type: 'my'},display:true};
        }
      }
    },
    getLocation: function(type) {
      var self = this;
      self.type = type;
      let ua = navigator.userAgent.toLowerCase();
      if (/(Android)/i.test(ua)) {
        if (typeof android != "undefined") {
          if (typeof android.bdLocation == "function") {
            let location = android.bdLocation();
            if (JSON.stringify(location) != "{}") {
              let locationArr = location.split(",");
              self.latitude = locationArr[0];
              self.longitude = locationArr[1];
            } else {
              Location.getLocation(this.success);
            }
          } else {
            Location.getLocation(this.success);
          }
        } else {
          Location.getLocation(this.success);
        }
      } else {
        Location.getLocation(this.success);
      }
    },
    success: function(res) {
      let self = this;
      var lat = res.latitude; //gps经纬度或者高德经纬度
      var lng = res.longitude;
      let params = "&longitude="+lng+"&latitude=" +lat;
      fetch.get("?action=/workerposition/saveWorkerPosition", params).then(res => {
        // console.log("传参数啊啊啊啊", res);
      });
    },
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
          if(ar[0].split("：")[1]=='jingrr'){
            this.$router.push({name:"workBenchDeclare" , query:{num:objtmp.sn, type:objtmp.xinghao, firm:objtmp.factory,cityname:objtmp.city }})
          }
      // this.$router.push({name:"workBenchDeclare" , query:{num:objtmp.sn, type:objtmp.xinghao, firm:objtmp.factory,cityname:objtmp.city }})

    }
  },
  
  deactivated(){
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .homeView{ width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  .swiper img{width: 100%; height: 100%}
  .homeView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;font-size: 0.15rem}
  .homeView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
  .homeView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
  .homeView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
  .ul_workBench img{ width: 0.3rem; height: 0.3rem; margin: auto;}
  /* .homeView .newInfo{display:flex;margin-top: 0.15rem;background:#ffffff}
  .homeView .newInfo .newImg{width:20%;text-align: center;}
  .homeView .newInfo img{width: 0.6rem; height: 0.6rem; border-radius: 50%; } */
  /* .workBenchView .newInfo .newImg img{height:100%;width: 100%;} */
  /* .homeView .ul_mineView{}
  .homeView .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 100%; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.2rem; padding: 0.05rem 0.2rem;}
  .homeView .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .homeView .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .homeView .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626;} */
  .homeView .ul_mineView .li_mineView span{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }

.homeWarn >>> .el-dialog__body{padding: 0px 0px}
.homeWarn >>> .el-dialog__header{padding: 0px 0px 0px}
.homeWarn >>> .el-dialog__footer{padding: 0px 0px 0px}
.homeWarn >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}
.homeWarn >>>.imgView{display:flex;position: relative; width: 90%; height: 100%;background-color: #ffffff;padding-left:5%;padding-right: 5%}
.imgView >>>.imgViewCol{display: flex;align-items: center}
.homeWarn >>>.itemsView{display:flex;flex-direction:row;flex-wrap: wrap;color:#B22222;text-align:center;border-bottom:0.01rem solid #e5e5e5;}
.itemsView >>> .itemView{width: 25%}
.radioView{margin-left: 0.2rem;}
.optionTextView{word-wrap:break-word;word-break: break-all;white-space:normal;margin-right:0.2rem}

.homeWarn  .submit{position: relative;left: 0; right: 0; height: 0.4rem;bottom: 0;}
/* .submit >>> .el-form-item__content{margin: 0!important;}
.submit >>> .el-form-item__content .el-button{width: 50%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;} */
.homeWarn >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.homeWarn >>> .submit .el-button:hover{background: #ffffff;}
.homeWarn >>> .submit .onsubmit:hover{background: #2698d6;}
.homeWarn >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.homeWarn >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}

.dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
