<template>
    <div class="attendenceView">
        <header-last :title="attendenceTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div style="text-align:center;margin-top:0.1rem" v-for="items in obj" :key="items.id" >
            <div v-if="items.arr.length!=0">
                <ul class="ul_workBench">
                    <template v-for="item in items.arr">
                        <li class="li_workBench" :key="item.id" v-if="item.text!='打卡'"><!-- v-if="item.text!='打卡'"-->
                            <router-link :to="{name:item.href,params:item.params}">
                                <img :src="item.imgSrc" alt="">
                            </router-link>
                            <span>{{item.text}}</span>
                        </li>
                        <li class="li_workBench" :key="item.id" v-else @click="punchCard()">
                            <img :src="item.imgSrc" alt="">
                            <span>{{item.text}}</span>
                        </li>
                    </template>
                </ul>
                <!-- <ul class="ul_workBench" v-else>
                    <template v-for="item in items.arr">
                        <li class="li_workBench" :key="item.id" v-if="item.text=='打卡'" @click="punchCard()">
                            <img :src="item.imgSrc" alt="">
                            <span>{{item.text}}</span>
                        </li>
                    </template>
                </ul> -->
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
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
import BMap from 'BMap'
import LocationSdk from "@/utils/wxUtils"
export default {
    name:'attendence',
    components:{
        headerLast
    },
    data(){
        return{
            attendenceTit:'考勤',
            obj:[
                {arr:[]},
                {arr:[]},
            ],
            form:{
                radioItem:[]
            },
            // warnVisible:false,
            location:[],
            latitude:'',
            longitude:'',
            homeWarnFlag:false,
            questionObj:{},
            question:"",
            options:[],
            differDistance:null,
            isInPunchTime:false,
            LABOUR_RELATION:'',
            isZB:true
        }
    },
    beforeCreate(){
    },
    created(){
        let LABOUR_RELATION = localStorage.getItem("LABOUR_RELATION");
        if(LABOUR_RELATION==='ZB'){
            this.isZB = false
        }
        console.log("LABOUR_RELATION",LABOUR_RELATION);
        this.obj = [
            {arr: []},
            {arr:[]},
        ];
        this.getObj();
        if(this.$route.query.homeWarnFlag){
            this.homeWarnFlag = Boolean(this.$route.query.homeWarnFlag);
            this.getQuestion();
        }
    },
    methods:{
        getObj(){
            if(this.isZB){
                this.obj[0].arr[0]={imgSrc: require('@/assets/images/punch.png'), text: '打卡', href: 'punch',display:false};
                this.obj[0].arr[1]={imgSrc: require('@/assets/images/punchRecord.png'), text: '打卡记录', href: 'punchCardRecord',display:true};
                this.obj[0].arr[2] = {imgSrc: require('@/assets/images/makeupAttendence.png'), text: '补考勤', href: 'makeUpAttendence',display:true};
                this.obj[1].arr[0] = {imgSrc: require('@/assets/images/audit.png'), text: '审批', href: 'audit',display:true};
                this.obj[1].arr[1] = {imgSrc: require('@/assets/images/attendetail.png'), text: '员工打卡明细', href: 'checkAttenDetail',display:true};
            }else{
                this.obj[0].arr[0]={imgSrc: require('@/assets/images/punch.png'), text: '打卡', href: 'punch',display:false};
                this.obj[0].arr[1]={imgSrc: require('@/assets/images/punchRecord.png'), text: '打卡记录', href: 'punchCardRecord',display:true};
                this.obj[0].arr[2] = {imgSrc: require('@/assets/images/audit.png'), text: '审批', href: 'audit',display:true};
                this.obj[1].arr[0] = {imgSrc: require('@/assets/images/attendetail.png'), text: '员工打卡明细', href: 'checkAttenDetail',display:true};
            }
        },
        confirm(){
            this.warnVisible=false;
        },
        getQuestion(){
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
        punchCard(){
            this.form={
                radioItem:[]
            };
            this.getLocation();
        },
        postPunchInfo(){
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
        getLocation:function(){
            var self = this;
            const loading = this.$loading({
                lock: true,
                text: '正在获取位置信息...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            function success(res){
                console.log("res",res);
                var lat = res.latitude;//gps经纬度
                var lng = res.longitude;
                setTimeout(function () {
                    self.gpsPoint = new BMap.Point(lng,lat);
                    var convertor = new BMap.Convertor();
                    var pointArr = [];
                        pointArr.push(self.gpsPoint);
                    convertor.translate(pointArr, 1,5, function (point) {  
                        console.log("111",point);
                        self.latitude = point.points[0].lat;
                        self.longitude = point.points[0].lng;
                        self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  
                        self.postPunchInfo();
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
            LocationSdk.getLocation(this,success,loading)
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
                // if(ifAnswerTrue===0){
                //     this.$message({
                //         message:'回答错误，请继续答题',
                //         type: 'warning',
                //         center: true,
                //         duration:2000,
                //         customClass: 'msgdefine'
                //     })
                //     return false
                // }
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
                        vm.homeWarnFlag = false;
                    }else{
                        vm.$message({
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
    }
}
</script>
<style scoped>
.attendenceView{width: 100%;height:100%}
.attendenceView .ul_workBench{display: flex;flex-wrap: wrap;padding: 0.15rem 0.1rem;margin-top: 0.01rem;background: #ffffff;font-size: 0.15rem;height:100%}
.attendenceView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
.attendenceView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
.attendenceView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
.ul_workBench img{ width: 0.3rem; height: 0.3rem; margin: auto;}

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