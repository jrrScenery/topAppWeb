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
            <li class="li_workBench" :key="item.id" v-if="item.text!='考勤打卡'">
              <router-link :to="{name:item.href,params:item.params}">
                <img :src="item.imgSrc" alt="">
              </router-link>
              <span>{{item.text}}</span>
            </li>
            <li class="li_workBench" :key="item.id" v-else @click="punchCard()">
              <img  :src="item.imgSrc" alt="">
              <span>{{item.text}}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div class="homeWarn">
      <el-dialog
          top="5%"
          width="100%"
          :visible.sync="homeWarnFlag"
          :show-close="false"
          :fullscreen="true"
          center>
          <el-form class="form1">
          <div>
            <div class="warnTextView">
                <li>每一次严谨，都是风险的消逝！</li>
                <li>风险事故猛于虎！请！立刻！马上！谨慎起来！</li>
            </div>
            <div class="imgView">
                <div class="imgViewCol"><img src="../../assets/images/warn.jpg" alt=""></div>
                <div class="imgViewCol"><img src="../../assets/images/prepare.jpg" alt=""></div>
                <div class="imgViewCol"><img src="../../assets/images/warnLogo.jpg" alt=""></div>           
            </div>
            <div class="itemsView">
                <div class='itemView'>评估能力</div>
                <div class='itemView'>了解环境</div>
                <div class='itemView'>分析关联</div>
                <div class='itemView'>评估风险</div>
                <div class='itemView'>重大变更</div>
                <div class='itemView'>书面确认</div>
                <div class='itemView'>数据重要</div>
                <div class='itemView'>备份核实</div>
            </div>
            <div style="text-indent: 2em;padding:0.1rem;color:#B22222">如果这道题你都答不出来，赶紧连线你的部门经理手把手教你操作。</div>
            <div style="text-indent: 2em;padding:0.1rem">{{question}}</div>
            <el-form-item prop="options" class="radioView">
                <el-checkbox-group 
                    v-model="form.radioItem" 
                    :min="0"
                    :max="4"
                    v-for="item in options" 
                    :key="item.OPTION_ID">
                    <el-checkbox :label="item.OPTION_ID"><div class="optionTextView">{{item.OPTION_NAME}}</div></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          </div>
          <el-form-item  class="submit">
              <!-- <el-button @click="questionVisible = false" >取 消</el-button> -->
              <el-button type="primary"  class="onsubmit"  @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
          </el-form>
      </el-dialog>
    </div>
    <!-- 打卡不再范围时询问框 -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="warnVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{desc}}</span>
          </div>
          <el-form-item class="submit">
            <el-button @click="warnVisible = false" >取 消</el-button>
            <el-button type="primary" class="onsubmit" @click="confirm()">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
