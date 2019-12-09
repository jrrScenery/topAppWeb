<template>
    <div class="todoAuditView">
        <div class="todoContent">
            <el-form>
                <!-- 批量审批 -->
                <div v-if="combineInfos.length!=0" @click="handleSubmit">
                    <el-card class="box-card" v-for="(item,index) in combineInfos" :key="item.prjId">
                        <div slot="header" class="clearfix">
                            <span>待办类型：批量审批</span>
                            <router-link :to="{name:'auditDetail',query:{id:item.projectId,loatype:item.loatype}}">
                                <el-button style="float: right; padding: 3px 0;font-size:0.13rem" type="text">查看详情</el-button>
                            </router-link>
                        </div>
                        <el-form-item label="审批类型：">
                            <div>{{loaType[item.loatype]}}</div>
                        </el-form-item>
                        <el-form-item label="项目编号：">
                            <div>{{item.projectCode}}</div>
                        </el-form-item>
                        <el-form-item label="项目名称：">
                            <div>{{item.projectName}}</div>
                        </el-form-item>
                        
                        <el-form-item class="submitBtn">
                            <el-button type="primary" data-name='ok' :data-index='index' class="okBtn">同意</el-button>
                            <el-button data-name='refuse' :data-index='index'>拒绝</el-button>
                        </el-form-item>
                    </el-card>
                </div>
                <div class="norecord" v-else>暂无更多数据</div>
                <!-- 单个审批 -->
                <!-- <div v-if="singleInfos.length!=0" @click="clickMethod">
                    <el-card class="box-card" v-for="(item,index) in singleInfos" :key="item.id" >
                        <div slot="header" class="clearfix">
                            <span>{{item.submitor}}的{{loaType[item.loaType]}}申请</span>
                            <router-link v-if="item.loaType==='2'" :to="{name:'attenDetail',query:{id:item.id}}">
                                <el-button :data-id='item.id' class="divBtn" type="text">查看详情</el-button>
                            </router-link>  
                        </div>
                        <el-form-item label="审批类型:" label-width="0.9rem">
                            <div>{{loaType[item.loaType]}}</div>
                        </el-form-item>
                        <el-form-item label="考勤月份：" v-if="item.loaType==='2'" label-width="0.9rem">
                            <div>{{item.attnMonth}}</div>
                        </el-form-item>
                        <el-form-item label="项目编号：" label-width="0.9rem">
                            <div>{{item.prjCode}}</div>
                        </el-form-item>
                        <el-form-item label="项目名称：" label-width="0.9rem">
                            <div>{{item.prjName}}</div>
                        </el-form-item>
                        <el-form-item label="提交人：" label-width="0.9rem">
                            <div>{{item.submitor}}</div>
                        </el-form-item>
                        <el-form-item label="请假类型：" v-if="item.loaType==='0'" label-width="0.9rem">
                            <div>{{leaveType[item.leaveType]}}</div>
                        </el-form-item>
                        <el-form-item label="开始时间：" v-if="typeof(item.beginDate)!='undefined'" label-width="0.9rem">
                            <div>{{item.beginDate}} {{item.beginTime}}</div>
                        </el-form-item>
                        <el-form-item label="开始时间：" v-if="typeof(item.endDate)!='undefined'" label-width="0.9rem">
                            <div>{{item.endDate}} {{item.endTime}}</div>
                        </el-form-item>
                        <el-form-item label="缺勤时长：" v-if="item.loaType==='2'" label-width="0.9rem">
                            <div>{{item.leavedays}}天{{item.leavehours}}小时</div>
                        </el-form-item>
                        <el-form-item label="请假事由：" v-if="item.loaType==='0'" label-width="0.9rem">
                            <div>{{item.reason}}</div>
                        </el-form-item>
                        <el-form-item label="提交时间：" label-width="0.9rem">
                            <div>{{item.submitTime}}</div>
                        </el-form-item>
                        <el-form-item label="审批状态：" label-width="0.9rem">
                            <div>{{processStatus[item.processStatus]}}</div>
                        </el-form-item>
                        <el-form-item class="submitBtn">
                            <el-button type="primary" :data-loatype='item.loaType' :data-index='index' class="okBtn modifyBtn">修改</el-button>
                        </el-form-item>
                    </el-card>
                </div> -->
            </el-form>
           </div>
           <!-- <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp> -->
    </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
