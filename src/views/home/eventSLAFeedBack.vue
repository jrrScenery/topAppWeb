<template>
    <div class="eventSLAfeedBack">
        <header-last :title="eventSLAfeedBackTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content">
            <div class="eventfeedbacktabheader">
                <el-row>
                    <el-col :span="7" style="text-align:left"> 反馈项</el-col>
                    <el-col :span="8">反馈时间</el-col>
                    <el-col :span="6">说明</el-col>
                    <el-col :span="3">状态</el-col>
                </el-row>
            </div>
            <div class="eventfeedbacktabdetail">
                <el-row v-for="item in eventFeedBackObj" :key="item.CHECK_CD"><!--这几条数据在一个json数组slaStatus中，workid相同。-->
                    <div v-if="item.CHECK_CD!=2&&item.CHECK_CD!=3">
                        <el-col :span="7"><div style="text-align:left">{{item.FEED_NAME}}</div></el-col>
                        <el-col :span="8" v-if="item.REACH_TIME!=null"><div style="font-size:0.13rem;line-height:0.2rem;">{{item.REACH_TIME}}</div></el-col>
                        <el-col :span="8" v-else><div style="font-size:0.13rem;line-height:0.2rem;">无</div></el-col>
                        <el-col :span="6" style="word-wrap: break-word;font-size:0.13rem;padding-right:5px;line-height:0.2rem;">{{item.FAIL_REASON}}</el-col><!--反馈说明-->
                        <el-col :span="3" style="float:right;color:#2698d6">
                        <div v-if="item.REACH_FLG=='0'" @click="dialogopen(item.CHECK_CD)">{{item.IF_REACH}}</div>
                        <div v-else style="color:#666666" >{{item.IF_REACH}}</div>
                        <!-- <div v-else-if="item.REACH_FLG=='2'" style="color:#666666" >{{item.IF_REACH}}</div>
                        <div v-else-if="item.REACH_FLG=='3'" @click="dialogopen(item.SORTNO)">{{item.IF_REACH}}</div> -->
                        </el-col>
                    </div>
                </el-row>
            </div>
        </div>
        <div class="eventslafeedbackdialog">
            <el-dialog :visible.sync="dialogVisible0" width="70%" :show-close=false class="dialog">
                <div>{{dialogtitle1}}</div>
                <el-form class="form1" style="color:#333333">
                    <el-form-item label="反馈人">
                        <el-input class="input1" :value="form.feedName" style="font-size:6px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="远程响应时间">
                        <el-date-picker
                            v-model="form.feedTime0"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button @click="dialogVisible0 = false">取消</el-button>
                    <el-button type="primary" class="onsubmit" @click="onSubmit(dialogtitle0,checkCd0)">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div class="eventslafeedbackdialog">
            <el-dialog :visible.sync="dialogVisible1" width="70%" :show-close=false class="dialog">
                <div>{{dialogtitle1}}</div>
                <el-form class="form1" style="color:#333333">
                    <el-form-item label="反馈人">
                        <el-input class="input1" :value="form.feedName" style="font-size:6px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="系统恢复时间">
                        <el-date-picker
                            v-model="form.feedTime1"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" class="onsubmit" @click="onSubmit(dialogtitle1,checkCd1)">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div class="eventslafeedbackdialog">
            <el-dialog :visible.sync="dialogVisible2" width="70%" :show-close=false class="dialog">
                <div>{{dialogtitle2}}</div>
                <el-form class="form1" style="color:#333333">
                    <el-form-item label="反馈人">
                        <el-input class="input1" :value="form.feedName" style="font-size:6px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="故障解决时间">
                        <el-date-picker
                            v-model="form.feedTime2"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="textarea" :rows="4" placeholder="请简要描述所做操作及处理结果。例：更换25盘柜上的13号硬盘后，存储状态恢复正常。" v-model="form.des1" style="font-size:6px"></el-input>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button @click="dialogVisible2 = false">取消</el-button>
                        <el-button type="primary" class="onsubmit" @click="onSubmit(dialogtitle2,checkCd2)">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div style="height:0.45rem"></div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
