<template>
    <div class="mineDoneAuditView">
        <div class="mineDoneAuditContent">
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
                <div class="norecord" v-else>暂无已审批记录</div>
            </el-form>
        </div>
    </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
export default {
    name:'mineDoneAudit',
    components:{

    },
    data(){
        return{
            singleInfos:[
            //   {
            //       absMinute:null,
            //       approver:10004,
            //       beginTime:null,
            //       empid:1080833,
            //       endTime:null,
            //       ids:'147',
            //       leaveType:null,
            //       loaType:2,
            //       month:'2019-12',
            //       processId:102,
            //       processStatus:2,
            //       projectCode:"RVJAGZSTWS",
            //       projectName:'金税三期身份认证售后服务项目',
            //       realname:'覃远明',
            //       reason:null,
            //       submitOn:'2020-01-13 17:52:44'
            //   },{
            //       absMinute:null,
            //       approver:10004,
            //       beginTime:'2020-01-16 17:00:00',
            //       empid:1080833,
            //       endTime:"2020-01-16 18:00:00",
            //       ids:null,
            //       leaveType:2,
            //       loaType:0,
            //       month:null,
            //       processId:203,
            //       processStatus:2,
            //       projectCode:'RVJAGZSTWS',
            //       projectName:'金税三期身份认证售后服务项目',
            //       realname:'覃远明',
            //       reason:'bbbbbbbbb',
            //       submitOn:'2020-01-16 16:54:52'
            //   }
            ],
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
            fetch.get("?action=/attendance/queryMyAttendanceList&processStatus=2").then(res=>{
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
.mineDoneAuditContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.mineDoneAuditContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.mineDoneAuditContent >>> .el-form-item{margin-bottom: 0rem;}
.mineDoneAuditContent >>> .el-form-item .el-form-item__label{line-height: 0.3rem}
.mineDoneAuditContent >>> .el-form-item .el-form-item__content{line-height: 0.3rem}
.mineDoneAuditView>>>.submitBtn{margin-top: 0.1rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
.mineDoneAuditView >>>.submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.mineDoneAuditView >>> .submitBtn .el-button:hover{background: #ffffff;}
.mineDoneAuditView >>> .submitBtn .okBtn:hover{background: #2698d6;}
.mineDoneAuditView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
.mineDoneAuditView >>> .submitBtn .okBtn{background: #2698d6; color: #ffffff;}

.mineDoneAuditView >>> .divBtn{font-size:0.13rem;float:right;padding: 3px 0;}
.mineDoneAuditView >>> .proBtn{padding:0.08rem 0.1rem}
.mineDoneAuditView >>> .submitBtn .modifyBtn{width: 100%;}
.mineDoneAuditContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>