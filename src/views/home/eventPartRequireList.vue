<template>
    <div class="eventPartrequireListView">
        <header-event-part :title="eventPartRequireListTit"></header-event-part>
        <div style="height: 0.45rem;"></div>
        <div class="eventPartRequireListContent">
            <div v-if="caseDemandList.length!=0">
                <div class="workInfoListCell" v-for="item in caseDemandList" :key="item.id">
                    <router-link :to="{name:'eventPartRequireDetail',query:{caseId:item.caseId,demandMainId:item.demandMainId,demandDetailId:item.demandDetailId}}">
                        <ul class="tableTd">
                            <li>
                                <span>需求单编号</span>  
                                <span style="color:#2698d6">{{item.demandMainCode}}</span>
                            </li>
                            <li>
                                <span>备件分类</span>  
                                <span>{{item.partsTypeName}}</span>
                            </li>
                            <li>
                                <span>设备型号</span>  
                                <span>{{item.modelName}}</span>
                            </li>
                            <li>
                                <span>厂商</span>  
                                <span>{{item.factoryNm}}</span>
                            </li>  
                            <li>
                                <span>设备类型</span>  
                                <span>{{item.equipTypeName}}</span>
                            </li>
                            <li>
                                <span>PN/FRU号</span>  
                                <span>{{item.partPn}}</span>
                            </li>    
                            <li>
                                <span>微码</span>  
                                <span>{{item.wm}}</span>
                            </li> 
                            <li>
                                <span>通用PN</span>  
                                <span>{{item.commonPn}}</span>
                            </li> 
                            <li>
                                <span>数量</span>  
                                <span>{{item.num}}</span>
                            </li>                   
                            <li>
                                <span>备份</span>  
                                <span>{{item.backupNum}}</span>
                            </li> 
                            <li>
                                <span>相应描述</span>  
                                <span>{{item.decrible}}</span>
                            </li> 
                            <li>
                                <span>接口类型</span>  
                                <span>{{item.interfaceType}}</span>
                            </li> 
                            <li>
                                <span>盘架要求</span>  
                                <span>{{item.rackReq}}</span>
                            </li> 
                        </ul>
                    </router-link>
                    <div style="padding-left:85%">
                        <el-button type="primary" icon="el-icon-delete" @click="dialogVisible = true"></el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="70%"
                            :show-close=false>
                            <span>将删除top端相关联的其他信息</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="deleteRow(item.demandMainId)">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
            <div style="text-align:center;font-size:0.13rem;padding:0.15rem 0;color: #acacac" v-else>暂无备件需求信息</div>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerEventPart from '../header/headerEventPart'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'eventPartRequireList',
    components: {
        headerEventPart,
        footerHome
    },
    data(){
        return{
            eventPartRequireListTit:'备件需求',
            caseDemandList:[],
            caseId:this.$route.query.caseId,
            dialogVisible: false
        }
    },
    created(){
        this.getCaseDemand();
    },
    methods:{
        getCaseDemand(){
            fetch.get("?action=/secondline/queryCaseDemand&CASE_ID="+this.caseId).then(res=>{
                console.log("queryCaseDemand",res);
                if(res.STATUSCODE=="1"){
                    this.caseDemandList = res.data;
                }
            })
        },
        deleteRow(demandMainId){
            console.log("delete");
            console.log(demandMainId)
            fetch.get("?action=/secondline/deleteCaseDemand&MAIN_ID="+demandMainId).then(res=>{
                console.log("deleteCaseDemand",res);
                if(res.STATUSCODE=="1"){
                    this.$message({
                        message:'删除成功',
                        type: 'success',
                        center: true,
                        duration:1000,
                        customClass: 'msgdefine'
                    });
                    this.dialogVisible=false;
                    this.getCaseDemand();
                }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    this.dialogVisible=false;
                }
            })
        }
    }
}
</script>
<style scoped>
.eventPartRequireListContent{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;margin-top: 0.05rem; overflow: scroll;}
.workInfoListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
.tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa}
</style>