export default {
    name:'todoAudit',
    props:{
        prorepairpage: Number
    },
    components:{
        loadingtmp
    },
    data(){
        return{
            leaveType:[],
            relaxation:[],
            loaType:[],//loaType（分类）: 0 : 请假 1 : 加班 2 : 考勤 3 : 报派工 4 ：批量加班
            processStatus:[],
            combineInfos:[],
            singleInfos:[],
            page:1,
            pageSize:10,
            busy:true,
            loadall: false,
        }
    },
    created(){
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.loaType = transfrom.getLeaveType().loaType;
        this.relaxation = transfrom.getLeaveType().relaxation;
        this.processStatus = transfrom.getLeaveType().processStatus;
        this.getProjectAttendance();
    },
    methods:{
        getProjectAttendance(flag){
            // let param = {processStatus:1,PAGE_NUM:this.prorepairpage,PAGE_TOTAL:this.pageSize};
            fetch.get("?action=/attendance/queryProjectAttendance&processStatus=1",'').then(res=>{
                console.log("queryProjectAttendance",res);
                if(res.STATUSCODE==='1'){
                    // if(flag){
                    //     this.combineInfos = this.combineInfos.concat(res.data);
                    // }else{
                    //     this.combineInfos = res.data;
                    // }
                    // if(0 == res.data.length || res.data.length<this.pageSize ){
                    //     this.busy = true;
                    //     this.loadall = true;
                    // }
                    // else{
                    //     this.busy = false;
                    // }
                    this.combineInfos = res.data;
                }else{
                    this.busy = false;
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }
                this.$emit('emitbusy', {busy:false,loadall:this.loadall});
            })
        },
        //批量审批同意或拒绝操作
        handleSubmit:function(event){
            console.log("0");
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            console.log("target000",target);
            let dataName = target.getAttribute('data-name');
            let index = target.getAttribute('data-index');
            let url = "";
            let temp = {};
            console.log("combineInfos",this.combineInfos);
            if(index!=null){
                temp.projectId = this.combineInfos[index].projectId;
                temp.loaType = this.combineInfos[index].loatype;
                if(dataName === 'ok'){
                    temp.auditType = 0;
                }else{
                    temp.auditType = 1;
                }
                // let data = {};
                // data.data = JSON.stringify(temp);
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
            }
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
        checkDetail:function(event){
            console.log(event.target.getAttribute('data-name'));
        }
    },
}
</script>
<style scoped>
.todoAuditView{width:100%;height:100%;}
.todoContent{padding: 0.1rem;background: #ffffff;overflow: scroll}
.todoContent >>> .el-form-item{margin-bottom: 0rem;}
.todoContent >>> .el-form-item .el-form-item__label{line-height: 0.3rem}
.todoContent >>> .el-form-item .el-form-item__content{line-height: 0.3rem}
.todoAuditView>>>.submitBtn{margin-top: 0.1rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
.todoAuditView >>>.submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.todoAuditView >>> .submitBtn .el-button:hover{background: #ffffff;}
.todoAuditView >>> .submitBtn .okBtn:hover{background: #2698d6;}
.todoAuditView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
.todoAuditView >>> .submitBtn .okBtn{background: #2698d6; color: #ffffff;}

.todoAuditView >>> .divBtn{font-size:0.13rem;float:right;padding:0.08rem 0}
.todoAuditView >>> .proBtn{padding:0.08rem 0.1rem}
.todoAuditView >>> .submitBtn .modifyBtn{width: 100%;}
.todoContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>