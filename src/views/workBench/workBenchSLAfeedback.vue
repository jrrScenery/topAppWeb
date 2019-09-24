<!--SLA反馈-->
<template>
  <div class="workBenchSLAfeedback">
    <header-last :title="SLAfeedbackTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="tabheader">
        <el-row>
          <el-col :span="7" style="text-align:left"> 反馈项</el-col>
          <el-col :span="8">反馈时间</el-col>
          <el-col :span="6">说明</el-col>
          <el-col :span="3">状态</el-col>
        </el-row>
      </div>
      <div class="tabdetail">
        <el-row v-for="item in SLAObj" :key="item.slaTypeId"><!--这几条数据在一个json数组slaStatus中，workid相同。-->
          <el-col :span="7"><div style="text-align:left">{{item.slaType}}</div></el-col>
          <el-col :span="8" v-if="item.operateDate!=null"><div style="font-size:0.13rem;line-height:0.2rem;">{{item.operateDate}}</div></el-col>
          <el-col :span="8" v-else><div style="font-size:0.13rem;line-height:0.2rem;">无</div></el-col>
          <el-col :span="6"><div style="word-wrap: break-word;font-size:0.13rem;padding-right:5px;line-height:0.2rem;">{{item.feedbackDescription}}</div></el-col><!--反馈说明-->
          <el-col :span="3" style="float:right;color:#2698d6" >
            <div v-if="item.ifFeedback==0" @click="dialogopen(item.slaTypeId)">反馈</div>
            <div v-if="item.ifFeedback!=0" style="color:#666666" >已反馈</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="SLAdialog">
      <el-dialog :visible.sync="dialogVisible0" width="80%" :show-close=false class="dialog">
        <el-form class="form1" style="color:#333333">
          <el-form-item label="反馈时间">
            <el-input class="input1" :value="date" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-if="typeid==6" type="textarea" :rows="4" placeholder="请简要描述所做操作及处理结果。例如，更换25盘柜上的13号硬盘后，存储状态恢复正常。" v-model="form.des1" style="font-size:6px"></el-input>
            <el-input v-else  type="textarea" placeholder="请填写说明" v-model="form.des1" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button @click="dialogVisible0 = false">取消</el-button>
            <el-button type="primary" class="onsubmit" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="SLAdialog">
      <el-dialog title="任务反馈" :visible.sync="dialogVisible1" width="80%">
        <el-form class="form1">
          <el-form-item  label="原因">
            <el-radio-group v-model="form.des2" style="font-size:6px">
              <el-radio :label="1">故障定位不准确</el-radio><br>
              <el-radio :label="2">现场备件不可用</el-radio><br>
              <el-radio :label="3">操作失误</el-radio><br>
              <el-radio :label="4">客户取消任务</el-radio><br>
              <el-radio :label="5">实施时间不够</el-radio><br>
              <el-radio :label="6">其他</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="解决不成功原因">
            <el-input type="textarea" :rows="3" placeholder="请填写说明" v-model="form.des3" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item  class="submit">
            <el-button @click="dialogVisible1 = false" >取 消</el-button>
          <el-button type="primary"  class="onsubmit"  @click="onSubmit">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="dialogdc">
      <el-dialog
        top="5%"
        width="100%"
        :visible.sync="showModal"
        :show-close="false"
        :fullscreen="true"
        center>
        <div class="countDiv">
          <button class="countButton">{{seconds}}</button>
        </div>
        <div><img :src="require('../../assets/images/'+bgDef)" alt="" style="background-repeat:no-repeat;background-size:contain;display:block"></div>
      </el-dialog>
    </div>
    <div class="dialogdc">
      <el-dialog
        top="5%"
        width="100%"
        :visible.sync="checkdcFlag"
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
                <div class="imgViewCol"><img src="../../assets/images/taskWork.jpg" alt=""></div>
                <div class="imgViewCol"><img src="../../assets/images/warnLogo.jpg" alt=""></div>           
            </div>
            <div class="itemsView">
                <div class='itemView'>确认对象</div>
                <div class='itemView'>核实环境</div>
                <div class='itemView'>每步核对</div>
                <div class='itemView'>检查结果</div>
                <div class='itemView'>改前备份</div>
                <div class='itemView'>改后记录</div>
                <div class='itemView'>意外发生</div>
                <div class='itemView'>升级确认</div>
            </div>
            <div style="text-indent: 2em;padding:0.1rem;color:#B22222">如果这道题你都答不出来，赶紧连线你的部门经理手把手教你操作。</div>
            <div style="text-indent: 2em;padding:0.1rem">{{questionObj.QUESTION}}</div>
            <el-form-item prop="options" class="radioView">
                <el-checkbox-group 
                    v-model="form.option" 
                    :min="0"
                    :max="4"
                    v-for="item in questionObj.options" 
                    :key="item.OPTION_ID">
                    <el-checkbox :label="item.OPTION_ID"><div class="optionTextView">{{item.OPTION_NAME}}</div></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </div>
        <el-form-item  class="submit">
            <el-button type="primary"  class="onsubmit" @click="questionSubmit('form')">提 交</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>      
    </div>
    <!-- 答错问题提示 -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="warnVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{wrongMessage}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="getNewQuestion()">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 离场创建服务单弹框 -->
    <div class="dialogdc">
      <el-dialog
        :visible.sync="leaveVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <el-form-item label="请选择创建以下何种类型服务单" class="radioView">
            <el-radio-group v-model="form.leaveradio" @change="leaveRadio()">
                <div style="line-height:0.3rem">
                  <el-radio :label="2">创建现场服务单</el-radio>
                </div>
                <div style="line-height:0.3rem">
                  <el-radio :label="1">创建case故障服务单</el-radio>
                </div>
                <!-- <div style="line-height:0.3rem">
                  <el-radio :label="3">客户不在实施现场</el-radio>
                </div> -->
            </el-radio-group>
            <div style="line-height:0.2rem;margin-right:0.1rem;margin-bottom:0.1rem">注：未完成的服务单请在服务单列表进行完成</div>
          </el-form-item>
          <!-- <el-form-item>
          </el-form-item> -->
        </el-form>
      </el-dialog>
    </div>

    <!-- 请先完成结果反馈再进行离场feedbackVisible -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="feedbackVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{feedbackDesc}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="feedbackVisible = false" >确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 工单类型为“现场实施”或“现场信息搜集”，工程师点击“离场”逻辑弹框workTypeVisible -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="workTypeVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{workTypeWarn}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="workTypeVisible = false" v-if="workTypeStatus==1">确 定</el-button>
            <el-button type="primary" class="onsubmit" @click="confirm()" v-if="workTypeStatus==2">是</el-button>
            <el-button @click="onrefuse()" v-if="workTypeStatus==2">否</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headerLast from "../header/headerLast";
