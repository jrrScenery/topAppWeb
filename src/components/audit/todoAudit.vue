<template>
    <div class="todoAuditView">
        <div class="todoContent">
            <el-form>
                <!-- 批量审批 -->
                <div v-if="combineInfos.length!=0" @click="handleSubmit">
                    <el-card class="box-card" v-for="(item,index) in combineInfos" :key="item.prjId">
                            <div slot="header" class="clearfix">
                                <span>审批类型：{{loaType[item.loaType]}}</span>
                                <router-link :to="{name:'auditDetail',query:{id:item.processIds,loaType:item.loaType}}">
                                    <el-button style="float: right; padding: 3px 0;font-size:0.13rem" type="text">查看详情</el-button>
                                </router-link>
                            </div>
                            <el-form-item label="审批类型：">
                                <div>批量审批</div>
                            </el-form-item>
                            <el-form-item label="项目编号：">
                                <div>{{item.prjCode}}</div>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <div>{{item.prjName}}</div>
                            </el-form-item>
                            
                            <el-form-item class="submitBtn">
                                <el-button type="primary" data-name='ok' :data-index=index class="okBtn">同意</el-button>
                                <el-button data-name='refuse' :data-index=index>拒绝</el-button>
                            </el-form-item>
                    </el-card>
                </div>
                <!-- 单个审批 -->
                <div v-if="singleInfos.length!=0" @click="clickMethod">
                    <el-card class="box-card" v-for="(item,index) in singleInfos" :key="item.id" >
                        <div slot="header" class="clearfix">
                            <span>{{item.submitor}}的{{loaType[item.loaType]}}申请</span>
                            <router-link v-if="item.loaType==='2'" :to="{name:'attenDetail',query:{id:item.id}}">
                                <el-button :data-id='item.id' class="divBtn" type="text">查看详情</el-button>
                            </router-link>
                            <!-- <router-link :to="{name:'attenDetail',query:''}">
                                <el-button :data-id='item.id' class="divBtn proBtn" type="text">查看流程</el-button>
                            </router-link>  -->
                            <!-- <router-link  v-if="item.loaType==='0'" :to="{name:'attenDetail',query:''}">
                                <el-button :data-id='item.id' class="divBtn proBtn" type="text">查看附件</el-button>
                            </router-link>                             -->
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
                        <!-- <el-form-item label="加班补偿：" v-if="item.loaType==='1'" label-width="0.9rem">
                            <div>{{relaxation[item.leaveType]}}</div>
                        </el-form-item> -->
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
                        <!-- <el-form-item label="加班事由：" v-if="item.loaType==='1'" label-width="0.9rem">
                            <div>{{item.reason}}</div>
                        </el-form-item> -->
                        <el-form-item label="提交时间：" label-width="0.9rem">
                            <div>{{item.submitTime}}</div>
                        </el-form-item>
                        <el-form-item label="审批状态：" label-width="0.9rem">
                            <div>{{processStatus[item.processStatus]}}</div>
                        </el-form-item>
                        <!-- <el-form-item class="submitBtn" v-if="item.processStatus===1">
                            <el-button type="primary" data-name='ok' :data-index=index class="okBtn">同意</el-button>
                            <el-button data-name='refuse' :data-index=index>拒绝</el-button>
                        </el-form-item> -->
                        <el-form-item class="submitBtn">
                            <el-button type="primary" :data-loatype='item.loaType' :data-index='index' class="okBtn modifyBtn">修改</el-button>
                        </el-form-item>
                    </el-card>
                </div>
            </el-form>
           </div>
    </div>
</template>
<script>
import transfrom from "@/utils/dateTransform.js"
export default {
    name:'todoAudit',
    components:{},
    data(){
        return{
            leaveType:[],
            relaxation:[],
            loaType:[],//loaType（分类）: 0 : 请假 1 : 加班 2 : 考勤 3 : 报派工 4 ：批量加班
            combineInfos:[
                {
                    loaType:'0',  
                    prjId: "10393",
                    prjCode:'DYWAI60YJMB1-待续',
                    prjName:'摩拜单车人员外包服务项目-待续',
                    processIds: "623897524066844672,623933671199473664,",
                    processStatus: 1
                },
                {
                    loaType:'2',
                    prjCode:"FWSBU_999",
                    prjId:"10154",
                    prjName:"闲置资源池-开发",
                    processIds:"621388790878961664,",
                    processStatus:1,
                }
            ],
            singleInfos:[
                {
                    attnMonth: "2019-9",                   
                    id: "621388790878961664",
                    leavedays:'1',
                    leavehours: 0,
                    loaType: "2",
                    prjCode: "FWSBU_999",
                    prjId: 10154,
                    prjName: "闲置资源池-开发",
                    processStatus: 3,
                    submitTime: "2019-09-11 16:57:13",
                    submitor: "景瑞瑞"
                },{
                    addrId: 10154,
                    applyUser: "jingrr",
                    beginDate: "2019-9-23",
                    beginTime: "09:00",
                    endDate: "2019-9-23",
                    endTime: "18:00",
                    groupId: 10154,
                    id: "625691578131808256",
                    leaveType: 3,
                    loaType: "0",
                    prjCode: "FWSBU_999",
                    prjId: 10154,
                    prjName: "闲置资源池-开发",
                    processStatus: 3,
                    reason: "ces",
                    submitTime: "2019-09-23 13:54:57",
                    submitor: "景瑞瑞"
                }
            ]
        }
    },
    created(){
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.loaType = transfrom.getLeaveType().loaType;
        this.relaxation = transfrom.getLeaveType().relaxation;
        this.processStatus = transfrom.getLeaveType().processStatus;
    },
    methods:{
        //批量审批同意或拒绝操作
        handleSubmit:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let dataName = target.getAttribute('data-name');
            let index = target.getAttribute('data-index');
            console.log("data-name",dataName);
            console.log("data-index",index);
            let url = "";
            let data = {};
            data.ids = this.combineInfos[index].processIds;
            data.loaType = this.combineInfos[index].loaType;
            if(dataName === 'ok'){
                data.auditType = 0;
            }else{
                data.auditType = 1;
            }
            fetch.post("",data).then(res=>{

            })
        },
        clickMethod:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let loaType = target.getAttribute('data-loatype');
            let index = target.getAttribute('data-index');
            console.log(event)
            let id = target.getAttribute('data-id');
            console.log("data-loatype",loaType);
            console.log("data-index",index);
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
        // handleSubmit(flag,index){
        //     let params = {};
        //     // params.ids = 
        // },
        // modifyMethod(loaType){
        //     if(loaType==='0'){
        //         thi.$router.push({name:'',query:{}})//请假申请页面
        //     }
        //     if(loaType==='2'){
        //         thi.$router.push({name:'',query:{}})//考勤申请页面
        //     }
        // },
        checkDetail:function(event){
            console.log(event.target.getAttribute('data-name'));
        }
    }

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
</style>