<template>
    <div class="eventAnalysisView">
        <header-last :title="eventAnalysisTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="eventAnalysisHead">客户报障信息：{{troubleContent}}</div>
        <div class="eventAnalysisCell">
            <div class="content">
                <el-form :model="formData" label-width="0.8rem" ref="formData">
                    <div class="anasysItemTit">{{troubleDescTit}}</div>
                    <el-form-item class="anasysText textborder">
                        <el-input type="textarea" v-model="formData.troubleDesc" :placeholder="troubleplaceholder"></el-input>
                    </el-form-item>
                    <div class="anasysItemTit">{{diagnoseTit}}</div>
                    <el-form-item class="anasysText textborder">
                        <el-input type="textarea" v-model="formData.diagnoseAnalysis" :placeholder="diagnoseplaceholder"></el-input>
                    </el-form-item>
                    <div class="anasysItemTit">{{resolveTit}}</div>
                    <el-form-item class="anasysText textborder">
                        <el-input type="textarea" v-model="formData.resolveDesc" :placeholder="resolveplaceholder"></el-input>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button @click="submitForm('formData')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name: 'eventShow',
    components: {
        HeaderLast
    },
    data(){
        return{
            eventAnalysisTit:"诊断分析",
            troubleContent:"",
            troubleDescTit:"故障现象描述",
            diagnoseTit:"诊断与分析",
            resolveTit:"解决办法说明",
            troubleplaceholder:`故障现象描述需包含以下内容:
1、故障现象（**位置上**部件指示灯的状态、系统日志报错信息）
2、系统运行状态（性能、声响、温度等）`,
            diagnoseplaceholder:`分析与诊断描述需包含以下内容：
1、提供用于判断故障点的日志报错信息
2、故障点明确的情况，请描述“初步判定**位置**故障”
3、故障不明确时，将可能的故障概率从高到底依次描述
4、上传日志（如有）`,
            resolveplaceholder:`解决办法说明描述需包含以下内容：
1、故障明确的情况，请描述“更换**位置**部件
2、故障不明确时，请描述处理思路`,
            formData:{
                troubleDesc:'',
                diagnoseAnalysis:"",
                resolveDesc:""
            },
            caseId:this.$route.query.caseId,
            versionCd:""
        }
    },
    created(){
        this.getCaseAnalysis();
    },
    methods:{
        getCaseAnalysis(){
            fetch.get("?action=/secondline/queryCaseAnalysis&CASE_ID="+this.caseId).then(res=>{
                console.log("queryCaseAnalysis",res);
                if(res.STATUSCODE=="1"){
                    this.formData.troubleDesc = res.data.faultDesc;
                    this.formData.diagnoseAnalysis = res.data.analysis;
                    this.formData.resolveDesc = res.data.remark;
                    this.versionCd = res.data.versionCd;
                    this.troubleContent = res.caseinfo.remark
                }
            })
        },
        submitForm (formName) {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!vm.formData.troubleDesc){
                        vm.$message({
                            message:'请输入故障现象描述',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(!vm.formData.diagnoseAnalysis){
                        vm.$message({
                            message:'请输入诊断与分析',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(!vm.formData.resolveDesc){
                        vm.$message({
                            message:'请输入解决办法说明',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(vm.formData.troubleDesc==vm.formData.diagnoseAnalysis){
                        vm.$message({
                            message:'输入格式不规范，请重新输入',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(vm.formData.troubleDesc==vm.formData.resolveDesc){
                        vm.$message({
                            message:'输入格式不规范，请重新输入',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(vm.formData.diagnoseAnalysis==vm.formData.resolveDesc){
                        vm.$message({
                            message:'输入格式不规范，请重新输入',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    let params = {};
                    params.caseId = this.caseId;
                    params.versionCd = this.versionCd;
                    params.faultDesc = this.formData.troubleDesc;
                    params.analysis = this.formData.diagnoseAnalysis;
                    params.remark = this.formData.resolveDesc;
                    let data = new URLSearchParams();
                    data.append("data",JSON.stringify(params));
                    "&caseId="+this.caseId+""+ this.versionCd+"&troubleDesc="+this.formData.troubleDesc+"&diagnoseAnalysis="+this.formData.diagnoseAnalysis+"&resolveDesc="+this.formData.resolveDesc;
                    fetch.post("?action=/secondline/saveCaseAnalysis",data).then(res=>{
                        loading.close();
                        console.log(res);
                        if(res.STATUSCODE=="1"){
                            this.$message({
                            message:'提交成功',
                            type: 'success',
                            center: true,
                            duration:1000,
                            customClass: 'msgdefine'
                            });
                            vm.getCaseAnalysis();
                            // let nowcaseid = vm.caseId;
                            // setTimeout(function(){vm.$router.push({ name: 'eventShow',query:{caseId:nowcaseid}})},1000);
                        }else{
                            this.$message({
                            message:res.MESSAGE+"发生错误",
                            type: 'error',
                            center: true,
                            customClass: 'msgdefine'
                            });
                        }
                    })
                }else {
                    this.$message({
                        message:"请正确填写",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            })
        }
    }
}
</script>
<style scoped>
.eventAnalysisView{width: 100%; position: relative;background: #ffffff}
.eventAnalysisHead{display:flex;margin-top:10px;margin-left:20px}
.eventAnalysisCell{}
.eventAnalysisCell .anasysItemTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.eventAnalysisCell .anasysItemTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.eventAnalysisCell .anasysItemTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.anasysText{margin: 0!important;margin-bottom: 1rem;white-space: pre-wrap;}
.anasysText >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.anasysText >>> .el-textarea{border: 0.01rem solid #e5e5e5;width: 90%; margin:0 5%}
.anasysText >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem; min-height: 1rem!important; color: #333333;}
.anasysText >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.eventAnalysisCell>>>.textborder{border-bottom: 0rem solid #e5e5e5;}
.submitBtn{margin-top: 0.2rem}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem;position: fixed; bottom: 0;}
</style>

