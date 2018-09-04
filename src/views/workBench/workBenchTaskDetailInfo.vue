<template>
    <div class="workBenchTaskDetailView">
        <header-last :title="workBenchTaskDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="attention">{{attention}}</div>
        <div class="taskDetailCell">
            <div class="taskDetailTit">任务信息</div>
            <div class="content">
                <ul class="tableTd">
                    <li>
                        <span>派工单号：</span>  
                        <span>{{taskDetailInfo.workNo}}</span>          
                    </li>
                    <li>                
                        <span>执行状态：</span>  
                        <span>{{taskDetailInfo.workStatus}}</span>   
                    </li>
                    <li>                
                        <span>工作类型：</span>
                        <span>{{taskDetailInfo.workType}}</span>
                    </li>
                    <li>                
                        <span>客户联系人：</span>
                        <span>{{taskDetailInfo.customerContactor}}</span>
                    </li>
                    <li>                
                        <span>座机：</span>
                        <a @click="sendCall(taskDetailInfo.customerCellnumber)" v-bind:href="'tel:'+taskDetailInfo.customerCellnumber" style="font-size: 0.13em; color: #2698d6;"> {{taskDetailInfo.customerCellnumber}} </a>
                    </li>
                    <li>                
                        <span>手机：</span>
                        <a @click="sendCall(taskDetailInfo.customerCellnumber)" v-bind:href="'tel:'+taskDetailInfo.customerCellnumber" style="font-size: 0.13em; color: #2698d6;"> {{taskDetailInfo.customerCellnumber}} </a>
                    </li>
                    <li>                
                        <span>客户地址：</span>
                        <span>{{taskDetailInfo.customerAddress}}</span>
                    </li>
                    <li>                
                        <span>预计开始时间：</span>
                        <span>{{taskDetailInfo.expectStart}}</span>
                    </li>
                    <li>                
                        <span>预计结束时间：</span>
                        <span>{{taskDetailInfo.expectEnd}}</span>
                    </li>
                    <li>                
                        <span>标准工作量：</span>
                        <span>{{taskDetailInfo.standardWorkload}}</span>
                    </li>
                    <li>                
                        <span>路途工作量：</span>
                        <span>{{taskDetailInfo.wayWorkload}}</span>
                    </li>
                    <li>                
                        <span>要求到场时间：</span>
                        <span>{{taskDetailInfo.requireArriveTime}}</span>
                    </li>
                    <li>                
                        <span>设备型号：</span>
                        <span>{{taskDetailInfo.modelName}}</span>
                    </li>
                    <li>                
                        <span>序列号：</span>
                        <span>{{taskDetailInfo.sn}}</span>
                    </li>
                    <li>                
                        <span>工作要求：</span>
                        <span>{{taskDetailInfo.workRequire}}</span>
                    </li>
                    <li>                
                        <span>创建人：</span>
                        <span>{{taskDetailInfo.creatorRealname}}</span>
                    </li>
                    <li>                
                        <span>派工人：</span>   
                        <span>{{taskDetailInfo.creatorRealname}}</span>
                    </li>
                    <li>                
                        <span>派工人电话：</span>
                        <a @click="sendCall(taskDetailInfo.workManagerMobile)" v-bind:href="'tel:'+taskDetailInfo.workManagerMobile" style="font-size: 0.13em; color: #2698d6;"> {{taskDetailInfo.workManagerMobile}} </a>
                    </li>
                    <li>                
                        <span>技术责任人：</span>
                        <span>{{taskDetailInfo.techManager}}</span>
                    </li>
                    <li>                
                        <span>技术责任人电话：</span>
                        <a @click="sendCall(taskDetailInfo.techManagerMobile)" v-bind:href="'tel:'+taskDetailInfo.techManagerMobile" style="font-size: 0.13em; color: #2698d6;"> {{taskDetailInfo.techManagerMobile}} </a>
                    </li>
                    <li>                
                        <span>事件编号：</span>
                        <span>{{taskDetailInfo.caseNo}}</span>
                    </li>
                    <li>                
                        <span>创建时间：</span>
                        <span>{{taskDetailInfo.createDate}}</span>
                    </li>
                    <li>                
                        <span>事件级别：</span>
                        <span>{{taskDetailInfo.caseLevel}}</span>
                    </li>
                    <li>                
                        <span>事件类型：</span>
                        <span>{{taskDetailInfo.caseType}}</span>
                    </li>
                    <li>                
                        <span>项目ID：</span>
                        <span>{{taskDetailInfo.projectId}}</span>
                    </li>
                    <li>                
                        <span>项目编号：</span>
                        <span>{{taskDetailInfo.projectNo}}</span>
                    </li>
                    <li>                
                        <span>项目名称：</span>
                        <span>{{taskDetailInfo.projectName}}</span>
                    </li>
                    <li>                
                        <span>人员评价状态：</span>
                        <span>{{taskDetailInfo.eng2mgrEvalstatusName}}</span>
                    </li>
                    <li>                
                        <span>备件评价状态：</span>
                        <span>{{taskDetailInfo.eng2partEvalstatusName}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="eventShowFooter">
        <el-row>
            <el-col :span="7">
            <div @click="choiseUndertake">
            <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
            <span>承接反馈</span>
            </div>
            </el-col>
            <el-col :span="7">
            <router-link :to="{name:'workBenchSLAfeedback',query:{workId:this.$route.query.workId}}">
                <div>
                    <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                    <span>SLA反馈</span>
                </div>
            </router-link>
            </el-col>
            <el-col :span="7" >
            <router-link v-if="this.taskDetailInfo.workStatusId!=5" :to="{name:'serviceList',query:{caseId:this.$route.query.caseId,workId:this.$route.query.workId,taskId:taskDetailInfo.taskId}}">
                <div>
                <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                <span>服务单</span>
                </div>
            </router-link>
            <div v-else @click="clickService">
                <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                <span>服务单</span>
            </div>
            </el-col>
            <el-col :span="3"><div class="el-icon-more" @click.stop="popBg=!popBg"></div></el-col>
        </el-row>
        </div>
        <div v-if="popBg" class="popBg" @click.stop="popBg=!popBg">
        <ul>
            <router-link :to="{name:'declareWorkLoad', query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,creatorRolename:this.taskDetailInfo.creatorRealname,expectStart:this.taskDetailInfo.expectStart,expectEnd:this.taskDetailInfo.expectEnd,standardWorkload:this.taskDetailInfo.standardWorkload}}">
            <li><img src="../../assets/images/eventBaseInfo_4.png" alt="">工作量申报</li>
            </router-link>
            <router-link :to="{name:'casePartEvaluate',query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,templateType:1,bjflg:0}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">人员评价</li>
            </router-link>
            <router-link :to="{name:'casePartEvaluate',query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,templateType:2,bjflg:1}}">
            <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/sla.png" alt="">备件评价</li>
            </router-link>
            <router-link :to="{name: 'sparePartsSortOut',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">备件整理</li>
            </router-link>
            <router-link :to="{name:'part_recycle'}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">备件回收</li>
            </router-link>
            <router-link :to="{name:'eventReplenish',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">过程记录</li>
            </router-link>
            <router-link :to="{name:'eventSLAInfo',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">SLA标准查看</li>
            </router-link>
            <router-link :to="{name:'eventPeople',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">参与人员</li>
            </router-link>           
        </ul>
        </div>
        <div class="dialogUndertake">
            <el-dialog width="80%" :visible.sync="outerVisibleUndertake" :show-close="false">
                <div class="modalUndertake" slot="footer">
                <ul>
                    <li @click="onUndertake">
                        <el-button type="text">承接</el-button>
                    </li>
                    <li @click="innerVisibleUndertake = true">
                        <el-button type="text">拒绝</el-button>
                    </li>
                    <li @click="outerVisibleUndertake = false">
                        <el-button type="text">取消</el-button>
                    </li>
                </ul>
                </div>
            </el-dialog>
        </div>
        <div class="dialogRefuseReason">
        <el-dialog width="80%" style="margin-top: 15vh" :visible.sync="innerVisibleUndertake" :show-close="false">
            <div class="dialog-body">
            <el-form>
                <el-form-item>
                    <el-input type="textarea" v-model="taskDetailInfo.refuseReason" placeholder="请填写拒绝理由"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="text" @click="innerVisibleUndertake = false">取消</el-button>
                    <el-button type="text" @click="onRefuse">拒绝</el-button>
                </el-form-item> -->
            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisibleUndertake = false">取 消</el-button>
                <el-button type="primary" @click="onRefuse">拒 绝</el-button>
            </div>
        </el-dialog>
        </div>
        <div class="dialogUndertake">
            <el-dialog :visible.sync="outerVisibleCool" :show-close="false">
                <div class="modalUndertake">
                <ul>
                    <li @click="onCool">
                        <el-button type="text">爽约</el-button>
                    </li>
                    <li @click="outerVisibleCool = false">
                        <el-button type="text">取消</el-button>
                    </li>
                </ul>    
                </div>
            </el-dialog>
        </div>
    </div>
</template>




<script>
import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchTaskDetailInfo',
    components: {
        headerLast,
        loadingtmp
    }, 

    // inject: ['reload'],
   

    data(){
        return{
            workBenchTaskDetailTit:"任务",
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            expectStart:this.$route.query.expectStart,
            expectEnd:this.$route.query.expectEnd,
            eng2partEvalid:'',
            popBg: false,
            popBgUndertake: false,
            popBgRefusal: false,
            attention:"实施过程中遇到技术问题反馈技术责任人，非技术问题反馈派工人，非工作时间请联系 400-610-6661",
            taskDetailInfo:{},
            // REFUSE_REASON:
            refuseReason: '',
            showModal: false,
            outerVisibleUndertake: false,
            innerVisibleUndertake: false,
            outerVisibleCool: false,
        }
        
    },
    created:function(){
        console.log(this.$route.query.workId);
        console.log(this.$route.query.caseId);
        fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
            console.log(res.DATA[0]);   
            this.taskDetailInfo = res.DATA[0];
            this.taskDetailInfo.refuseReason = '';
        });
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'workBenchTaskList') {
            to.meta.isUseCache = true;    
        }        
        next();
    },

    methods: {
        clickService(){
            this.$message({
                message:'已爽约状态没有服务单！',
                type: 'success',
                center: true,
                customClass: 'msgdefine'
            });
        },
        onCancel () {
            let data = {
            popBgUndertake: false
            } 
            // this.$emit('change', data)
        },
        onUndertake () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()
            console.log("rrr", params);
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=2" + params,{}).then(res=>{
                console.log("aaaaaaaaaaaaaaaaaaaaaaa", res);
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.outerVisibleUndertake = false;
        },
        onIndependence () {
            this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>当前环节不能承接反馈！</strong>'
            });
        },
        onCool () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()
            console.log("cooltime", params)
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=5" + params,{}).then(res=>{
                console.log("sssssssssssssssssssssssss", res);
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.outerVisibleCool = false;
        },
        onRefuse () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()+"&REFUSE_REASON="+this.taskDetailInfo.refuseReason;
            console.log("time", params)
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=3" + params,{}).then(res=>{
                console.log(res)
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.innerVisibleUndertake = false;
            this.outerVisibleUndertake = false;
            console.log(this.taskDetailInfo.refuseReason);
        },
        choiseUndertake () {
            if (this.taskDetailInfo.workStatusId == 0) 
            {
                this.outerVisibleUndertake = true;
            }
            else if (this.taskDetailInfo.workStatusId == 6)
            {
                this.outerVisibleCool = true;
            }
            else
            {
                this.onIndependence();
            } 
        },
        getCurrentTime () {
            let month = new Date().getMonth() + 1;
            let currentTime = (new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
            //console.log(yearArr)
            return currentTime
        },
        noKeyword () {
            document.activeElement.blur()
        },
    
    }
}