import global_ from "../../components/Global";
import fetch from "../../utils/ajax";
import loadingtmp from "@/components/load/loading";
import BMap from 'BMap'
import LocationSdk from "@/utils/wxUtils"
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "workBenchSLAfeedback",
  components: {
    headerLast
  },
  data() {
    return {
      SLAfeedbackTit: "SLA反馈",
      dialogVisible0: false,
      dialogVisible1: false,
      checkdcFlag:false,//问题显示
      warnVisible:false,//答错问题提示
      showModal: false,//图片显示
      leaveVisible:false,
      feedbackVisible:false,//先完成结果反馈再进行离场
      workTypeVisible:false,//工单类型为“现场实施”或“现场信息搜集”，工程师点击“离场”逻辑弹框
      radio: 0,
      typeid: "",
      form:{
        des1:"",
        des2:"",
        des3:"",
        option:[],
        leaveradio:0
      },
      date:"",
      status: "",
      SLAObj: [],
      workInfo:{},
      differDistance:0,
      isDcFeedBack:false,//是否已经到场操作
      workId:this.$route.query.workId,
      caseId:this.$route.query.caseId,
      taskId:this.$route.query.taskId,
      clientHeight:'',
      checkedCities1: ['上海', '北京'],
      cities: cityOptions,
      targetLatitude:this.$route.query.latitude,
      targetLongitude:this.$route.query.longitude,
      bgDef:'',
      questionObj:'',
      selectAnwser:0,
      noQuestionIds:'',
      wrongMessage:'',
      requestNum:0,
      requireArriveTime:'',
      seconds:5,
      type:this.$route.query.type,
      feedbackNum:0,
      feedbackDesc:"请先完成结果反馈再进行离场（故障解决，故障解决不成功，任务已完成，任务未完成四选一）",
      workTypeWarn:'',
      workTypeStatus:'',//离场进行工单类型的判断（未备件整理；未使用件）
      hasService:''//离场有无服务单判断，有服务单:1；无服务单:0
    };
  },
  props: {
    styleObj: { // 用于承接样式类
      type: Object,
      default: function () {
        return {
          position: 'fixed',
          bottom: 0,
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(113,111,111,0.5)'
        }
      }
    }
  },

  created: function() {
    this.getWorkInfo();
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      this.clientHeight = (document.documentElement.clientHeight-90)+'px'
    }
    this.randomPic();
  },
  
  methods: {   
    //动态获取背景图片功能
    randomPic:function() {
      this.imgRandom = {
        "1": {
          suprizeUrl: "dc1.jpg",
          href: "",
        },
        "2": {
          suprizeUrl: "dc2.jpg",
          href: "",
        },
        "3": {
          suprizeUrl: "dc3.jpg",
          href: "",
        }
      };
      let randomKeys = ["1", "2", "3"];
      let index = Math.floor(Math.random() * 3);
      this.bgDef = this.imgRandom[randomKeys[index]].suprizeUrl;
      console.log("bgDef",this.bgDef);
    },
    getWorkInfo:function(){
      console.log("workId",this.$route.query.workId)
      fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res => {
        console.log("getWorkInfo",res);
        if(res.STATUSCODE=='0'){ 
          this.workInfo = res.DATA[0];
          let baseInfo = res.DATA[0];
          this.SLAObj = baseInfo.slaStatus;
          for(let i=0;i<this.SLAObj.length;i++){
            if(this.SLAObj[i].slaTypeId == 5&& this.SLAObj[i].ifFeedback=='1'){
              this.isDcFeedBack = true;
            }
          }
          this.requireArriveTime = res.DATA[0].requireArriveTime.replace(/\-/g, "/");
          this.workTypeStatus = res.DATA[0].leave[0].STATUS;
          this.hasService = res.DATA[0].leave[0].HAS_SERVICE;
        }
      });
    },
    getLocation:function(slaTypeId){
      const loading = this.$loading({
        lock: true,
        text: '正在获取位置信息...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var self = this;
      function success(res){
        var lat = res.latitude;//gps经纬度
        var lng = res.longitude;
        // setTimeout(function () {
          self.gpsPoint = new BMap.Point(lng,lat);
          var convertor = new BMap.Convertor();
          var pointArr = [];
              pointArr.push(self.gpsPoint);
          convertor.translate(pointArr, 1,5, function (point) {  
            console.log("111",point);
            self.latitude = point.points[0].lat;
            self.longitude = point.points[0].lng;
            self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  
            self.differDistance = self.getDistance(self.targetLatitude,self.targetLongitude);
            if(self.differDistance<=4){
              if(slaTypeId==5){
                let now = new Date();
                let currentdate = self.formatDateTime(now);//到场时间限制
                self.intervalTime(self.requireArriveTime,currentdate);
                // self.clientHeight = (document.documentElement.clientHeight-90)+'px'
                // self.randomPic();//随机选取图片
                // self.showModal = true;//显示随机图片10s
                // self.requestNum=0;//问题接口请求次数
                // const TIME_COUNT = 5;
                // self.seconds = 5;
                // setInterval(()=>{
                //   if(self.seconds > 0 && self.seconds <= TIME_COUNT){
                //     self.seconds--;
                //   }
                // },1000)
                // setTimeout(()=>{
                //   self.showModal = false;//10s后关闭随机图片框
                //   self.checkdcFlag = true;//显示问题弹框
                //   self.getQuestionArrive();//调用问题接口，获取问题
                // },5000) 
              }else if(slaTypeId==7){
                self.leavebjCheck();
              }
            }else{
              self.$message({
                message:'当前不在case所在地点，无法操作',
                type: 'error',
                center: true,
                duration:2000,
                customClass: 'msgdefine'
              })
            }
          })
        // },1000)
      }
      LocationSdk.getLocation(this,success,loading)//通过h5获取位置信息
    },
    // 测量百度地图两个点间的距离
    getDistance:function (latitude,longitude) {
      var map = new BMap.Map('')
      var pointB = new BMap.Point(parseFloat(longitude), parseFloat(latitude))  // 店铺的经纬度
      var distance = (map.getDistance(this.pointA, pointB) / 1000).toFixed(2) // 保留小数点后两位
      return distance
    },
    formatDateTime:function(date) {  
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;  
    },

    //满足到场时间要求
    inHours(){
      let self = this;
      self.clientHeight = (document.documentElement.clientHeight-90)+'px'
      self.randomPic();//随机选取图片
      self.showModal = true;//显示随机图片10s
      self.requestNum=0;//问题接口请求次数
      self.seconds = 5;
      setInterval(()=>{
        if(self.seconds > 0 && self.seconds <= TIME_COUNT){
          self.seconds--;
        }
      },1000)
      const TIME_COUNT = 5;
      setTimeout(()=>{
        self.showModal = false;//10s后关闭随机图片框
        self.checkdcFlag = true;//显示问题弹框
        self.getQuestionArrive();//调用问题接口，获取问题
      },5000)
    },
    //不满足到场时间要求
    notify(startTime,hours){
      this.$notify.info({
        title: '提示',
        message: '预计到场时间为'+startTime+'，当前不在任务要求到场时间范围内，无法操作;如果“要求到场时间”设置不正确，请联系CMO修改',
        type: 'warning',
        duration:0
      });
    },
    //工程师操作时间差计算
    intervalTime:function(startTime,endTime){
      console.log(startTime);
      console.log(endTime);
      var self = this;
      function tranDate (time) {
        return new Date(time.replace(/-/g, '/')).getTime();
      }
      let control1 = startTime.substring(0,10)+" 08:00:00"; // 限制时间08:00
      let control2 = startTime.substring(0,10)+" 19:00:00";//显示时间19:00
      let time1 = new Date(control1);
      let time2 = new Date(time1.getTime()+24*60*60*1000);//次日08:00点
      let control3 = this.formatDateTime(time2);//显示时间次日08：00
      let restrict1 = tranDate(control1);//转换限制时间为08:00的时间格式
      let restrict2 = tranDate(control2);//转换限制时间为19:00的时间格式
      let restrict3 = tranDate(control3);//转换限制时间为次日08：00的时间格式
      let expect = tranDate(startTime);//预计到场时间

      let date1 = new Date(startTime);  //预计到场时间
      let date2 = new Date(endTime);    //当前时间
      let date3 = Math.abs(date2.getTime() - date1.getTime());  //时间差的毫秒数
       //计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000));
       //计算出小时数
      let leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))+days*24;
      console.log(expect);
      console.log(restrict1);
      console.log(restrict2);
      console.log(restrict3);
      console.log(hours);
      if(expect>=restrict1&&expect<=restrict2){//如果在预计到场当日的08：00-19：00
        if(hours<=3){
          console.log("0000000000");
          self.inHours();
        }else{
          console.log("11111111111");
          self.notify(startTime,hours);
        }
      }else if(expect>=restrict2&&expect<=restrict3){//19:00-次日08:00
        if(hours<=6){
          console.log("222222222222");
          self.inHours();
        }else{
          console.log("333333333333");
          self.notify(startTime,hours);
        }
      }else if(expect<restrict1){
        if(hours<=6){
          console.log("44444444444");
          self.inHours();
        }else{
          console.log("5555555555555");
          self.notify(startTime,hours);
        }
      }else{
        console.log("6666666666666");
        self.notify(startTime,hours);
      }
      // if(days==0&&hours<=2){
      //   this.clientHeight = (document.documentElement.clientHeight-90)+'px'
      //   this.randomPic();//随机选取图片
      //   this.showModal = true;//显示随机图片10s
      //   this.requestNum=0;//问题接口请求次数
      //   const TIME_COUNT = 5;
      //   setTimeout(()=>{
      //     this.showModal = false;//10s后关闭随机图片框
      //     this.checkdcFlag = true;//显示问题弹框
      //     this.getQuestionArrive();//调用问题接口，获取问题
      //   },5000) 
      // }else{
      //   this.$notify.info({
      //     title: '提示',
      //     message: '当前不在任务要求到场时间范围内，无法操作;如果“要求到场时间”设置不正确，请联系CMO修改',
      //     type: 'warning',
      //     duration:0
      //   });
      // }
    },
    getTime:function() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
      return currentdate;
    },
    getQuestionArrive(){//获取问题
      this.questionObj='';
      this.form.option=[];
      this.warnVisible = false;
      fetch.get("?action=/risk/queryQuestionArrive&workId="+this.workId+"&noQuestionIds="+this.noQuestionIds,{}).then(res=>{
        console.log("queryQuestionArrive",res);
        if(res.STATUSCODE=='1'){
          this.questionObj = res.data;               
        }
      })
    },
    dialogopen(slaTypeId) {
      this.date=this.$options.methods.getTime();
      this.typeid = slaTypeId;
      if (slaTypeId == 8 || slaTypeId == 10) {
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){
          if(this.isDcFeedBack){
            this.dialogVisible1 = true;
          }else{
            this.$message({
              message:'请先进行到场操作',
              type: 'warning',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
            })
          }
        }else{
          this.dialogVisible1 = true;
        }
      }else if(slaTypeId == 6 || slaTypeId == 9){
        console.log(slaTypeId);
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){
          if(this.isDcFeedBack){
            this.dialogVisible0 = true;
          }else{
            this.$message({
              message:'请先进行到场操作',
              type: 'warning',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
            })
          }
        }else{
          this.dialogVisible0 = true;
        }
      }else if(slaTypeId == 5){
        // let now = new Date();
        //     let currentdate = this.formatDateTime(now);//到场时间限制
        //     this.intervalTime(this.requireArriveTime,currentdate);
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){        
          //类型是到场逻辑处理
          this.getLocation(slaTypeId);
        }else{
          this.dialogVisible0 = true;
        }
      }else if(slaTypeId == 7){
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){
          this.getLocation(slaTypeId);
        }else{
          this.dialogVisible0 = true;
        }
      } 
      else {
        this.dialogVisible0 = true;
      }
    },
    //离场备件判断
    leavebjCheck(){
      if(this.workTypeStatus==1){
        this.workTypeVisible = true;
        this.workTypeWarn = '请先完成备件整理再进行离场反馈';
        return false;
      }else if(this.workTypeStatus==2){
        this.workTypeVisible = true;
        this.workTypeWarn = '请确认未使用件的真实性？';
        return false;
      }else{
        this.createService();
      }
    },
    //离场有无服务单逻辑判断
    createService(){
      if(this.hasService){
        //工程师必须反馈处理结果后（故障解决，故障解决不成功，任务已完成，任务未完成四选一完成SLA反馈），才可以点击“离场”反馈
        for(let i=0;i<this.SLAObj.length;i++){
          if(this.SLAObj[i].ifFeedback=='1'){
            if(this.SLAObj[i].slaTypeId =='6'||this.SLAObj[i].slaTypeId=='8'||this.SLAObj[i].slaTypeId=='9'||this.SLAObj[i].slaTypeId=='10'){
              this.feedbackNum++;
              break;
            }
          }
        }
        if(this.feedbackNum){
          this.dialogVisible0 = true;
        }else{
          this.feedbackVisible = true;
        }
      }else{
        this.leaveVisible = true;
      }
    },
    //点击离场，若无服务单则弹出创建服务单弹框；点击弹框单选按钮
    leaveRadio(){
      this.leaveVisible = false;
      if(this.form.leaveradio==1){//创建case故障服务单
        fetch.get("?action=/work/SubmitCaseTroubleShootingServiceFormInfo&CASE_ID="+this.caseId+"&WORK_ID="+this.workId+"&TASK_ID="+this.taskId).then(res=>{
          console.log(res);
          let data = res.TEMP;     
          this.$router.push({name: 'onsiteServiceInfo', query: {serviceId:data.serviceId,evaluateId:data.evaluateId,caseId:this.caseId,workId:this.workId,taskId:this.taskId,serviceType:this.form.leaveradio,type:'SLA'}})            
        })
      }else if(this.form.leaveradio==2){//创建现场服务单
        fetch.get("?action=/work/SubmitSceneServiceFormInfo&CASE_ID="+this.caseId+"&WORK_ID="+this.workId+"&TASK_ID="+this.taskId).then(res=>{
          console.log(res);
          let data = res.TEMP;
          this.$router.push({name: 'onsiteServiceInfo', query: {serviceId:data.serviceId,caseId:this.caseId,workId:this.workId,taskId:this.taskId,evaluateId:data.evaluateId,serviceType:this.form.leaveradio,type:'SLA'}})
        })
      }
    },
    questionSubmit(){//提交问题
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      if(vm.form.option.length==0){
        loading.close();
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
        for(let i = 0;i<vm.questionObj.options.length;i++){
          let rightAnwserObj = {};
          if(vm.questionObj.options[i].IF_TRUE=="1"){
              rightAnwser = rightAnwser+1;
              rightAnwserObj.OPTION_ID =vm.questionObj.options[i].OPTION_ID;
              rightAnwserObj.OPTION_NAME =vm.questionObj.options[i].OPTION_NAME; 
          }
        }
        for(let i = 0;i<vm.form.option.length;i++){
          vm.selectAnwser = vm.form.option.length;
          if(i==vm.form.option.length-1){
              answerIds+=vm.form.option[i]
          }else{
              answerIds+=vm.form.option[i]+","
          }
        }
        for(let i = 0;i<vm.form.option.length;i++){
          for(let j =0;j<vm.questionObj.options.length;j++){
              if(vm.form.option[i] == vm.questionObj.options[j].OPTION_ID){
                  console.log((vm.questionObj.options[j].IF_TRUE!="1")+","+(rightAnwser!=vm.selectAnwser));
                  if(vm.questionObj.options[j].IF_TRUE!="1"||(rightAnwser!=vm.selectAnwser)){
                      ifAnswerTrue = 0;
                  }
              }
          }
        }
        let data = {};
        data.workId = vm.workId;
        data.excuteType = vm.questionObj.EXCUTE_TYPE;
        data.questionId = vm.questionObj.QUESTION_ID;
        data.answerIds = answerIds;
        data.ifAnswerTrue = ifAnswerTrue;
        var params = new URLSearchParams();
        params.append("data",JSON.stringify(data));
        fetch.post("?action=/risk/saveAnswerArrive",params).then(res=>{
          loading.close();
          console.log("saveAnswerArrive",res);
          if(res.STATUSCODE=='1'){//问题回答正确，显示反馈框，进行到场反馈
              vm.checkdcFlag = false;
              vm.dialogVisible0 = true;
          }else{//问题回答错误，弹出弹框，提示回答错误并给出正确答案
            vm.warnVisible = true;
            vm.wrongMessage = res.MESSAGE;          
          }
        })
      }
    },
    getNewQuestion(){//点击问题答错框确定按钮，关闭此弹框，显示问题界面
      this.requestNum+=1;  
      if(this.requestNum==1){
        this.noQuestionIds +=this.questionObj.QUESTION_ID;
        this.getQuestionArrive();
      }else if(this.requestNum==2){
        this.noQuestionIds +=","+this.questionObj.QUESTION_ID;
        this.getQuestionArrive();
      }else{//回答3道题，不管对错，进行到场反馈
        this.warnVisible = false;
        this.checkdcFlag = false;
        this.dialogVisible0 = true;
      }
      
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      let params="&REASON="+this.form.des2+"&EXPLAIN="+this.form.des1+this.form.des3;
      fetch.get("?action=/work/UpdateWorkSLAStatus&WORK_ID="+vm.$route.query.workId+
      "&SLA_TYPE="+vm.typeid+"&OPERATE_DATE="+vm.date+params).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                this.dialogVisible0=false;
                this.dialogVisible1=false;
                vm.form.des1 = '';
                vm.form.des2 = '';
                vm.form.des3 = '';
                vm.getWorkInfo();
              }else{
                this.$message({
                  message:res.MESSAGE,
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
                this.dialogVisible0=false;
                this.dialogVisible1=false;
              }              
              console.log(res);
      });
    },
    confirm(){
      this.workTypeVisible = false;
      this.createService();
    },
    onrefuse(){
      this.workTypeVisible = false
      this.$router.push({name:'sparePartsSortOut',query:{caseId:this.caseId,workId:this.workId}})
    }
  }

  
};
</script>

