<template>
    <div class="punchFailShowView">
        <header-last :title="punchFailShowTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="punchFailShowContent">
            <el-form :model="formData" label-width="0.8rem" ref="formData">
                <div class="article">{{desc}}</div>
                <el-form-item class="text">
                    <el-input type="textarea" v-model="formData.article" placeholder="请输入说明内容"></el-input>
                </el-form-item>
                <el-form-item class="submitBtn">
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
    name:'punchFailShow',
    components:{
        headerLast
    },
    data(){
        return{
            punchFailShowTit:'考勤情况说明',
            formData:{
                article:''
            },
            lat:this.$route.query.lat,
            lng:this.$route.query.lng,
            address:this.$route.query.address,
            zcInfo:this.$route.query.zcInfo,
            desc:"您当前不在驻场区域，无法进行打卡，请进行情况说明"
        }
    },
    created(){
        console.log(this.zcInfo);
        if(this.zcInfo!=null){
            this.desc = this.zcInfo
        }
    },
    methods:{
        check(loading){
            if(this.formData.article == ""){
                this.$message({
                    message:'请输入内容!',
                    type: 'warning',
                    center: true,
                    duration:1000,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true;
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
                    if(!vm.check(loading)) return;
                    // let params = "&EMP_NAME="+ localStorage.getItem("empId") +"&reason="+window.encodeURI(this.formData.article);
                    let params = {latitude:this.lat,longitude:this.lng,address:this.address,flg:2,reason:window.encodeURI(this.formData.article),}
                    fetch.get("?action=/risk/savePosition",params).then(res=>{
                        console.log("res",res);
                        loading.close();
                        if(res.STATUSCODE=="1"){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                duration:1000,
                                customClass: 'msgdefine'
                            });
                            setTimeout(function(){vm.$router.push({ name: 'attendence',query:{homeWarnFlag:true}})},1000);
                            // this.$router.go(-1)
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
                }
                else {
                    this.$message({
                        message:"请正确填写",
                        type: 'error',
                        center: true,
                        duration:1000,
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
.punchFailShowView{}
.punchFailShowContent{margin-top: 0.05rem; background: #ffffff;}
.punchFailShowContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.punchFailShowContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.article{line-height: 0.3rem; background: #f5f5f9; color: #acacac; padding-left: 0.25rem;}
.text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
.text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