import footerHome from '../footer/footerHome'
export default {
    name: "eventSLAfeedBack",
    components: {
        headerLast,
        footerHome
    },
    data() {
        return{
            eventSLAfeedBackTit: "SLA反馈",
            dialogtitle0:"远程响应时间",
            dialogtitle1:"系统恢复时间",
            dialogtitle2:"故障解决时间",
            dialogVisible0: false,
            dialogVisible1: false,
            dialogVisible2:false,
            checkCd0:"",
            checkCd1:"",
            checkCd2:"",
            typeid: "",
            form:{
                feedName:'',
                feedTime0:'',
                feedTime1:'',
                feedTime2:'',
                des2:"",
            },
            eventFeedBackObj:[],
            caseId:this.$route.query.caseId
        }
    },
    created:function(){
        this.form.feedName = localStorage.getItem("realName");
        this.getSlaInfo();
    },
    methods:{
        getSlaInfo(){
            console.log(this.caseId);
            fetch.get("?action=/secondline/queryCaseSlaInfo&CASE_ID="+this.caseId,{}).then(res=>{
                // console.log("0000000000000000");
                console.log("queryCaseSlaInfo",res);
                if(res.STATUSCODE=="1"){
                    this. eventFeedBackObj = res.data;
                }
            })
        },
        onSubmit:function(dialogtitle,checkCd){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            var vm = this;
            let data = {};
            let slaData = {};
                data.caseId = this.caseId;
                data.dealPerson = localStorage.getItem("empId");
                data.logSource = "4";
                data.remark = dialogtitle+"时间";
                data.visibleFlg = "1";
                slaData.caseId = this.caseId;
                slaData.checkCd = checkCd;
                
                if(checkCd == "1"){
                    data.dealDate = this.form.feedTime0;
                    slaData.reachTime = this.form.feedTime0;
                }else if(checkCd == "4"){
                    data.dealDate = this.form.feedTime1;
                    slaData.reachTime = this.form.feedTime1;
                }else if(checkCd == "5"){
                    data.dealDate = this.form.feedTime2;
                    slaData.reachTime = this.form.feedTime2;
                    slaData.slaRemark = this.form.des2
                }
                console.log(data);
                console.log(slaData);
                var params = new URLSearchParams();
                params.append('data',JSON.stringify(data));
                params.append('slaData',JSON.stringify(slaData));
                fetch.post("?action=/secondline/saveCaseFeedback",params).then(res=>{
                    loading.close();
                    console.log(res);
                    if(res.STATUSCODE == "1"){
                        this.$message({
                            message:'提交成功',
                            type: 'success',
                            center: true,
                            customClass: 'msgdefine',
                            TimeRanges:'1000'
                        });
                        this.dialogVisible0=false;
                        this.dialogVisible1=false;
                        this.dialogVisible2=false;
                        vm.getSlaInfo();
                    }else{
                        this.$message({
                            message:res.MESSAGE,
                            type: 'error',
                            center: true,
                            customClass: 'msgdefine'
                        });
                        this.dialogVisible0=false;
                        this.dialogVisible1=false;
                        this.dialogVisible2=false;
                    }
                })
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
        dialogopen(checkCd) {
            this.form.feedTime=this.$options.methods.getTime();
            this.typeid = checkCd;
            if(checkCd == '1'){
                this.dialogVisible0 = true;
                this.checkCd0 = checkCd;
            }else if(checkCd == '4'){
                this.dialogVisible1 = true;
                this.checkCd1 = checkCd;
            }else if(checkCd=='5'){
                this.dialogVisible2 = true;
                this.checkCd2 = checkCd;
            }
        },
    }
}
</script>
<style scoped>
.eventSLAfeedBack{
    width: 100%;
    line-height: 0.3rem;
    color: #666666;
}
.eventfeedbacktabheader {
  text-align: center;
  padding: 0.15rem 0.1rem 0 0.2rem;
  line-height: 0.36rem;
  /* background: #ffffff; */
  color: #333333;
  font-size: 0.14rem;
  font-weight: bold;
}
.eventfeedbacktabdetail {
  text-align: center;
  padding-left: 0.2rem;
  padding-right: 0.1rem;
}
.eventfeedbacktabdetail el-row el-col {
  height: 0.16rem;
}
.el-dailog {
  margin:10px;
  /* padding-top: 10px */
}
.eventslafeedbackdialog .dialog>>> .el-dialog__header{padding-bottom: 0}
.eventslafeedbackdialog .dialog>>> .el-dialog__body{padding:0px 20px 20px; color:#606266;font-size:14px;}
.eventslafeedbackdialog>>>.el-form .el-form-item {
  font-size: 0.08rem;
}
.eventslafeedbackdialog  .submit{position: absolute;left: 0; right: 0; height: 0.4rem;}
.eventslafeedbackdialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.eventslafeedbackdialog >>> .submit .el-button:hover{background: #ffffff;}
.eventslafeedbackdialog >>> .submit .onsubmit:hover{background: #2698d6;}
.eventslafeedbackdialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.eventslafeedbackdialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
