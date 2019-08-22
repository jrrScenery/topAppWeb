<template>
    <div class="auditDetailView">
        <header-last :title="auditDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="auditDetailContent">
            <el-form :model="formData" ref="formData">
                <div style="padding:0.1rem 0">杜鑫的考勤申请</div>
                <el-form-item label="项目编号：">
                    <el-col :span="15">
                        <el-input :value="formData.proNo" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="项目名称：">
                    <el-col :span="15">
                        <el-input :value="formData.proName" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="驻场地址：">
                    <el-col :span="15">
                        <el-input :value="formData.zcAddress" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="考勤时间：">
                    <el-col :span="15">
                        <el-input :value="formData.kqTime" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="打卡日期：">
                    <el-col :span="15">
                        <el-input :value="formData.punchDate" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="打卡时间：">
                    <el-col :span="15">
                        <el-input :value="formData.punchTime" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="打卡地点：">
                    <el-col :span="15">
                        <el-input :value="formData.punchAddress" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="缺勤类型：">
                    <el-col :span="15">
                        <el-input :value="formData.absenceType" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="缺勤原因：">
                    <el-col :span="15">
                        <el-input :value="formData.reason" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item class="searchBtn">
                    <el-button class="searchBtnCell">同意</el-button>
                    <el-button>拒绝</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
export default {
    name:'auditDetail',
    components:{
        headerLast
    },
    data(){
        return{
            auditDetailTit:'审批详情',
            formData:{
                proNo:'HUNBGY80JIn',
                proName:'神州数码维保项目',
                zcAddress:'神州信息大厦',
                kqTime:"09:00-18:00",
                punchDate:'2019-08-13',
                punchTime:'09:00',
                punchAddress:'神州数码广场',
                absenceType:'地点',
                reason:'因公外出'
            }
        }
    }
}
</script>
<style scoped>
.auditDetailView{width:100%;height:100%;}
.auditDetailContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.auditDetailContent >>> .el-form-item{margin-bottom: 0.05rem;}

.auditDetailView >>> .searchBtn{position: absolute;bottom: 0; left: 0; right: 0; height: 0.4rem;}
.auditDetailView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.auditDetailView >>> .searchBtn .el-button:hover{background: #ffffff;}
.auditDetailView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
.auditDetailView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
.auditDetailView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>