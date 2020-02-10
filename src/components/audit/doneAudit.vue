<template>
    <div class="doneAuditView">
        <div class="doneContent">
            <el-form>
                <!-- 单个审批 -->
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
                            <!-- <el-form-item class="submitBtn">
                            <el-button type="primary" :data-loatype='item.loaType' :data-index='index' class="okBtn modifyBtn">查看详情</el-button>
                        </el-form-item> -->
                        <!-- </div>
                        <div v-else>
                            <el-form-item label="请假类型：" v-if="item.loaType==='0'" label-width="0.9rem">
                                <div>{{leaveType[item.leaveType]}}</div>
                            </el-form-item>
                            <el-form-item label="开始时间：" label-width="0.9rem">
                                <div>{{item.beginDate}} {{item.beginTime}}</div>
                            </el-form-item>
                            <el-form-item label="结束时间：" label-width="0.9rem">
                                <div>{{item.endDate}} {{item.endTime}}</div>
                            </el-form-item>
                            <el-form-item label="请假原因：" v-if="item.loaType==='0'" label-width="0.9rem">
                                <div>{{item.reason}}</div>
                            </el-form-item>
                            <el-form-item label="提交时间：" label-width="0.9rem">
                                <div>{{item.submitOn}}</div>
                            </el-form-item>
                            <el-form-item label="审批状态：" label-width="0.9rem">
                                <div>{{processStatus[item.processStatus]}}</div>
                            </el-form-item>
                        </div> -->
                        <!-- <el-form-item class="submitBtn" v-if="item.loaType===2">
                            <el-button type="primary" :data-loatype='item.loaType' :data-index='item.index' data-name='detail' class="okBtn modifyBtn">查看详情</el-button>
                        </el-form-item> -->
                    </el-card>
                </div>
                <div class="norecord" v-else>暂无审批记录</div>
            </el-form>
           </div>
    </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
export default {
    name:'todoAudit',
    components:{},
    data(){
        return{
            leaveType:[],
            relaxation:[],
            loaType:[],//loaType（分类）: 0 : 请假 1 : 加班 2 : 考勤 3 : 报派工 4 ：批量加班
            processStatus:[],
            singleInfos:[]
        }
    },
    created(){
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.loaType = transfrom.getLeaveType().loaType;
        this.relaxation = transfrom.getLeaveType().relaxation;
        this.processStatus = transfrom.getLeaveType().processStatus;
        this.getApprovAttendance();
    },
    methods:{
        getApprovAttendance:function(){
            fetch.get("?action=/attendance/queryApprovAttendance",'').then(res=>{
                console.log("queryApprovAttendance",res);
                if(res.STATUSCODE === '1'){
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
            let dataName = target.getAttribute('data-name');
            if(dataName!=null&&dataName=='detail'){
                console.log("singleInfos",this.singleInfos);
                let projectId = this.singleInfos[index].projectId;
                // this.$router.push({name:'auditDetail',query:{id:projectId,loaType:loaType}})
            }
        },
        checkDetail:function(event){
            console.log(event.target.getAttribute('data-name'));
        }
    }

}
</script>
<style scoped>
.doneAuditView{width:100%;height:100%;}
.doneContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.doneContent >>> .el-form-item{margin-bottom: 0rem;}
.doneContent >>> .el-form-item .el-form-item__label{line-height: 0.3rem}
.doneContent >>> .el-form-item .el-form-item__content{line-height: 0.3rem}
.doneAuditView>>>.submitBtn{margin-top: 0.1rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
.doneAuditView >>>.submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.doneAuditView >>> .submitBtn .el-button:hover{background: #ffffff;}
.doneAuditView >>> .submitBtn .okBtn:hover{background: #2698d6;}
.doneAuditView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
.doneAuditView >>> .submitBtn .okBtn{background: #2698d6; color: #ffffff;}

.doneAuditView >>> .divBtn{font-size:0.13rem;float:right;padding: 3px 0;}
.doneAuditView >>> .proBtn{padding:0.08rem 0.1rem}
.doneAuditView >>> .submitBtn .modifyBtn{width: 100%;}
.doneContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>