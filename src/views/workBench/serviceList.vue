<template>
    <div class="serviceListView">
        <header-last :title="serviceListTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="taskListCell" v-for="item in serviceList" :key="item.id">
                <router-link :to="{name:'onsiteServiceInfo',query:{caseId:item.caseId,serviceId:item.serviceId,workId:item.workId,taskId:item.taskId,evaluateId:item.evaluateId,serviceType:item.serviceType}}">
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
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'serviceList',
    components: {
        headerLast,
        loadingtmp
    },
    data(){
        return {
            serviceListTit:"服务单一览表",
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            page:1,
            pageSize:10,
            busy:true,
            loadall: false,
            serviceList:[]
        }
    },
    activated(){
        // console.log(this.busy);
        // console.log(this.loadall);
        // console.log(this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
        this.serviceList = [];
        this.busy= false;
        this.loadall= false;
        this.page =1;
        this.loadMore();
        }
        this.$route.meta.isUseCache = false;
    },
    methods:{
        getEventList(){
            // console.log(this.busy+","+this.loadall);
            // console.log(this.workId+","+this.caseId);
            var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
            var flag = this.page>1;
            fetch.get("?action=/work/GetServiceFormList&WORK_ID="+this.workId+"&CASE_ID="+this.caseId,params).then(res=>{  
                console.log(res);
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
            console.log(this.busy);
            console.log(this.loadall);
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                console.log("getEventList");
                this.getEventList();
            }, 500);
        },
        beforeRouteLeave( to, from,next){
            if (to.name == 'workBenchTaskDetailInfo') {
                to.meta.isUseCache = true;    
            }        
            next();
        }
        
      
    },
    created:function(){
        fetch.get("?action=/work/GetServiceFormList&WORK_ID="+this.workId+"&CASE_ID="+this.caseId,{}).then(res=>{     
            console.log(res);   
            this.serviceList = res.DATA;
        });
    },
    
}
</script>


<style scoped>
    .serviceListView{width: 100%;}
    .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;margin-top: 0.05rem; overflow: scroll;}
    .taskListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
    .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .content:nth-child(2n+1){background: #fafafa}

</style>
