<template>
    <div class="customerEditRateView">    
        <div class="serviceInfoCell">
            <div class="serviceContent">
                <el-form :model="formData" ref="formData">
                    <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                        <el-form-item>
                            <div class="star">
                                <span class="starTit">{{i+1}}.{{item.question.questionComment}}</span>
                                <el-rate v-if="item.question.questionComment2"
                                        v-model="item.scoreval" disabled>
                                </el-rate>
                            </div>
                        </el-form-item>
                        <div class="improve" v-if="item.scoreval<4&&item.question.questionComment2">
                            <span>{{item.question.questionComment2}}</span>
                            <div class="improveCell">
                                <el-form-item>
                                    <el-checkbox-group v-model="item.aroptschked">
                                        <el-checkbox v-for="itemoption in item.options" :key="itemoption.optionId" :label="itemoption.optionId" disabled>{{itemoption.optionComment}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item v-else-if="item.question.questionComment2==null">
                            <el-input type="textarea" v-model="formData.otherResult" placeholder="请输入其他想法和建议" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div style="margin:0.1rem">客户签名</div>
                    <div v-if="formData.data.imgStr">
                        <img style="height:2.5rem;" v-bind:src="formData.data.imgStr" alt="">
                    </div>
                    <div v-else><img style="height:0.5rem;" src="" alt=""></div>
                    <!-- <add-signature :title="addSignatureTit" :queryData="searchData" @searchPro="signature"></add-signature> -->
                    <ul class="signature">
                        <el-form-item label="工程师">
                            <div>{{formData.data.engineername}}</div>
                        </el-form-item>
                    </ul>
                    <!-- <div style="height: 0.6rem;"></div> -->
                    <!-- <el-form-item class="serviceSubmitBtn" v-if="!signImg">
                        <el-button @click="submitForm('formData')">提交</el-button>
                    </el-form-item> -->
                </el-form>
                
            </div>
        </div>
        <!-- 点击客户远程确认及评价编辑客户信息 -->
        <!-- <div class="dialogdc">
        <el-dialog
            title="提示"
            :visible.sync="editCustomerInfoVisible"
            :show-close="false"
            width="80%"
            center>
            <el-form>
                <el-form-item label="客户名称:" label-width="0.8rem" style="margin:0.1rem 0">
                    <el-input class="customerInput" v-model="formData.customerName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系方式:" label-width="0.8rem" style="margin-bottom:0.1rem">
                    <el-input class="customerInput" v-model="formData.customerPhone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" class="onsubmit" @click="sendPhoneMessage()" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        </div> -->
        <!-- 短信提醒询问框phoneVisible -->
        <!-- <div class="dialogdc">
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
        </div> -->
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
import addSignature from '../../components/addSignature'
export default {
    name:'customerEditRate',
    components:{
        addSignature
    },
    data(){
        return{
            addSignatureTit:'添加签名',
            searchData:[],
            formData:{
                optionOption:[],
                question:[],
                scoreOption:[],
                data:'',
                aroptschked:[],
                otherResult:'',
                // customerName:'',
                // customerPhone:''
            },
            score:[],
            evaluateval:[],
            scoreOption:[],
            shortUrl:'',
            signImg:"",
            activeName:'third',
            // phoneVisible:false,
            // editCustomerInfoVisible:false,//点击客户远程确认及评价编辑客户信息是否显示
            serviceCd:'',//服务单编号
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            evaluateId:this.$route.query.evaluateId,
            serviceType:this.$route.query.serviceType,
            serviceId:this.$route.query.serviceId,
            taskId:this.$route.query.taskId,
            type:this.$route.query.type
        }
    },
    created:function(){
        let vm= this;
        console.log(this.evaluateId);        
        fetch.get("?action=/work/GetClientReview&evaluateId="+this.evaluateId+"&serviceType="+this.serviceType).then(res=>{
            console.log("GetClientReview",res);
            console.log("aaaaa");
            if("0" == res.STATUSCODE){
                this.scoreOption = res.scoreOption;
                let jsonres= res;
                this.formData.data = res.DATA[0];
                this.signImg = res.DATA[0].imgStr;
                // this.formData.customerPhone = res.DATA[0].contactMobile;
                this.caseNo = res.DATA[0].caseCd;
                this.serviceCd = res.DATA[0].serviceCd;
                // this.formData.customerName = res.DATA[0].customerName;
                let tmpjsonval =[];
                jsonres.question.forEach(function(v,i,ar){
                let tmpobj = {};
                tmpobj.question= v;
                tmpobj.options = jsonres.optionOption.filter(function(item){return v.questionId == item.questionId})
                tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
                tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
                tmpobj.scoreval = vm.getScore(jsonres.scoreOption,v.questionId);
                tmpjsonval.push(tmpobj);
                })
                this.evaluateval = tmpjsonval;
                console.log("1111111");
                console.log(this.evaluateval);
            }
        })
    },
    methods:{   
        // editCustomerInfo(){
        //     this.editCustomerInfoVisible = true;
        // },        
        // sendPhoneMessage(){       
        //     const loading = this.$loading({
        //         lock: true,
        //         text: '发送短信中...',
        //         spinner: 'el-icon-loading',
        //         background: 'rgba(255, 255, 255, 0.3)'
        //     });
        //     this.editCustomerInfoVisible = false;
        //     console.log("serviceType",this.serviceType)
        //     if(this.serviceType==2){
        //         if(!this.check(loading)) return false;
        //     }else if(this.serviceType==1){
        //         if(!this.checkGz(loading)) return;
        //     }
        //     let params = "&url=http://wxjfb.dcits.com/home/onsiteServiceInfo&CASE_ID="+this.caseId+
        //         "&SERVICE_ID="+this.serviceId+"&SERVICE_TYPE="+this.serviceType+
        //         "&evaluateId="+this.evaluateId+"&serviceType="+this.serviceType+
        //         "&workId="+this.workId;
        //     fetch.get("?action=/system/getShortUrl"+params).then(res=>{
        //         console.log("getShortUrl",res);
        //         this.shortUrl = res.shorturl
        //     })           
        //     this.phoneVisible = true;
        //     console.log("customerPhone",this.formData.customerPhone);
        //     let content = "尊敬的客户您好，工程师已完成服务单号为"+this.serviceCd+"的现场实施，请您关注微信公众号神州信息锐行服务，点击菜单评价进行用户评价"+this.shortUrl
        //     fetch.get("?action=/risk/sendPhone&mobile="+this.formData.customerPhone+"&content="+content).then(res=>{
        //         console.log("sendPhone",res);
        //         loading.close();
        //         if(res.STATUSCODE=='1'){
        //             this.phoneVisible = true;
        //         }else{
        //             this.$message({
        //             message:res.MESSAGE,
        //             type: 'error',
        //             center: true,
        //             customClass: 'msgdefine'
        //             });
        //         }
        //     })
        // },
        // confirmSendSuccess(){
        //     this.phoneVisible = false;
        //     this.$router.push({name:'serviceList',query:{caseId:this.caseId,workId:this.workId,taskId:this.taskId}});
        // },
        signature(imgStr){
            this.formData.data.imgStr = imgStr;
        },
        getScore(scoreOption,questionId){
            var score = 0;
            scoreOption.forEach(function(v,i,ar){
                if(v.questionId == questionId){
                    if(v.checkFlg==1){
                        if(score<v.optionScore)
                        score = v.optionScore;
                    }
                }
            })
            return score;
        },
        getScoreOpinionId(scoreOption,questionId,scoreval){
            let optionId;
            scoreOption.forEach(function(v,i,ar){
                if(v.questionId == questionId&&v.optionScore==scoreval){
                    optionId = v.optionId;
                    return false;
                }
            })
            return optionId;
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
                    if(vm.serviceType==2){
                        if(!vm.check(loading)) return;
                    }else if(vm.serviceType==1){
                        if(!vm.checkGz(loading)) return;
                    }
                    let detailArray = new Array();
                    var totalScore = 0;
                    var failFlg = 0;
                    var countScore = 0;
                    var returnFlg = 0;
                    vm.evaluateval.forEach(function(v,i,ar){
                        let options = v.options;
                        
                        if(v.question.questionComment2){
                            if(v.scoreval>0){
                                totalScore+=v.scoreval;
                                countScore += 1;
                                if(v.scoreval<3) failFlg = 1;
                                var scoreOptionId = vm.getScoreOpinionId(vm.scoreOption,v.question.questionId,v.scoreval);
                                    var temp1 = {};     
                                        temp1.evaluateId=vm.evaluateId;
                                        temp1.questionId=v.question.questionId;
                                        temp1.optionId=scoreOptionId;   
                                        detailArray.push(temp1);
                            }else{
                                returnFlg = 1;
                                vm.$message({
                                    message:'请给相关项打分',
                                    type: 'warning',
                                    center: true,
                                    customClass:'msgdefine'
                                });
                                loading.close();
                                return false;
                            }
                        }                
                        v.aroptschked.forEach(function(item,i,ar){
                            options.forEach(function(items,i,ar){
                                if(items.optionId == item){
                                    let temp2 = {};
                                    temp2.evaluateId = vm.evaluateId;
                                    temp2.questionId = items.questionId;
                                    temp2.optionId = item;
                                    detailArray.push(temp2);
                                }
                            }) 
                        })      
                        if(vm.formData.otherResult){
                            if(v.question.questionComment2==null){
                                var temp3={};
                                temp3.evaluateId = vm.evaluateId;
                                temp3.questionId = v.question.questionId;
                                temp3.otherResult=vm.formData.otherResult;
                                detailArray.push(temp3);
                            }
                        }
                    })
                    if(returnFlg){
                        loading.close();
                        return;
                    }
                    if(!vm.formData.data.imgStr){
                        vm.$message({
                            message:'请签名',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    let avgScore = totalScore/countScore;
                    let postData = {}
                    postData.workId = vm.workId;
                    postData.evaluateStatus = 2;
                    postData.evaluateId = vm.evaluateId;
                    postData.totalScore = avgScore;
                    postData.EvaluateResult = JSON.stringify(detailArray);
                    postData.failFlg = failFlg;
                    postData.workId = vm.workId;
                    fetch.questionPost("?action=/work/SubmitClientReview",postData).then(res=>{
                        console.log("SubmitClientReview",res);
                        // loading.close();
                        if(res.STATUSCODE=="0"){
                            vm.updateServiceWithSignature(loading);
                        }else{
                            loading.close();
                            this.$message({
                            message:res.MESSAGE+"发生错误",
                            type: 'error',
                            center: true,
                            customClass: 'msgdefine'
                            });
                        }
                        
                    })
                }
            })
        },
        updateServiceWithSignature(loading){
            let vm= this;
            let data = {};
            data.opFlg = 5;
            data.customerId = this.formData.data.customerId;
            let temp = {};
            temp.serviceId = this.formData.data.serviceId;
            temp.caseId=this.caseId;
            if(this.serviceType==2){
                temp.serviceType = this.serviceType;
                temp.realWork = this.formData.data.realWork;
                temp.workContent = this.formData.data.workContent;
                temp.workResult = this.formData.data.workResult;
                temp.problemPlan = this.formData.data.problemPlan;
            }else{
                temp.faultDesc = this.formData.data.faultDesc;
                temp.analysis = this.formData.data.analysis;
                temp.implementResult = this.formData.data.implementResult;
                temp.problemSuggest = this.formData.data.problemSuggest;
            }
            temp.arriveTime = this.formData.data.arriveTime;
            temp.leaveTime = this.formData.data.leaveTime;
            temp.imgStr=this.formData.data.imgStr;
            temp.engineer = localStorage.getItem('empId');
            data.data = JSON.stringify(temp);
            let nowWorkId = this.workId;
            let nowCaseId = this.caseId;
            let nowtaskId = this.taskId;
            if(this.serviceType==2){
                fetch.questionPost("?action=/work/UpdateSceneServiceFormInfo",data).then(res=>{
                    loading.close();
                    console.log(res);
                    if(res.STATUSCODE=="0"){
                        this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                        });
                        if(vm.type=='SLA'){
                            vm.$router.replace({name:'workBenchSLAfeedback',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}});
                            vm.$router.go(-1)
                        }else{
                            setTimeout(function(){vm.$router.replace({ name: 'serviceList',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}})},1000);
                            vm.$router.go(-1)
                        }
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
                    loading.close();
                    console.log(res);
                    if(res.STATUSCODE=="0"){
                        this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                        });
                        if(vm.type=='SLA'){
                            vm.$router.replace({name:'workBenchSLAfeedback',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}});
                            vm.$router.go(-1)
                        }else{
                            setTimeout(function(){vm.$router.replace({ name: 'serviceList',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}})},1000);
                            vm.$router.go(-1)
                        }
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
        },
        check(loading){
            console.log(this.formData.data.serviceType);
            if(this.formData.data.serviceType==null){
                this.$message({
                    message:'请选择服务类型!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.arriveTime==null){
                this.$message({
                    message:'请填写到场时间!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.leaveTime==null){
                this.$message({
                    message:'请填写离场时间!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.realWork==null){
                this.$message({
                    message:'请填写实际工时!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.workContent==null){
                this.$message({
                    message:'请填写工作内容!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.workResult==null){
                this.$message({
                    message:'请选择工作结果!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.problemPlan==null){
                this.$message({
                    message:'请填写存在问题!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }        
            return true;
        },

        checkGz(loading){
            console.log("11111111111");
            console.log(this.formData.data.leaveTime==null);
            if(this.formData.data.leaveTime==null){
                this.$message({
                    message:'请填写离场时间!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.implementResult==null){
                this.$message({
                    message:'请填写实施结果!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.data.problemSuggest==null){
                this.$message({
                    message:'请填写遗留问题及建议!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true;
        }
        
    }

    
}
</script>

<style scoped>
.serviceInfoCell{width: 100%; position: relative;background-color: #ffffff;margin-top:0.05rem}
.serviceContent{background: #ffffff; color: #999999; }
.editorView{margin: 0 0.1rem}
.editorView .star{display: flex;line-height: 0.2rem;}
.editorView .star .starTit{ display: inline-block; width: 1.5rem;font-size: 0.14rem}
.editorView .improve span{line-height: 0.02rem;font-size: 0.13rem}
.editorView .improve >>> .el-checkbox{display: block; margin: 0;line-height: 0.1rem; font-size: 0.13rem; color: #999999;}

.improveCell span{ color: #666;word-wrap: break-word}
.el-checkbox__input.is-disabled+span.el-checkbox__label{color: #666!important;}

.signature .el-form-item{overflow: hidden;zoom:1; margin: 0; color: #2698d6; border-top: 0.01rem solid #e1e1e1;border-bottom: 0.01rem solid #e1e1e1;margin: 0 0.1rem}
.signature .el-form-item div{color: #333333; }
.signature .el-form-item .sign img{width: 100%; display: block; flex-grow: 1;}
.serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;z-index:1}

  .sendMessage {
    padding: 0.1rem;
    margin-bottom: 0.1rem;
    float: right;
  }
  .customerEditRateView .dialogdc >>> .el-dialog__body{padding: 0px 0px}
  .customerEditRateView .dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
  .customerEditRateView .dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
  /* .customerEditRateView .dialogdc >>> .el-form-item{margin-bottom: 0.1rem}; */
  .customerEditRateView .dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .customerEditRateView .dialogdc >>> .submit .el-button:hover{background: #ffffff;}
  .customerEditRateView .dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
  .customerEditRateView .dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
  .customerEditRateView .dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
  .customerEditRateView .customerInput{margin-left:5%;width: 90%;margin-bottom: 0.05rem}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>


