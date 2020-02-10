<template>
    <div class="punchView">
        <header-last :title="punchTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="punchCard">
            <div class="locationLoading">
                <div>您当前位置为：{{address}}</div>
                <!-- <div>您当前驻场位置为:{{zcAddress}}</div> -->
                <div></div>
            </div>

            <div class="buttonDiv">
                <el-button class="punchButton" @click="punchCard('0')">{{workPunch}}</el-button>
                <el-button class="punchButton" @click="punchCard('1')">{{offPunch}}</el-button>
            </div>
            <!-- <div class="buttonDiv">
                <el-button class="punchButton" @click="punchCard">{{offPunch}}</el-button>
            </div> -->
            <div class="locationLoading">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div class="workTime">
                上午：9：00-12：00
            </div>
            <div class="workTime">
                下午：13：00-18：00
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
                    <el-button type="primary"  class="onsubmit"  @click="onSubmit()">提 交</el-button>
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
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
import BMap from 'BMap'
import LocationSdk from "@/utils/wxUtils"
export default {
    name:'punch',
    components:{
        headerLast
    },
    data(){
        return{
            punchTit:'打卡',
            zcInfo:null,  //驻场为空信息
            address:'',
            zcAddress:null,
            form:{
                radioItem:[]
            },
            location:[],
            warnVisible:false,
            wrongMessage:'',
            latitude:'',
            longitude:'',
            homeWarnFlag:false,
            questionObj:{},
            question:"",
            options:[],
            requestNum:0,
            activities:[
                {content:'上班打卡成功',timestamp:'2019-01-21 08:46'},
                {content:'下班打卡成功',timestamp:'2019-01-21 18:50'}
            ],
            workPunch:'上班打卡',
            offPunch:"下班打卡"
        }
    },
    created(){
        this.getLocation();
        if(this.$route.query.homeWarnFlag){
            this.homeWarnFlag = Boolean(this.$route.query.homeWarnFlag);
            this.getQuestion();
        }
    },
    methods:{
        getQuestion(){
            this.questionObj='';
            this.form.radioItem=[];
            this.warnVisible = false;
            fetch.get("?action=/risk/getQuestion",{}).then(res=>{
                console.log("queryQuestion",res);
                if(res.STATUSCODE=='1'){ 
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
        getNewQuestion(){//点击问题答错框确定按钮，关闭此弹框，显示问题界面
            this.requestNum+=1;  
            console.log("requestNum",this.requestNum);
            if(this.requestNum==1){
                this.getQuestion();
            }else if(this.requestNum==2){
                this.getQuestion();
            }else{//回答3道题，不管对错，进行到场反馈
                this.$message({
                    message:'打卡成功',
                    type: 'success',
                    center: true,
                    duration:2000,
                    customClass:'msgdefine'
                }); 
                this.requestNum = 0; 
                this.warnVisible = false;
                this.homeWarnFlag = false;
            }     
        },
        punchCard(){
            this.form={
                radioItem:[]
            };
            this.getLocation('refresh');
        },
        success:function(res){
            let self = this;
            var lat = res.latitude;//gps经纬度或者高德经纬度
            var lng = res.longitude;
            setTimeout(function () {
                self.gpsPoint = new BMap.Point(lng,lat);
                var convertor = new BMap.Convertor();
                var pointArr = [];
                    pointArr.push(self.gpsPoint);
                convertor.translate(pointArr, 1,5, function (point) {  
                    self.latitude = point.points[0].lat;
                    self.longitude = point.points[0].lng;
                    self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  
                    if(self.type==='refresh'){
                        self.postPunchInfo();
                    }
                    var geoc = new BMap.Geocoder(); 
                    geoc.getLocation(self.pointA, function(rs){
                        if(rs.surroundingPois.length!=0){
                            self.address = rs.surroundingPois[0].address+rs.surroundingPois[0].title;             
                        }else{
                            self.address = rs.address+rs.business;  
                        }
                    })  
                });
            },1000)
        },
        getLocation:function(type){
            var self = this;
            const loading = this.$loading({
                lock: true,
                text: '正在获取位置信息...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            // self.getZcLocationInfo();
            self.type = type;
            let ua = navigator.userAgent.toLowerCase();
            console.log("ua",ua);
            if(/(Android)/i.test(ua)){               
                if(typeof(android)!="undefined"){
                    loading.close();
                    if(typeof(android.bdLocation)=='function'){
                        let location = android.bdLocation(); 
                        if(JSON.stringify(location) != "{}"){
                            let locationArr = location.split(",") ;
                            self.latitude = locationArr[0];
                            self.longitude = locationArr[1];
                            if(type==='refresh'){
                                self.postPunchInfo();
                            }                           
                        }else{
                            LocationSdk.getLocation(this,this.success,loading)
                        }
                    }else{
                        LocationSdk.getLocation(this,this.success,loading)
                    }
                }else{
                    LocationSdk.getLocation(this,this.success,loading)
                }
            }else{
                LocationSdk.getLocation(this,this.success,loading)
            }
        },
        postPunchInfo(type){
            const loading = this.$loading({
                lock: true,
                text: '正在打卡',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let param = {latitude:this.latitude,longitude:this.longitude};
                fetch.get("?action=/attendance/savePunch",param).then(res=>{
                console.log("savePosition",res);
                loading.close();
                if(res.STATUSCODE=="1"){
                    this.homeWarnFlag = true;
                    this.getQuestion();
                }else{
                    this.$message({
                        message:"打卡失败！"+res.MESSAGE,
                        type: 'error',
                        center: true,
                        customClass:'msgdefine'
                    });
                }
            })
        },
        onSubmit(){
            var vm= this;
            if(vm.form.radioItem.length==0){
                this.$message({
                    message:'请选择答案',
                    type: 'warning',
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
                        if(vm.form.radioItem[i] == vm.options[j].OPTION_ID){
                            if(vm.options[j].IF_TRUE!="1"||(rightAnwser!=vm.selectAnwser)){
                                ifAnswerTrue = 0;
                            }
                        }
                    }
                }
                let params = {};
                params.excuteType = vm.questionObj.EXCUTE_TYPE;
                params.questionId = vm.questionObj.QUESTION_ID;
                params.answerIds = answerIds;
                params.ifAnswerTrue = ifAnswerTrue;
                let data = {};
                data.data = JSON.stringify(params);
                fetch.questionPost("?action=/risk/saveAnswer",data).then(res=>{
                    console.log("saveAnswer",res);
                    if(res.STATUSCODE=='1'){
                        vm.$message({
                            message:'打卡成功',
                            type: 'success',
                            center: true,
                            duration:2000,
                            customClass:'msgdefine'
                        });  
                        vm.requestNum = 0; 
                        vm.homeWarnFlag = false;
                    }else{
                        vm.warnVisible = true;
                        vm.wrongMessage = res.MESSAGE;  
                    }
                })
            }
        },
    }
}
</script>
<style scoped>
.punchView{width:100%;height: 100%;background: #ffffff}
.locationLoading{text-align: center;margin-top: 0.3rem}
.buttonDiv{text-align: center;margin: 0.5rem;display: flex;justify-content:center}
.punchButton{background: #2698d6;color: #ffffff;border-radius: 50%;width: 1.2rem;height: 1.2rem;}
.punchView .el-timeline{margin-left: 0.2rem;width: 50%}
.punchView .workTime{margin-left: 20%}
/* .punchView .el-timeline-item__content{width: 20%} */

/* .dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;} */

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