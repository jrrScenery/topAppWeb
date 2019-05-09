<template>
    <div class="eventPersonRequireListView">
        <header-event-person :title="eventPersonRequireListTit"></header-event-person>
        <div style="height: 0.45rem;"></div>
        <div class="content">
            <div v-if="workinfoList.length!=0">
                <div class="workInfoListCell" v-for="item in workinfoList" :key="item.id">
                    <router-link :to="{name:'eventPersonRequireDetail',query:{caseId:item.caseId,workId:item.workId}}">
                        <ul class="tableTd">
                            <li>
                                <span>工单编号</span>  
                                <span style="color:#2698d6">{{item.caseNo}}</span>
                            </li>
                            <li>
                                <span>负责人</span>  
                                <span>{{item.workManager}}</span>
                            </li>
                            <li>
                                <span>厂商</span>  
                                <span>{{item.factoryNm}}</span>
                            </li>
                            <li>
                                <span>技术方向</span>  
                                <span>{{item.equipTypeName}}</span>
                            </li>  
                            <li>
                                <span>型号组</span>  
                                <span>{{item.modelgroupName}}</span>
                            </li>
                            <li>
                                <span>标准任务项</span>  
                                <span>{{item.abilityContent}}</span>
                            </li>    
                            <li>
                                <span>工作类型</span>  
                                <span>{{item.workType}}</span>
                            </li> 
                            <li>
                                <span>工作内容要求</span>  
                                <span>{{item.workRequire}}</span>
                            </li> 
                            <li>
                                <span>标准工作量</span>  
                                <span>{{item.standardHours}}</span>
                            </li>                   
                            <li>
                                <span>调整工作量</span>  
                                <span>{{item.expectWorkHours}}</span>
                            </li> 
                            <li>
                                <span>路途工作量</span>  
                                <span>{{item.wayWorkload}}</span>
                            </li> 
                            <li>
                                <span>到场SLA截止时间</span>  
                                <span>{{item.expectStart}}</span>
                            </li> 
                            <li>
                                <span>要求到场时间</span>  
                                <span>{{item.requireArriveTime}}</span>
                            </li> 
                        </ul>
                    </router-link>
                </div>
            </div>
            <div style="text-align:center;font-size:0.13rem;padding:0.15rem 0;color: #acacac" v-else>暂无人员需求信息</div>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerEventPerson from '../header/headerEventPerson'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'eventPersonRequireList',
    components: {
        headerEventPerson,
        footerHome
    },
    data(){
        return{
            eventPersonRequireListTit:'人员需求',
            workinfoList:[],
            caseId:this.$route.query.caseId,
        }
    },
    created(){
        this.getWorkinfoList();
        // this.getWorkType();
    },
    methods:{
        // getWorkType(){
        //     fetch.get("?action=getDict&type=NT_WORK_TYPE","").then(res=>{
        //         console.log(res.data);
        //         this.workTypeArr = res.data;
        //     });
        // },
        getWorkinfoList(){
            console.log(this.caseId);
            fetch.get("?action=/secondline/queryWorkinfoList&CASE_ID="+this.caseId).then(res=>{
                console.log("queryWorkinfoList",res);
                if(res.STATUSCODE=="1"){
                    this.workinfoList = res.data;
                }
            })
        },  
    }
}
</script>
<style scoped>
.content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;margin-top: 0.05rem; overflow: scroll;}
.workInfoListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
.tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa}
</style>


