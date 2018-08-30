<template>
    <div class="endSummaryView">
        <div class="serviceInfoCell">
            <div class="serviceInfoTit">用户及项目信息</div>
            <div class="content">
                <el-form :model="formData" ref="formData">
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
                        <li>
                            <span>工程师姓名</span>
                            <span>{{formData.userAndPrjItem.enginnername}}</span>
                        </li>
                    </ul>
                    <!-- <el-form-item label="服务类型">
                        <template>
                            <el-select clearable placeholder="请选择服务类型">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                            </el-option>
                            </el-select>
                        </template>

                    </el-form-item> -->
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
                    <el-form-item label="实际实用工时">
                        <el-col :span="12">
                        <el-input v-model="formData.userAndPrjItem.realWork" placeholder="请输入使用工时" style="width:100%"></el-input>
                        </el-col>
                    </el-form-item>
                    <div class="article">{{content}}</div>
                    <el-form-item >
                        <el-input type="textarea" v-model="formData.userAndPrjItem.workContent" placeholder="请输入工作内容"></el-input>
                    </el-form-item>
                    <div class="article">{{result}}</div>
                    <el-form-item >
                        <el-radio label="1">顺利完成</el-radio>
                        <el-radio label="2">观察/下一步处理</el-radio>
                    </el-form-item>
                    <el-form-item >
                        <el-input type="textarea" v-model="formData.userAndPrjItem.problemPlan" placeholder="若存在问题及下一步计划：若顺利完成，则此项填无"></el-input>
                    </el-form-item>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="submitBtn">
                        <el-button @click="submitForm('formData')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
    name: 'endSummaryView',

    components: {
    },
    data(){
        return{
            formData:{
                userAndPrjItem:''
            },
            content:"工作内容",
            result:"工作结果",
            activeName:'second',
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            taskId:this.$route.query.taskId,
            serviceType:this.$route.query.serviceType
        }
    },
    created:function(){
        // console.log(this.serviceType);
        fetch.get("?action=/work/GetOnsiteServiceFormInfo&CASE_ID="+this.$route.query.caseId+"&SERVICE_ID="+this.$route.query.serviceId+"&SERVICE_TYPE="+this.serviceType).then(res=>{
            console.log(res);
            this.formData.userAndPrjItem = res.DATA[0];
        })
        fetch.get("?action=getDict&type=NT_SERVICE_TYPE","").then(res=>{
            console.log(res);
        })
        fetch.get("?action=getDict&type=NT_CASE_WORK_RESULT","").then(res=>{
            console.log(res);
        })
    },
    methods:{
        check(){
            if(this.formData.userAndPrjItem.serviceType==null){
                this.$message({
                    message:'请选择服务类型!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.formData.userAndPrjItem.arriveTime==null){
                this.$message({
                    message:'请填写到场时间!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.formData.userAndPrjItem.leaveTime==null){
                this.$message({
                    message:'请填写离场时间!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.formData.userAndPrjItem.realWork==null){
                this.$message({
                    message:'请填写实际工时!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.formData.userAndPrjItem.workContent==null){
                this.$message({
                    message:'请填写工作内容!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
            if(this.formData.userAndPrjItem.problemPlan==null){
                this.$message({
                    message:'请填写存在问题!',
                    type: 'success',
                    center: true,
                    customClass:'msgdefine'
                });
                return false
            }
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
                    var data={};
                    data.serviceId = this.formData.userAndPrjItem.serviceId;
                    data.opFlg =1;
                    data.customerId = this.formData.userAndPrjItem.customerId;
                    var temp = {};

                    temp.serviceId = this.formData.userAndPrjItem.serviceId;
                    temp.caseId=this.caseId;
                    // temp.serviceType = this.formData.userAndPrjItem.serviceType;
                    temp.arriveTime = this.formData.userAndPrjItem.arriveTime;
                    temp.leaveTime = this.formData.userAndPrjItem.leaveTime;
                    temp.realWork = this.formData.userAndPrjItem.realWork;
                    temp.workContent = this.formData.userAndPrjItem.workContent;
                    // temp.workResult = this.formData.userAndPrjItem.workResult;
                    temp.problemPlan = this.formData.userAndPrjItem.problemPlan;
                    console.log(temp);
                    fetch.post("?action=/work/updateSceneServiceFormInfo&serviceType="+this.serviceType,temp).then(res=>{
                        console.log(res);
                    })
                }
            })
        }
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
    .content{background: #ffffff; color: #999999; padding: 0.1rem 0.25rem 0.15rem;}
    .content >>> .el-form-item{border-bottom: 0.01rem; margin: 0.03rem 0;}
    .content >>> .el-form-item__label{font-size: 0.13rem; padding: 0 0.2rem 0 0.2rem; text-align: left}
    .article{line-height: 0.3rem; padding: 0 0.2rem 0 0.2rem;}
    .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .submitBtn >>> .el-form-item__content{margin: 0!important;}
    .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;}

</style>