</script>


<style scoped>
.workBenchTaskDetailView{width:100%;background: #ffffff;}
.attention{color: red;margin-top: 0.05rem;margin-bottom: 0.08rem}
.taskDetailCell{overflow: scroll;margin-bottom: 0.5rem;}
.taskDetailCell .taskDetailTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.taskDetailCell .taskDetailTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.taskDetailCell .taskDetailTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}

.tableTd li{display: flex; line-height: 0.25rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd a{width: 100%;text-align: left;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa}  

.eventShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
.eventShowFooter .el-row{}
.eventShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
.eventShowFooter .el-row .el-col img{vertical-align: sub;}
.eventShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}

.popBg{background: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
.popBg ul{background: #f5f5f9; position: absolute; right: 0; bottom: 0.5rem; z-index: 2; line-height: 0.3rem}
.popBg li{padding: 0 0.15rem}
.popBg .slali{padding: 0 0.12rem}
.popBg li:nth-child(1){border-bottom: 0.01rem solid #e1e1e1;}
.popBg li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}

.modalUndertake{background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
.modalUndertake ul{background: #f5f5f9; position: absolute; bottom: 0.5rem; z-index: 2; line-height: 0.3rem; width: 100%;}
.modalUndertake li{padding: 0 0.15rem; border-bottom: 0.01rem solid #e1e1e1; text-align: center}
.modalUndertake .slali{padding: 0 0.12rem}
/* .modalUndertake li:nth-child(2){border-bottom: 0.01rem solid #e1e1e1;} */
.modalUndertake li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}


/* .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
.text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;} */


.dialogUndertake >>> .el-dialog__body{padding: 0px 0px}
.dialogUndertake >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogUndertake >>> .el-dialog__footer{padding: 0px 0px 0px}

.dialogRefuseReason >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogRefuseReason >>> .el-dialog__body{padding: 15px 5px}
.dialogRefuseReason >>> .el-dialog__footer{padding: 1px 5px 5px; text-align:center}

</style>


