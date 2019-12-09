<template>
    <div class="endSummaryView">
        <div class="serviceInfoCell">
            <div class="serviceInfoTit">用户及项目信息</div>
            <div class="serviceContent">
                <el-form :model="formData" ref="formData">
                    <div style="padding:0 0.1rem">
                        <ul class="tableTd">
                            <li>
                                <span>服务单号</span>
                                <span>{{formData.userAndPrjItem.serviceCd}}</span>
                            </li>
                            <li>
                                <span>项目编号</span>
                                <span>{{formData.userAndPrjItem.projectCode}}</span>
                            </li>
                            <li>
                                <span>项目名称</span>
                                <span>{{formData.userAndPrjItem.projectName}}</span>
                            </li>
                            <li>
                                <span>用户单位</span>
                                <span>{{formData.userAndPrjItem.customerName}}</span>
                            </li>
                            <li>
                                <span>联系人</span>
                                <span>{{formData.userAndPrjItem.realname}}</span>
                            </li>
                            <li>
                                <span>联系电话</span>
                                <span>{{formData.userAndPrjItem.contactMobile}}</span>
                            </li>
                            <li>
                                <span>事件编号</span>
                                <span>{{formData.userAndPrjItem.caseCd}}</span>
                            </li>
                            <li v-if="serviceType==2">
                                <span>工程师姓名</span>
                                <span>{{formData.userAndPrjItem.enginnername}}</span>
                            </li>
                        </ul>
                        <el-form-item v-if="serviceType==2" label="服务类型">
                            <el-col :span="15">
                                <el-select clearable placeholder="请选择服务类型" v-model="formData.serviceType" style="width:100%">
                                    <el-option v-for="item in serviceTypeArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.value">
                                </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="到场时间">
                            <el-col :span="15">
                                <el-date-picker
                                v-model="formData.userAndPrjItem.arriveTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="离场时间">
                            <el-col :span="15">
                                <el-date-picker
                                v-model="formData.userAndPrjItem.leaveTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <div v-if="serviceType==2">
                            <el-form-item label="实际实用工时">
                                <el-col :span="12">
                                <el-input v-model="formData.userAndPrjItem.realWork" placeholder="请输入使用工时" style="width:100%"></el-input>
                                </el-col>
                            </el-form-item>
                            <div class="article">{{content}}</div>
                            <el-form-item>
                                <el-input type="textarea" v-model="formData.userAndPrjItem.workContent" placeholder="请输入工作内容"></el-input>
                            </el-form-item>
                            <div class="article">{{result}}</div>
                            <el-form-item>
                                <el-radio-group v-for="item in workResultArr" :key="item.id" v-model="formData.workResult">
                                    <el-radio :label="item.DICTID" style="width:100%;margin-left:0.25rem">{{item.DICTNAME}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="textarea" v-model="formData.userAndPrjItem.problemPlan" placeholder="若存在问题及下一步计划：若顺利完成，则此项填无"></el-input>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item label="故障现象">
                                <el-input v-model="formData.userAndPrjItem.faultDesc" placeholder="请输入故障现象"></el-input>
                            </el-form-item>
                            <el-form-item label="分析诊断">
                                <el-input v-model="formData.userAndPrjItem.analysis" placeholder="请输入分析诊断"></el-input>
                            </el-form-item>
                            <el-form-item label="实施结果">
                                <el-input v-model="formData.userAndPrjItem.implementResult" placeholder="请输入实施结果"></el-input>
                            </el-form-item>
                            <el-form-item label="遗留问题及建议">
                                <el-input v-model="formData.userAndPrjItem.problemSuggest" placeholder="请输入遗留问题及建议"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="sendMessageView" v-if="isShow"><!-- v-show="isShow"-->
                        <div class="serviceInfoTit">服务单确认人信息</div>
                        <div class="des">若预选设置内没有需要选择的客户信息，工程师可直补充客户信息后点击“发送评价连接”。</div>
                        <el-form-item label="客户联系人" label-width="1.1rem">
                            <el-select v-model="customerForm.empname" filterable allow-create placeholder="请选择" @change="npmNameChange()">
                                <el-option 
                                    v-for="item in customerList" 
                                    :key="item.empid"
                                    :label="item.empname"
                                    :value="item.empname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客户联系人手机" label-width="1.1rem">
                            <el-input v-model="customerForm.mobileno" placeholder="请输入客户联系人手机" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="上传纸质服务单（选填）" label-width="1.8rem">
                            <img id="showpic" :src="uploadres" ref="showpic" class="imgout" @click="takePhoto">
                        </el-form-item>
                        <input id='docId' type="hidden" v-model ="formData.docId">
                    </div>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="serviceSubmitBtn" v-if="serviceStatus==='1'">
                        <el-button type="primary" @click="submitForm('formData')">提交</el-button>
                    </el-form-item>
                    <el-form-item class="serviceSubmitBtn" v-else>
                        <el-button v-if="serviceStatus=='6'" type="primary" disabled>客户已评价</el-button>
                        <el-button @click="submitSendForm('customerForm')" type="primary" v-else>{{submitName}}</el-button>
                    </el-form-item>                             
                </el-form>
            </div>
        </div>
        <!-- 点击客户远程确认及评价编辑客户信息 -->
        <div class="dialogdc">
            <el-dialog
                title="提示"
                :visible.sync="editCustomerInfoVisible"
                :show-close="false"
                width="90%"
                center>
                <el-form :model="formData" ref="formData">
                    <el-form-item label="客户联系人" label-width="1.1rem">
                        <el-select v-model="customerForm.empname" filterable allow-create placeholder="请选择" @change="npmNameChange()">
                            <el-option 
                                v-for="item in customerList" 
                                :key="item.empid"
                                :label="item.empname"
                                :value="item.empname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户联系人手机" label-width="1.1rem">
                        <el-input v-model="customerForm.mobileno" placeholder="请输入客户联系人手机" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="上传纸质服务单（选填）" label-width="1.8rem">
                        <img id="showpic1" :src="uploadres" ref="showpic1" class="imgout" @click="takePhoto">
                    </el-form-item>
                    <input id="docId1" type="hidden" v-model ="formData.docId">
                    <el-form-item class="submit">
                        <el-button @click="editCustomerInfoVisible=false" >取消</el-button>
                        <el-button type="primary" class="onsubmit" @click="submitSendForm()" >发送</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <!-- 短信提醒询问框phoneVisible -->
        <div class="dialogdc">
            <el-dialog
                title="提示"
                :visible.sync="phoneVisible"
                :show-close="false"
                width="80%"
                center>
                <el-form>
                    <div style="margin:0.2rem">
                        <span>已向客户发送短信提示进行客户评价，请协助提醒客户进行评价</span>
                    </div>
                    <el-form-item class="submit">
                        <el-button type="primary" class="onsubmit" @click="confirmSendSuccess()" >确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
import slacommon from "../../utils/slacommon.js"
export default {
    name: 'endSummaryView',

    components: {
    },
    data(){
        return{
            formData:{
                userAndPrjItem:{},
                serviceType:"",
                workResult:"",
                docId:'',
                // docId1:''
            },
            workResultInfo:'',
            workResultArr:[],
            serviceTypeArr:[],
            content:"工作内容",
            result:"工作结果",
            activeName:'second',
            isShow:false,
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            taskId:this.$route.query.taskId,
            serviceId:this.$route.query.serviceId,
            serviceType:this.$route.query.serviceType,
            type:this.$route.query.type,
            customerList:'',
            ifSendEvaluate:'',
            serviceStatus:'',
            phoneVisible:false,
            customerForm:{
                empname:'',
                mobileno:'',
                empId:''
            },
            submitName:'提交并发送客户评价连接',
            editCustomerInfoVisible:false,
            shortUrl:'',
            // radio:'0',
            uploadres:require('../../assets/images/takephoto.png')
        }
    },
    created(){
        this.getEndSummary();
        this.getWorkCustList();
    },
    mounted(){
        window.photoResult = this.getPhotoUrl;
    },
    methods:{     
         getWorkCustList(){
             fetch.get("?action=/work/getWorkCustList&WORK_ID="+this.workId).then(res=>{
                 console.log("getWorkCustList",res);
                 if(res.STATUSCODE=='0'){
                     this.customerList = res.data;
                 }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                 }
             })
         },
         npmNameChange(){
             for(let i =0;i<this.customerList.length;i++){
                 if(this.customerList[i].empname === this.customerForm.empname){
                     this.customerForm.mobileno = this.customerList[i].mobileno;
                     this.customerForm.empId = this.customerList[i].empid
                 }
             }
         },
        getEndSummary(){
            if(this.serviceType==2){
                fetch.get("?action=/work/GetOnsiteServiceFormInfo&CASE_ID="+this.$route.query.caseId+"&SERVICE_ID="+this.$route.query.serviceId).then(res=>{
                    // console.log("GetOnsiteServiceFormInfo",res);
                    this.formData.userAndPrjItem = res.DATA[0];
                    this.workResultInfo = res.DATA[0].workResult;
                    this.ifSendEvaluate = res.DATA[0].ifSendEvaluate;
                    this.serviceStatus = res.DATA[0].serviceStatus;
                    this.evaluateId = res.DATA[0].evaluateId;
                    if(res.DATA[0].serviceStatus==='2'){
                        if(res.DATA[0].ifSendEvaluate===1){ 
                            this.isShow = true;                       
                            this.submitName = "再次发送客户评价连接";
                        }else{
                            this.isShow = true;  
                            this.submitName = "发送客户评价连接";
                        }
                    }
                })
                fetch.get("?action=/system/getDict2&DICT_TYPE=NT_SERVICE_TYPE","").then(res=>{
                    console.log("serviceTypeArr",res);
                    this.serviceTypeArr = res.data;
                })
                fetch.get("?action=/system/getDict2&DICT_TYPE=NT_CASE_WORK_RESULT","").then(res=>{
                    console.log(res);
                    this.workResultArr = res.data;
                })
            }else{
                fetch.get("?action=/work/GetCaseroubleShootingServiceFormInfo&CASE_ID="+this.$route.query.caseId+"&SERVICE_ID="+this.$route.query.serviceId).then(res=>{
                    // console.log("GetCaseroubleShootingServiceFormInfo",res);
                    this.formData.userAndPrjItem = res.DATA[0];
                    this.workResultInfo = res.DATA[0].implementResult;
                    this.ifSendEvaluate = res.DATA[0].ifSendEvaluate;
                    this.serviceStatus = res.DATA[0].serviceStatus;
                    this.evaluateId = res.DATA[0].evaluateId;
                    if(res.DATA[0].serviceStatus==='2'){
                        if(res.DATA[0].ifSendEvaluate===1){ 
                            this.isShow = true;      
                            this.submitName = "再次发送客户评价连接";
                        }else{
                            this.isShow = true;   
                            this.submitName = "发送客户评价连接";
                        }
                    }
                })
            }
        },
        confirmSendSuccess(){
            this.getEndSummary();
            this.phoneVisible = false;
        },
        submitSendForm(){
            const loading = this.$loading({
                lock: true,
                text: '发送短信中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            if(!slacommon.customerInfoCheck(loading,this.customerForm)) return;
            let params = "&url=http://wxjfb.dcits.com/home/onsiteServiceInfo&CASE_ID="+this.caseId+
                "&SERVICE_ID="+this.serviceId+"&SERVICE_TYPE="+this.serviceType+
                "&evaluateId="+this.evaluateId+"&serviceType="+this.serviceType+
                "&workId="+this.workId+"&userId="+this.customerForm.empId;
            fetch.get("?action=/system/getShortUrl"+params).then(res=>{
                console.log("getShortUrl",res);
                if(res.STATUSCODE=='1'){
                    let shortUrl = res.shorturl;
                    console.log("customerPhone",this.customerForm.mobileno);
                    let content = "尊敬的客户您好，工程师已完成了现场实施，请您对我们的服务进行评价，谢谢！"+shortUrl
                    fetch.get("?action=/work/sendCustEvaluate&MOBILE="+this.customerForm.mobileno+"&CONTENT="+content+
                                "&SERVICE_TYPE="+this.serviceType+"&SERVICE_ID="+this.serviceId+
                                "&EMPNAME="+this.customerForm.empname+
                                "&serviceFile="+this.formData.docId).then(res=>{
                        console.log("sendCustEvaluate",res);
                        loading.close();
                        if(res.STATUSCODE=='0'){
                            this.editCustomerInfoVisible = false;
                            this.phoneVisible = true;
                        }else{
                            this.$message({
                                message:res.MESSAGE,
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                            });
                        }
                    })
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
        submitForm(formName){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    // if(!vm.check(loading)) return;
                    if(!slacommon.check(loading,this.formData,this.serviceType)) return;
                    var data = {};
                        data.serviceId = this.formData.userAndPrjItem.serviceId;
                        data.opFlg = 1;
                        data.customerId = this.formData.userAndPrjItem.customerId;
                    let temp = {};
                    temp.serviceId = this.formData.userAndPrjItem.serviceId;
                    temp.caseId=this.caseId;
                    if(vm.serviceType==2){
                        temp.serviceType = this.formData.serviceType;
                        temp.realWork = this.formData.userAndPrjItem.realWork;
                        temp.workContent = this.formData.userAndPrjItem.workContent;
                        temp.workResult = this.formData.workResult;
                        temp.problemPlan = this.formData.userAndPrjItem.problemPlan;
                    }else{
                        temp.faultDesc = this.formData.userAndPrjItem.faultDesc;
                        temp.analysis = this.formData.userAndPrjItem.analysis;
                        temp.implementResult = this.formData.userAndPrjItem.implementResult;
                        temp.problemSuggest = this.formData.userAndPrjItem.problemSuggest;
                    }
                    temp.arriveTime = this.formData.userAndPrjItem.arriveTime;
                    temp.leaveTime = this.formData.userAndPrjItem.leaveTime;
                    console.log(temp);
                    data.data=JSON.stringify(temp);
                    console.log(data);
                    let nowWorkId = vm.workId;
                    let nowCaseId = vm.caseId;
                    let nowtaskId = vm.taskId;
                    let type = vm.type;
                    if(vm.serviceType==2){
                        fetch.questionPost("?action=/work/UpdateSceneServiceFormInfo",data).then(res=>{
                            console.log("00000000000");
                            console.log("UpdateSceneServiceFormInfo",res);    
                            loading.close();
                            if(res.STATUSCODE=="0"){
                                this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                                });
                                vm.getEndSummary();
                                vm.editCustomerInfoVisible = true;
                            }else{
                                this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                                });
                            }
                        })
                    }else{
                        fetch.questionPost("?action=/work/UpdateCaseTroubleShootingServiceFormInfo",data).then(res=>{
                            console.log("UpdateCaseTroubleShootingServiceFormInfo",res);    
                            loading.close();
                            if(res.STATUSCODE=="0"){
                                this.$message({
                                    message:'提交成功',
                                    type: 'success',
                                    center: true,
                                    customClass: 'msgdefine'
                                });
                                vm.getEndSummary();
                                vm.editCustomerInfoVisible = true;
                            }else{
                                this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                                });
                            }       
                        })                     
                    }
                }
            })
        },
        takePhoto:function(){
            let ua = navigator.userAgent.toLowerCase();
            console.log(ua);
            if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
                var info={action:"takePhoto"}
                window.webkit.messageHandlers.ioshandle.postMessage({body: info});
            }else if(/(Android)/i.test(ua) && /mobile/i.test(ua)){
                var value = "{action:takePhoto}";
                android.getClient(value);
            }
        },
        getPhotoUrl: function(photodata){
            let loading = this.$loading({
                lock: true,
                text: '上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            var data=new FormData();
            data.append("FILETYPE","jpg")
            // data.append("FILE",'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==')
            data.append("FILE", photodata);
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            fetch.post("?action=upload",data,config).then(res=>{
                console.log("upload",res)
                if(res['STATUSCODE'] == '0'){
                    this.formData.docId= res.data.docId;
                    if(this.ifSendEvaluate===1){
                        // this.formData.docId= res.data.docId;
                        this.$refs.showpic.src = photodata;
                    }else{
                        // this.formData.docId1 = res.data.docId;
                        this.$refs.showpic1.src = photodata;
                    }
                    // this.$refs.showpic.src = photodata;
                }
                else{
                    this.$toast(res.MESSAGE);
                }
                loading.close();
            });
        },
    },
    beforeDestroy(){
        window.photoResult = null;
    }

}
</script>
<style scoped>
    .endSummaryView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.1rem}
    .serviceInfoCell{white-space:normal}
    .serviceInfoCell .serviceInfoTit{position: relative; line-height: 0.2rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
    .serviceInfoCell .serviceInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
    .serviceInfoCell .serviceInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
    /* .summaryView{margin:0.1rem;line-height: 0.2rem} */
    .serviceContent{background: #ffffff; color: #999999; padding: 0.1rem 0}
    .serviceContent >>> .el-form-item{border-bottom: 0.01rem; margin: 0.03rem 0;}
    .serviceContent >>> .el-form-item__label{font-size: 0.13rem; text-align: left}
    .article{line-height: 0.3rem; }
    .tableTd li{display: flex; line-height: 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .sendMessageView{padding: 0.1rem}
    .sendMessageView>>>.des{padding: 0.1rem}
    .dialogdc >>>.imgout{height:0.3rem;width:0.3rem;margin-left:0.2rem}

    .sendMessageView >>>.imgout{height:0.3rem;width:0.3rem;margin-left:0.2rem}
    .endSummaryView .dialogdc >>> .el-dialog__body{padding: 0px 0px}
  .endSummaryView .dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
  .endSummaryView .dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
  .endSummaryView .dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .endSummaryView .dialogdc >>> .submit .el-button:hover{background: #ffffff;}
  .endSummaryView .dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
  .endSummaryView .dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
  .endSummaryView .dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}

    .serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
    .serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #ffffff; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;z-index:1}

.takephbox{ padding-left: 10px;}
  .takephbox .imgout{ border:1px solid #ccc; width: 124px; height: 124px; margin-top: 10px;; padding: 1px; text-align: center;}
  .takephbox .imgout img{ height: 120px; width: auto; margin: 0 auto; max-width: 120px;}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>

