<template>
    <div class="mineAuditingView">
        <div class="mineAuditingContent">
            <el-form>
                <div v-if="singleInfos.length!=0"><!-- @click="clickMethod" -->
                    <el-card class="box-card" v-for="item in singleInfos" :key="item.id" >
                        <!-- <div v-if="item.loaType==2"> -->
                            <div slot="header" class="clearfix">
                                <span>{{item.realname}}的{{loaType[item.loaType]}}申请</span>
                                <div :data-id='item.id' class="divBtn" type="text">{{item.month}}</div>
                            </div>
                            <el-form-item label="项目编号：" label-width="0.9rem">
                                <div>{{item.projectCode}}</div>
                            </el-form-item>
                            <el-form-item label="项目名称：" label-width="0.9rem">
                                <div>{{item.projectName}}</div>
                            </el-form-item>
                            <el-form-item label="缺勤时长：" v-if="item.loaType===2" label-width="0.9rem">
                                <div>{{item.absMinute}}</div>
                            </el-form-item>
                            <div v-if="item.loaType===0">
                                <el-form-item label="请假类型：" label-width="0.9rem">
                                    <div>{{leaveType[item.leaveType]}}</div>
                                </el-form-item>
                                <el-form-item label="开始时间：" label-width="0.9rem">
                                    <div>{{item.beginTime}}</div>
                                </el-form-item>
                                <el-form-item label="结束时间：" label-width="0.9rem">
                                    <div>{{item.endTime}}</div>
                                </el-form-item>
                                <el-form-item label="请假原因：" label-width="0.9rem">
                                    <div>{{item.reason}}</div>
                                </el-form-item>
                            </div>
                            <el-form-item label="提交时间：" label-width="0.9rem">
                                <div>{{item.submitOn}}</div>
                            </el-form-item>
                            <el-form-item label="审批状态：" label-width="0.9rem">
                                <div>{{processStatus[item.processStatus]}}</div>
                            </el-form-item>
                    </el-card>
                </div>
                <div class="norecord" v-else>暂无审批中记录</div>
            </el-form>
        </div>
    </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
export default {
    name:'mineAuditing',
    components:{

    },
    data(){
        return{
            singleInfos:[],
            loaType:[],//loaType（分类）: 0 : 请假 1 : 加班 2 : 考勤 3 : 报派工 4 ：批量加班
            leaveType:[],
            processStatus:[],
        }
    },
    created(){
        this.loaType = transfrom.getLeaveType().loaType;
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.processStatus = transfrom.getLeaveType().processStatus;
        this.queryMyAttendanceList();
    },
    methods:{
        queryMyAttendanceList(){
            fetch.get("?action=/attendance/queryMyAttendanceList&processStatus=1").then(res=>{
                console.log("queryMyAttendanceList",res);
                if(res.STATUSCODE=='1'){
                    this.singleInfos = res.data;
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
        clickMethod:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let loaType = target.getAttribute('data-loatype');
            let index = target.getAttribute('data-index');
            console.log(event)
            let id = target.getAttribute('data-id');
            let routeName = "";
            if(loaType===2){
                routeName = "makeUpAttendence"
            }else if(loaType===0){
                routeName = "myabsence"
            }
            let value = this.singleInfos[index];
            console.log("value",value);
            let attnMonth = value.attnMonth;
            if (value.loaType !== 2) {
                let data = {};
                data.id = value.id;
                data.leaveType = value.leaveType;
                data.beginDate = value.beginDate;
                // data.endDate = 
            }
        },
    }
}
</script>
<style scoped>
.mineAuditingContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.mineAuditingContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.mineAuditingContent >>> .el-form-item{margin-bottom: 0rem;}
.mineAuditingContent >>> .el-form-item .el-form-item__label{line-height: 0.3rem}
.mineAuditingContent >>> .el-form-item .el-form-item__content{line-height: 0.3rem}
.mineAuditingView>>>.submitBtn{margin-top: 0.1rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
.mineAuditingView >>>.submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.mineAuditingView >>> .submitBtn .el-button:hover{background: #ffffff;}
.mineAuditingView >>> .submitBtn .okBtn:hover{background: #2698d6;}
.mineAuditingView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
.mineAuditingView >>> .submitBtn .okBtn{background: #2698d6; color: #ffffff;}

.mineAuditingView >>> .divBtn{font-size:0.13rem;float:right;padding: 3px 0;}
.mineAuditingView >>> .proBtn{padding:0.08rem 0.1rem}
.mineAuditingView >>> .submitBtn .modifyBtn{width: 100%;}
.mineAuditingContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>