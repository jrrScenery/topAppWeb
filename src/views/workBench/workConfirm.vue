<template>
    <div class="workConfirmView">
        <header-last :title="workConfirmTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="attention">为确保用户业务连续性及数据安全，请现场工程师务必就以下事项与用户详细沟通，用户确认后方可开始操作：</div>
        <div class="confirmView">
            <el-form :model="formData" ref="formData">
                <div style="padding:0 0.1rem">
                    <el-form-item>
                        <div>1.用户已将维护窗口安排在业务非高峰时段</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[0].ifY1" @change="changeIfY1"></el-checkbox>
                            <div>操作时间</div>
                        </div>
                        <el-form-item label="从：" style="margin-bottom:0.05rem">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.operationStarttime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择开始时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="至：">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.operationEndtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择结束时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[0].ifF1" @change="changeIfF1"></el-checkbox>
                        </div> 
                    </el-form-item>
                    <el-form-item>
                        <div>2.用户已申请停机维护窗口</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[1].ifY2" @change="changeIfY2"></el-checkbox>
                            <div>停机时间</div>
                        </div>
                        <el-form-item label="从：" style="margin-bottom:0.05rem">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.stopStarttime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择开始时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="至：">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.stopEndtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择结束时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>                    
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[1].ifF2" @change="changeIfF2"></el-checkbox>
                        </div> 
                    </el-form-item>
                    <el-form-item>
                        <div>3、对于涉及重启或配置变更的服务实施</div>
                        <div>用户事先完成了操作系统的备份工作</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[2].ifY3" @change="changeIfY3"></el-checkbox>
                            <div>最近一次备份时间：</div>
                        </div>
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.lastbackupTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>   
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[2].ifF3" @change="changeIfF3"></el-checkbox>
                        </div>                     
                    </el-form-item>
                    <el-form-item>
                        <div>4.服务开始前，用户保留了相关配置信息和文档</div>
                        <div>用于可能必要的恢复</div>
                        <el-form-item label="是：">
                            <el-checkbox v-model="checked[3].ifY4" @change="changeIfY4"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="否：">
                            <el-checkbox v-model="checked[3].ifF4" @change="changeIfF4"></el-checkbox>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <div>5.用户在服务开始前完成了业务相关数据备份</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[4].ifY5" @change="changeIfY5"></el-checkbox>
                            <div>最近一次备份时间：</div>
                        </div>       
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.beforeLastbackupTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>  
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[4].ifF5" @change="changeIfF5"></el-checkbox>
                        </div>               
                    </el-form-item>
                    <el-form-item>
                        <div>6.用户针对这些备份做过备份恢复测试</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[5].ifY6" @change="changeIfY6"></el-checkbox>
                            <div>备份测试时间：</div>
                        </div>       
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.backuptestTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>  
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[5].ifF6" @change="changeIfF6"></el-checkbox>
                        </div>               
                    </el-form-item>
                    <div style="margin:0 0.1rem">神州数码工程师已按规范要求就本次服务内容、影响和风险与用户进行了沟通，同意神州数码工程师开始服务实施。</div>
                    
                    <el-form-item label="日期：">
                        <el-col :span="15">
                                <el-date-picker
                                v-model="formData.caseServiceQuestion.serviceTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width:100%">
                                </el-date-picker>
                        </el-col>
                    </el-form-item>  
                </div>
                <div style="height: 0.6rem;"></div>
                <el-form-item class="serviceSubmitBtn">
                    <el-button @click="submitForm('formData')">提交</el-button>
                </el-form-item>
            </el-form>
        </div> 
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
export default {
    name:'workConfirm',
    components:{
        headerLast
    },
    data(){
        return{
            workConfirmTit:'实施前确认',
            formData:{
                caseServiceQuestion:{
                },
            },
            searchData:[],
            caseId:this.$route.query.caseId,
            workId:this.$route.query.workId,
            serviceId:this.$route.query.serviceId,
            serviceType:this.$route.query.serviceType,
            taskId:this.$route.query.taskId,
            evaluateId:this.$route.query.evaluateId,
            workTypeId:this.$route.query.workTypeId,
            type:this.$route.query.type,
            // popBg: false,
            checked:[
                {ifY1:false,ifF1:false},
                {ifY2:false,ifF2:false},
                {ifY3:false,ifF3:false},
                {ifY4:false,ifF4:false},
                {ifY5:false,ifF5:false},
                {ifY6:false,ifF6:false}
            ], 
        }
    },
    created:function(){
        this.getCaseServiceQuestion();
    },
    methods:{
        getCaseServiceQuestion(){
            fetch.get("?action=/work/getCaseServiceQuestion&CASE_ID="+this.caseId+"&SERVICE_ID="+this.serviceId+"&SERVICE_TYPE="+this.serviceType).then(res=>{
                console.log(res)
                if(this.serviceType==2){
                    this.formData.caseServiceQuestion = res.dataService[0];        
                }else{
                    this.formData.caseServiceQuestion = res.dataDealService[0];
                }
                if(this.formData.caseServiceQuestion.serviceTime == null){
                    this.formData.caseServiceQuestion.serviceTime = new Date();
                }
                if(this.formData.caseServiceQuestion.numberIf1==1){
                    this.checked[0].ifY1 = true;
                }else if(this.formData.caseServiceQuestion.numberIf1==0){
                    this.checked[0].ifF1 = true;
                }
                if(this.formData.caseServiceQuestion.numberIf2==1){
                    this.checked[1].ifY2 = true;
                }else if(this.formData.caseServiceQuestion.numberIf2==0){
                    this.checked[1].ifF2 = true;
                }
                if(this.formData.caseServiceQuestion.numberIf3==1){
                    this.checked[2].ifY3 = true;
                }else if(this.formData.caseServiceQuestion.numberIf3==0){
                    this.checked[2].ifF3 = true;
                }
                if(this.formData.caseServiceQuestion.numberIf4==1){
                    this.checked[3].ifY4 = true;
                }else if(this.formData.caseServiceQuestion.numberIf4==0){
                    this.checked[3].ifF4 = true;
                }
                if(this.formData.caseServiceQuestion.numberIf5==1){
                    this.checked[4].ifY5 = true;
                }else if(this.formData.caseServiceQuestion.numberIf5==0){
                    this.checked[4].ifF5 = true;
                }
                if(this.formData.caseServiceQuestion.numberIf6==1){
                    this.checked[5].ifY6 = true;
                }else if(this.formData.caseServiceQuestion.numberIf6==0){
                    this.checked[5].ifF6 = true;
                }
                console.log(this.formData.caseServiceQuestion);
            })
        },
        changeIfY1(val){
            if(val==true){
                this.checked[0].ifY1 = true;
                this.checked[0].ifF1 = false;
            }
        },
        changeIfF1(val){
            if(val==true){
                this.checked[0].ifF1 = true;
                this.checked[0].ifY1 = false;
            }
        },
        changeIfY2(val){
            if(val==true){
                this.checked[1].ifY2 = true;
                this.checked[1].ifF2 = false;
            }
        },
        changeIfF2(val){
            if(val==true){
                this.checked[1].ifF2 = true;
                this.checked[1].ifY2 = false;
            }
        },
        changeIfY3(val){
            if(val==true){
                this.checked[2].ifY3 = true;
                this.checked[2].ifF3 = false;
            }
        },
        changeIfF3(val){
            if(val==true){
                this.checked[2].ifF3 = true;
                this.checked[2].ifY3 = false;
            }
        },
        changeIfY4(val){
            if(val==true){
                this.checked[3].ifY4 = true;
                this.checked[3].ifF4 = false;
            }
        },
        changeIfF4(val){
            if(val==true){
                this.checked[3].ifF4 = true;
                this.checked[3].ifY4 = false;
            }
        },
        changeIfY5(val){
            if(val==true){
                this.checked[4].ifY5 = true;
                this.checked[4].ifF5 = false;
            }
        },
        changeIfF5(val){
            if(val==true){
                this.checked[4].ifF5 = true;
                this.checked[4].ifY5 = false;
            }
        },
        changeIfY6(val){
            if(val==true){
                this.checked[5].ifY6 = true;
                this.checked[5].ifF6 = false;
            }
        },
        changeIfF6(val){
            if(val==true){
                this.checked[5].ifF6 = true;
                this.checked[5].ifY6 = false;
            }
        },
        check(loading){
            console.log(this.formData.caseServiceQuestion.operationStarttime)
            if(this.checked[0].ifY1==true&&this.formData.caseServiceQuestion.operationStarttime==null){
                loading.close();
                this.$message({
                    message:'请选择操作开始时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[0].ifY1==true&&this.formData.caseServiceQuestion.operationEndtime==null){
                loading.close();
                this.$message({
                    message:'请选择操作结束时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[1].ifY2==true&&this.formData.caseServiceQuestion.stopStarttime==null){
                loading.close();
                this.$message({
                    message:'请选择停机开始时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[1].ifY2==true&&this.formData.caseServiceQuestion.stopEndtime==null){
                loading.close();
                this.$message({
                    message:'请选择停机结束时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[2].ifY3==true&&this.formData.caseServiceQuestion.lastbackupTime==null){
                loading.close();
                this.$message({
                    message:'请选择选项3最近一次备份时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[4].ifY5==true&&this.formData.caseServiceQuestion.beforeLastbackupTime==null){
                loading.close();
                this.$message({
                    message:'请选择选项5最近一次备份时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[5].ifY6==true&&this.formData.caseServiceQuestion.backuptestTime==null){
                loading.close();
                this.$message({
                    message:'请选择备份测试时间',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[0].ifY1==true&&this.checked[0].ifF1==true||this.checked[0].ifY1==false&&this.checked[0].ifF1==false){
                loading.close();
                this.$message({
                    message:'序号1请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[1].ifY2==true&&this.checked[1].ifF2==true||this.checked[1].ifY2==false&&this.checked[1].ifF2==false){
                loading.close();
                this.$message({
                    message:'序号2请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[2].ifY3==true&&this.checked[2].ifF3==true||this.checked[2].ifY3==false&&this.checked[2].ifF3==false){
                loading.close();
                this.$message({
                    message:'序号3请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[3].ifY4==true&&this.checked[3].ifF4==true||this.checked[3].ifY4==false&&this.checked[3].ifF4==false){
                loading.close();
                this.$message({
                    message:'序号4请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[4].ifY5==true&&this.checked[4].ifF5==true||this.checked[4].ifY5==false&&this.checked[4].ifF5==false){
                loading.close();
                this.$message({
                    message:'序号5请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.checked[5].ifY6==true&&this.checked[5].ifF6==true||this.checked[5].ifY6==false&&this.checked[5].ifF6==false){
                loading.close();
                this.$message({
                    message:'序号6请选择是或者否,不能全选或不选!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            return true
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
                    if(!vm.check(loading)) return;                    
                    let temp = {};
                    temp.operationStarttime = this.formData.caseServiceQuestion.operationStarttime;
                    temp.operationEndtime = this.formData.caseServiceQuestion.operationEndtime;
                    temp.stopStarttime = this.formData.caseServiceQuestion.stopStarttime;
                    temp.stopEndtime = this.formData.caseServiceQuestion.stopEndtime;
                    temp.lastbackupTime = this.formData.caseServiceQuestion.lastbackupTime;
                    temp.beforeLastbackupTime = this.formData.caseServiceQuestion.beforeLastbackupTime;
                    temp.backuptestTime = this.formData.caseServiceQuestion.backuptestTime;
                    temp.serviceTime = this.formData.caseServiceQuestion.serviceTime;
                    temp.serviceId=this.serviceId;
                    if((temp.operationStarttime!=null&&this.checked[0].ifY1==false)||(temp.operationEndtime!=null&&this.checked[0].ifY1==false)){
                        loading.close();
                        this.$message({
                            message:'序号1请选择是,取消否!',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        return false;        
                    }
                    if((temp.stopStarttime!=null&&this.checked[1].ifY2==false)||(temp.stopEndtime!=null&&this.checked[1].ifY2==false)){
                        loading.close();
                        this.$message({
                            message:'序号2请选择是,取消否!',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        return false;         
                    }
                    if(temp.lastbackupTime!=null&&this.checked[2].ifY3==false){
                        loading.close();
                        this.$message({
                            message:'序号3请选择是,取消否!',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        return false;                       
                    }
                    if(temp.beforeLastbackupTime!=null&&this.checked[4].ifY5==false){
                        loading.close();
                        this.$message({
                            message:'序号5请选择是,取消否!',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        return false;                       
                    }
                    if(temp.backuptestTime!=null&&this.checked[5].ifY6==false){
                        loading.close();
                        this.$message({
                            message:'序号6请选择是,取消否!',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        return false;                       
                    }
                    if(this.checked[0].ifY1==true){
                        temp.numberIf1=1;
                    }else{
                        temp.numberIf1=0;
                    }
                    if(this.checked[1].ifY2==true){
                        temp.numberIf2="1";
                    }else{
                        temp.numberIf2="0";
                    }
                    if(this.checked[2].ifY3==true){
                        temp.numberIf3="1";
                    }else{
                        temp.numberIf3="0";
                    }
                    if(this.checked[3].ifY4==true){
                        temp.numberIf4="1";
                    }else{
                        temp.numberIf4="0";
                    }
                    if(this.checked[4].ifY5==true){
                        temp.numberIf5="1";
                    }else{
                        temp.numberIf5="0";
                    }
                    if(this.checked[5].ifY6==true){
                        temp.numberIf6="1";
                    }else{
                        temp.numberIf6="0";
                    }
                    let data = {};
                    data.serviceType = this.serviceType;
                    data.data = JSON.stringify(temp);
                    console.log(data);
                    fetch.questionPost("?action=/work/submitServiceQuestion",data).then(res=>{
                        loading.close();
                        console.log('submitServiceQuestion',res);
                        if(res.STATUSCODE=="0"){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                            });
                            let nowWorkId = vm.workId;
                            let nowCaseId = vm.caseId;
                            let serviceId = vm.serviceId;
                            let serviceType = vm.serviceType;
                            let taskId = vm.taskId;
                            let evaluateId = vm.evaluateId;
                            let dialogVisible0 = true;
                            let workTypeId = vm.workTypeId;
                            // vm.getCaseServiceQuestion();
                            setTimeout(function(){vm.$router.push({ name: 'workBenchSLAfeedback',query:{caseId:nowCaseId,workId:nowWorkId,serviceId:serviceId,serviceType:serviceType,taskId:taskId,evaluateId:evaluateId,dialogVisible0:dialogVisible0,workTypeId:workTypeId}})},1000);
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
            })
        },
    }

}
</script>
<style scoped>
.workConfirmView{width: 100%;height: 100%;overflow: scroll}
.attention{margin:0.05rem 0.1rem 0.1rem;color: red}
.confirmView{margin:0.1rem 0;line-height: 0.2rem}
.confirmView >>> .el-form-item{margin-bottom:0;}
.selectBox{display: flex;}
.serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;z-index: 1}
</style>