<template>
    <div class="serviceListView">
        <header-base-nine :title="serviceListTit" :caseId='caseId' :workId='workId' :taskId='taskId' :serviceType='serviceType'></header-base-nine>
        <div style="height: 0.45rem;"></div>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="taskListCell" v-for="item in serviceList" :key="item.id">
                <router-link :to="{name:'onsiteServiceInfo',query:{caseId:item.caseId,serviceId:item.serviceId,workId:item.workId,taskId:item.taskId,evaluateId:item.evaluateId,serviceType:item.serviceType,workTypeId:item.workTypeId}}">
                    <ul class="tableTd">
                        <li>
                            <span>服务单号</span>  
                            <span style="color:#2698d6">{{item.serviceCd}}</span>
                        </li> 
                        <li>
                            <span>评价ID</span>  
                            <span>{{item.evaluateId}}</span>
                        </li>
                        <li>
                            <span>服务单类型</span>  
                            <span>{{item.serviceTypeName}}</span>
                        </li>
                        <li>
                            <span>工程师</span>  
                            <span>{{item.realname}}</span>
                        </li>  
                        <li>
                            <span>发起日期</span>  
                            <span>{{item.createdOn}}</span>
                        </li>
                        <li>
                            <span>服务单状态</span>  
                            <span>{{item.serviceStatusName}}</span>
                        </li>    
                        <li>
                            <span>客户确认日期</span>  
                            <span>{{item.custDate}}</span>
                        </li>                   
                    </ul>
                </router-link>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerBaseNine from '../header/headerBaseNine'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'serviceList',
    components: {
        headerBaseNine,
        loadingtmp,
        footerHome
    },
    data(){
        return {
            serviceListTit:"服务单一览表",
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            taskId:this.$route.query.taskId,
            workTypeId:this.$route.query.workTypeId,
            serviceType:'',
            page:1,
            pageSize:10,
            busy:true,
            loadall: false,
            serviceList:[]
        }
    },
    activated(){
        console.log("workId111111",this.$route.query.workId);
        if(!this.$route.meta.isUseCache){
            this.caseId = this.$route.query.caseId;
            this.workId = this.$route.query.workId;
            this.taskId = this.$route.query.taskId;
            this.workTypeId = this.$route.query.workTypeId;
            this.serviceList = [];
            this.busy= false;
            this.loadall= false;
            this.page =1;
            this.loadMore();
        }
        this.getServiceType(this.workTypeId);
        this.$route.meta.isUseCache = false;
    },
    methods:{
        getServiceType(workTypeId){
            console.log("workTypeId",this.workTypeId);
            if(this.workTypeId=='XCSS'){//现场实施用case故障处理
                this.serviceType = 1;
            }else if(this.workTypeId=='XXSJ'||this.workTypeId=='XJ'||this.workTypeId=='XJBG'||this.workTypeId=='ZCFW'||this.workTypeId=='JSZC'){
                this.serviceType = 2
            }else{
                this.serviceType = 0//无服务单
            }
        },
        getEventList(){
            var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
            var flag = this.page>1;
            fetch.get("?action=/work/GetServiceFormList&WORK_ID="+this.$route.query.workId+"&CASE_ID="+this.$route.query.caseId,params).then(res=>{  
                console.log("GetServiceFormList",res);
                if(flag){
                    this.serviceList = this.serviceList.concat(res.DATA);
                }else{
                    this.serviceList = res.DATA;
                }
                if(0 == res.DATA.length || res.DATA.length<this.pageSize ){
                this.busy = false;
                this.loadall = true;
                }
                else{
                this.busy = false;
                this.page++
                }
            })
        },
        
        loadMore(){
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getEventList();
            }, 500);
        },    
    },
    created(){
        this.getServiceType(this.workTypeId);
        
    }, 
    beforeRouteLeave( to, from,next){
        console.log(to);
        if (to.name == 'onsiteServiceInfo') {
            to.meta.keepAlive = false;   
            this.scrollTop = document.querySelector('.content').scrollTop; 
        }        
        next();
    },
        //进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter (to, from, next) {
        console.log("next:",next);
        next(vm => {
        console.log("vmvmvm",vm.scrollTop);
        document.querySelector('.content').scrollTop = vm.scrollTop
        })
    },
    
}
</script>


<style scoped>
    .serviceListView{width: 100%;}
    .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;margin-top: 0.05rem; overflow: scroll;}
    .taskListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
    .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .content:nth-child(2n+1){background: #fafafa}

</style>
