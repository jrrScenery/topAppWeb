<template>
    <div class="auditDetailView">
        <header-last :title="auditDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="auditDetailContent">
            <el-form :model="formData" ref="formData">
                <el-card class="box-card" v-for="(item,index) in auditinfos" :key="item.id">
                    <div slot="header" class="clearfix">
                        <span>{{item.realname}}的{{loaType[item.loatype]}}申请</span>
                        <router-link :to="{name:'attenDetail',query:{id:item.processId}}" v-if="item.loatype===2">
                            <el-button style="float: right; padding: 3px 0;font-size:0.13rem" type="text">查看详情</el-button>
                        </router-link>
                        <!-- <el-button class="divBtn" type="text" v-if="item.loatype==='2'">查看详情</el-button> -->
                        <!-- <el-button class="divBtn proBtn" type="text">查看流程</el-button>
                        <el-button class="divBtn proBtn" type="text" v-if="item.loaType==='0'">查看附件</el-button> -->
                    </div>
                    <el-form-item label="考勤月份：" v-if="item.loatype===2">
                        <div>{{item.month}}</div>
                    </el-form-item>
                    <el-form-item label="项目编号：">
                        <div>{{item.projectCode}}</div>
                    </el-form-item>
                    <el-form-item label="项目名称：">
                        <div>{{item.projectName}}</div>
                    </el-form-item>
                    <el-form-item label="请假类型：" v-if="item.loatype===0">
                        <div>{{leaveType[item.leaveType]}}</div>
                    </el-form-item>
                    <el-form-item label="开始时间：" v-if="item.loatype===0">
                        <div>{{item.beginTime}}</div>
                    </el-form-item>
                    <el-form-item label="结束时间：" v-if="item.loatype===0">
                        <div>{{item.endTime}}</div>
                    </el-form-item>
                    <el-form-item label="缺勤时长：" v-if="item.loatype===2">
                        <div>{{item.absMinute}}</div>
                    </el-form-item>
                    <el-form-item label="请假事由：" v-if="item.loatype===0">
                        <div>{{item.reason}}</div>
                    </el-form-item>
                    <el-form-item label="提交时间：">
                        <div>{{item.submitOn}}</div>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button type="primary" class="okBtn" @click="handleSubmit('ok',index)">同意</el-button>
                        <el-button @click="handleSubmit('refuse',index)">拒绝</el-button>
                    </el-form-item>
                </el-card>
                <!-- <div style="padding:0.1rem 0">杜鑫的考勤申请</div>
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
                </el-form-item> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
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
            },
            auditinfos:[],
            loaType:[],
            leaveType:[],
            id:this.$route.query.id,
            loatype:this.$route.query.loatype,
        }
    },
    created(){
        this.loaType = transfrom.getLeaveType().loaType;
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.getProjectAttendance();
    },
    methods:{
        getProjectAttendance:function(){
            console.log("loatype",this.loatype);
            fetch.get("?action=/attendance/queryProjectAttendance&processStatus=1&projectId="+this.id+"&loaType="+this.loatype,'').then(res=>{
                console.log("queryProjectAttendance",res);
                if(res.STATUSCODE==='1'){
                    this.auditinfos = res.data;
                }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }
            })
        },
        handleSubmit(flag,index){
            let url = "";
            let temp = {};
            console.log("index",index);
            console.log("auditinfos",this.auditinfos);
            temp.processId = this.auditinfos[index].processId;
            temp.loaType = this.auditinfos[index].loatype;
            if(flag === 'ok'){
                temp.auditType = 0;
            }else{
                temp.auditType = 1;
            }
            let params = "&processId="+temp.processId+"&loaType="+temp.loaType+"&auditType="+temp.auditType
            fetch.questionPost("?action=/attendance/approveAttendance"+params,'').then(res=>{
                console.log("approveAttendance",res);
                if(res.STATUSCODE === '1'){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    this.getProjectAttendance();
                }
            })
        },
    }
}
</script>
<style scoped>
.auditDetailView{width:100%;height:100%;}
.auditDetailContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.auditDetailContent >>> .el-form-item{margin-bottom: 0rem;}

.auditDetailContent >>> .el-form-item .el-form-item__label{line-height: 0.3rem}
.auditDetailContent >>> .el-form-item .el-form-item__content{line-height: 0.3rem}

.auditDetailView>>>.submitBtn{margin-top: 0.1rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
.auditDetailView >>>.submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.auditDetailView >>> .submitBtn .el-button:hover{background: #ffffff;}
.auditDetailView >>> .submitBtn .okBtn:hover{background: #2698d6;}
.auditDetailView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
.auditDetailView >>> .submitBtn .okBtn{background: #2698d6; color: #ffffff;}

.auditDetailView >>> .divBtn{font-size:0.13rem;float:right;padding:0.08rem 0}
.auditDetailView >>> .proBtn{padding:0.08rem 0.1rem}
</style>