<style scoped>
.workBenchSLAfeedback {width: 100%;line-height: 0.3rem;color: #666666;}
.tabheader {text-align: center;padding: 0.15rem 0.1rem 0 0.2rem;line-height: 0.36rem;color: #333333;font-size: 0.14rem;font-weight: bold;}
.tabdetail {text-align: center;padding-left: 0.2rem; padding-right: 0.1rem;}
.tabdetail el-row el-col {height: 0.16rem;}
.el-dailog {margin:10px;}
.SLAdialog .dialog>>> .el-dialog__header{padding-bottom: 0}
.SLAdialog .dialog>>> .el-dialog__body{padding:0px 20px 20px; color:#606266;font-size:14px;}
.SLAdialog>>>.el-form .el-form-item {font-size: 0.08rem;}
.SLAdialog>>>.el-radio { margin-top: 5px;font-size:6px}
.SLAdialog  .submit{position: absolute;left: 0; right: 0; height: 0.4rem;}
.SLAdialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.SLAdialog >>> .submit .el-button:hover{background: #ffffff;}
.SLAdialog >>> .submit .onsubmit:hover{background: #2698d6;}
.SLAdialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.SLAdialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
.self-modal{z-index: 3000;}

.dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}
.dialogdc >>>.imgView{display:flex;position: relative; width: 90%; height: 100%;background-color: #ffffff;padding-left:5%;padding-right: 5%}
.imgView >>>.imgViewCol{display: flex;align-items: center}
.dialogdc >>>.itemsView{display:flex;flex-direction:row;flex-wrap: wrap;color:#B22222;text-align:center;border-bottom:0.01rem solid #e5e5e5;}
.itemsView >>> .itemView{width: 25%}
.radioView{margin-left: 0.2rem;}
.optionTextView{word-wrap:break-word;word-break: break-all;white-space:normal;margin-right:0.2rem}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}

.countDiv{float:right;margin-top:0.2rem;font-size:0.16rem;margin-right:0.2rem}
.countButton{border-radius:50%;width:0.3rem;height:0.3rem;text-align:center;}
</style>
