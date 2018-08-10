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
            <router-link :to="{name:'',query:''}">
                <div>
                <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
                <span>承接反馈</span>
                </div>
            </router-link>
            </el-col>
            <el-col :span="7">
            <router-link :to="{}">
            <div>
                <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                <span>SLA反馈</span>
            </div>
            </router-link>
            </el-col>
            <el-col :span="7">
            <router-link :to="{}">
                <div>
                <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                <span>服务单</span>
                </div>
            </router-link>
            </el-col>
            <el-col :span="3"><div class="el-icon-more" @click.stop="popBg=!popBg"></div></el-col>
        </el-row>
        </div>
        <div v-if="popBg" class="popBg" @click.stop="popBg=!popBg">
        <ul>
            <router-link :to="{}">
            <li><img src="../../assets/images/eventBaseInfo_4.png" alt="">工作量确认</li>
            </router-link>
            <router-link :to="{}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">人员评价</li>
            </router-link>
            <router-link :to="{}">
            <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/sla.png" alt="">备件评价</li>
            </router-link>
            <router-link :to="{}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">备件整理</li>
            </router-link>
            <router-link :to="{}">
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
    data(){
        return{
            workBenchTaskDetailTit:"任务",
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            eng2partEvalid:'',
            popBg: false,
            attention:"实施过程中遇到技术问题反馈技术责任人，非技术问题反馈派工人，非工作时间请联系 400-610-6661",
            taskDetailInfo:{}
        }
    },
    created:function(){
        fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
            console.log(res);   
          this.taskDetailInfo = res.DATA[0];
          this.eng2partEvalid = res.DATA[0].eng2partEvalid;
        });
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'workBenchTaskList') {
            to.meta.isUseCache = true;    
        }        
        next();
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
</style>