import LocationSdk from "@/utils/wxUtils"
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
      differDistance:null,
      latitude:'',
      longitude:'',
      form:{
          radioItem:[]
      },
      homeWarnFlag:false,
      questionObj:{},
      question:"",
      options:[],
      warnVisible:false,
      zcInfo:null,  //驻场为空信息
      desc:"您当前不在驻场区域，无法进行打卡，是否进行情况说明？",
      isInPunchTime:false
    }
  },
  activated(){
    this.workBenchObj = [
        {arr: []},
        {arr: []},
        {arr: []},
        {arr: []}
    ];
    this.getWorkBenchObj();  
    if(this.$route.query.homeWarnFlag){
      this.homeWarnFlag = this.$route.query.homeWarnFlag;
      this.getQuestion();
    }
  },
  created(){
    var a = "08:30";
    var b = "18:30";
    var astr = a.split(":");
    var bstr = b.split(":");
    var aDate = new Date();
    var bDate = new Date();
    aDate.setHours(astr[0]);
    aDate.setMinutes(astr[1]);
    aDate.setSeconds('00');
    bDate.setHours(bstr[0]);
    bDate.setMinutes(bstr[1]);
    bDate.setSeconds('00');

    let befoream = aDate.getTime()-3*60*60*1000;
    console.log(new Date(befoream));
    console.log(bDate);
    // var b = new Date(d.getFullYear(),d.getMonth(),d.getDate(),a.slice(0,2),a.slice(3,5),a.slice(6,8))
    // console.log("b:",b.getHours()>d.getHours());
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
          // this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[2] = {imgSrc: require('@/assets/images/punch.png'), text: '考勤打卡',display:true};
        }else{
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          // this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/punch.png'), text: '考勤打卡',display:true};
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
          // this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/punch.png'), text: '考勤打卡',display:true};
        }else{
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true},
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          // this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '值班信息', href: 'workBenchWorkInfo',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/punch.png'), text: '考勤打卡',display:true};
          // this.workBenchObj[2].arr = []
        }
      }
    },
    punchCard(){
      console.log("00000000");
      this.form={
          radioItem:[]
      };
      var vm = this;
      this.getLocation();
    },
    getZcLocationInfo:function(){
      fetch.get("?action=/system/getProAttendanceAddress",{}).then(res=>{
        console.log("getProAttendanceAddress:",res);
        if(res.STATUSCODE=='1'){
          let location = res.data;
          this.location = location;
        }else{
          this.$message({
              message:res.MESSAGE+"发生错误",
              type: 'error',
              center: true,
              duration:1000,
              customClass: 'msgdefine'
          });
        }
      })
    },
    getLocation:function(){
      const loading = this.$loading({
        lock: true,
        text: '正在获取位置信息...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var self = this;
      self.getZcLocationInfo();
      function success(res){
        console.log("res",res);
        var lat = res.latitude;//gps经纬度
        var lng = res.longitude;
        setTimeout(function () {
          console.log("000");
          self.gpsPoint = new BMap.Point(lng,lat);
          var convertor = new BMap.Convertor();
          var pointArr = [];
              pointArr.push(self.gpsPoint);
              // console.log(pointArr);
          convertor.translate(pointArr, 1,5, function (point) {  
            console.log("111",point);
            self.latitude = point.points[0].lat;
            self.longitude = point.points[0].lng;
            self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  
            // console.log(JSON.stringify(self.location)); 
            if(self.location.length==0){
              self.zcInfo = '驻场地址为空，请填写说明并维护地址';
              self.desc = "您的驻场地址为空，无法进行打卡，是否进行情况说明？";
              self.warnVisible = true;  
            }else{
              for(let i=0;i<self.location.length;i++){
                if(self.location[i].LATITUDE!=null&&self.location[i].LONGITUDE!=null){
                  self.getDistance(self.location[i]);
                }
              }
            }
            if(self.differDistance&&self.differDistance<=self.distance/1000){
              let isInPunchTime = self.differTime(self.amStartTime,self.pmEndTime);
              if(isInPunchTime){
                self.postPunchInfo();
              }
              // self.postPunchInfo();
            }else{
              self.warnVisible = true;      
            }
            var geoc = new BMap.Geocoder(); 
            geoc.getLocation(self.pointA, function(rs){
              console.log("rs:",rs);
              if(rs.surroundingPois.length!=0){
                self.address = rs.surroundingPois[0].address+rs.surroundingPois[0].title;             
              }else{
                self.address = rs.address+rs.business;  
              }
            })  
          });
        },1000)
      }
      LocationSdk.getLocation(success,loading)
    },
    // 测量百度地图两个点间的距离
   getDistance:function (location) {
     let latitude = location.LATITUDE;
     let longitude = location.LONGITUDE;
     let addressId = location.ADDRESS_ID;
     var map = new BMap.Map('')
     var pointB = new BMap.Point(parseFloat(longitude), parseFloat(latitude))  // 店铺的经纬度
     var distance = (map.getDistance(this.pointA, pointB) / 1000).toFixed(2) // 保留小数点后两位
    //  return distance    
     if(this.differDistance!=null){
       if(distance<this.differDistance){
         this.differDistance = distance;
         this.addressId = addressId;
         this.amStartTime = location.amStartTime;
         this.pmEndTime = location.pmEndTime;
       }
     }else{
       this.differDistance = distance;
       this.addressId = addressId;
       this.distance = location.distance;
       this.amStartTime = location.amStartTime;
       this.pmEndTime = location.pmEndTime;
     }
   },
    //工程师操作时间差计算
    differTime:function(startTime,endTime){
      let strstart = startTime.split(":");
      let strend = endTime.split(":");
      let amDate = new Date();
      let bmDate = new Date();
      let c = new Date();
      amDate.setHours(strstart[0]);
      amDate.setMinutes(strstart[1]);
      amDate.setSeconds('00');
      bmDate.setHours(strend[0]);
      bmDate.setMinutes(strend[1]);
      bmDate.setSeconds('00');
      let befoream = new Date(amDate.getTime()-3*60*60*1000);
      let afterpm = new Date(bmDate.getTime()+3*60*60*1000);
      console.log("amDate:"+amDate);
      console.log("bmDate:"+bmDate);
      console.log("befoream:"+befoream);
      console.log("afterpm:"+afterpm);
      let amdiffer1 = c.getTime()-befoream.getTime();
      let amdiffer2 = amDate.getTime()-c.getTime();
      let pmdiffer1 = c.getTime()-bmDate.getTime();
      let pmdiffer2 = afterpm.getTime()-c.getTime();
      console.log("amdiffer1",amdiffer1);
      console.log("amdiffer2",amdiffer2);
      console.log("pmdiffer1",pmdiffer1);
      console.log("pmdiffer2",pmdiffer2);
      if((amdiffer1>0&&amdiffer2>0)||(pmdiffer1>0&&pmdiffer2>0)){ 
        return true
      }else{
        console.log("ssssssssss");
        this.zcInfo = '当前不在打卡时间范围内，请填写说明';
        this.desc = "当前不在打卡时间范围内，无法进行打卡，是否进行情况说明？";
        this.warnVisible = true;  
      }
    },
   confirm(){
     this.warnVisible=false;
     this.$router.push({name:'punchFailShow',query:{lat:this.latitude,lng:this.longitude,address:this.address,zcInfo:this.zcInfo}})
   },
   getQuestion(){
     fetch.get("?action=/risk/getQuestion",{}).then(res=>{
      console.log("queryQuestion",res);
      if(res.STATUSCODE=='1'){
          this.$message({
            message:'打卡成功',
            type: 'success',
            center: true,
            duration:1000,
            customClass:'msgdefine'
          });  
        this.question = res.data.QUESTION;
        this.options = res.data.options;
        this.questionObj = res.data;
      }else{
        this.$message({
          message:res.MESSAGE+"发生错误",
          type: 'error',
          center: true,
          customClass: 'msgdefine'
        });
      }
    })
   },
    postPunchInfo(){
      let param = {latitude:this.latitude,longitude:this.longitude,address:this.address,addressId:this.addressId,flg:1};
      fetch.get("?action=/risk/savePosition",param).then(res=>{
        console.log("savePosition",res);
        // loading.close();
        if(res.STATUSCODE=="1"){
          this.homeWarnFlag = true;
          this.getQuestion();
        }else{
          this.$message({
            message:'打卡失败',
            type: 'error',
            center: true,
            customClass:'msgdefine'
          });
        }
      })
    },
    onSubmit(formName){
      let vm= this;
      if(vm.form.radioItem.length==0){
          this.$message({
              message:'请选择答案',
              type: 'error',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
          })
      }else{
        let ifAnswerTrue = 1;
        let rightAnwser = 0;
        let answerIds = '';
        for(let i = 0;i<vm.options.length;i++){
            if(vm.options[i].IF_TRUE=="1"){
                rightAnwser = rightAnwser+1;
            }
        }
        for(let i = 0;i<vm.form.radioItem.length;i++){
            vm.selectAnwser = vm.form.radioItem.length;
            if(i==vm.form.radioItem.length-1){
                answerIds+=vm.form.radioItem[i]
            }else{
                answerIds+=vm.form.radioItem[i]+","
            }
        }
        for(let i = 0;i<vm.form.radioItem.length;i++){
            for(let j =0;j<vm.options.length;j++){
                if(vm.form.radioItem[i] == this.options[j].OPTION_ID){
                    if(vm.options[j].IF_TRUE!="1"||(rightAnwser!=vm.selectAnwser)){
                        ifAnswerTrue = 0;
                    }
                }
            }
        }
        let data = {};
        // data.workId = vm.workId;
        data.excuteType = vm.questionObj.EXCUTE_TYPE;
        data.questionId = vm.questionObj.QUESTION_ID;
        data.answerIds = answerIds;
        data.ifAnswerTrue = ifAnswerTrue;
        var params = new URLSearchParams();
        params.append("data",JSON.stringify(data));
        console.log("params",params);
        fetch.post("?action=/risk/saveAnswer",params).then(res=>{
            console.log("saveAnswer",res);
            if(res.STATUSCODE=='1'){
                this.$message({
                    message:'回答正确',
                    type: 'success',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
                vm.homeWarnFlag = false;
                // vm.onUndertake();
            }else{
                this.$message({
                    message:res.MESSAGE,
                    type: 'error',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
            }
        })
      }
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
    console.log('移除');
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
