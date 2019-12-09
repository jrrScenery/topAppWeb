<template>
    <div class="checkAttenDetailView">
        <header-last :title="checkAttenDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <ul class="ul_AttenView" @click="getPunchDetail" v-if="liObj.length!=0">   
            <li class="li_AttenView" v-for="item in liObj" :data-id='item.projectId' :key="item.projectId">
                <template>
                    <span :data-id='item.projectId'>{{item.projectName}}</span>
                    <i class="el-icon-arrow-right" :data-id='item.projectId'></i>
                </template>
            </li>
        </ul>
        <ul class="norecord" v-else>暂无项目信息</ul>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
export default {
    name:'checkAttenDetail',
    components:{
        headerLast
    },
    data(){
        return{
            checkAttenDetailTit:'项目列表',
            liObj: []
        }
    },
    created(){
        this.getProjectList();
    },
    methods:{
        getProjectList:function(){
            fetch.get("?action=/attendance/queryProjectList",'').then(res=>{
                console.log("queryProjectList",res);
                if(res.STATUSCODE === '1'){
                    this.liObj = res.data;
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
        getPunchDetail:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let id = target.getAttribute('data-id');
            console.log('data-id',id);
            if(id!=null){
                this.$router.push({name:'punchDetail',query:{id:id}})
            }
        },
        // pushDtail(caseId){
        //     console.log("caseId:",caseId);
        //     this.$router.push({name:'attenDetail',query:{caseId:caseId}})
        // }
    }
}
</script>
<style scoped>
.checkAttenDetailView{position: absolute; top: 0; width: 100%;overflow: scroll}
.ul_AttenView .li_AttenView{display: flex; justify-content: space-between; align-items: center;height: 0.55rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
/* .ul_AttenView .li_AttenView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;} */
.ul_AttenView .li_AttenView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_AttenView .li_AttenView span{width: 100%; text-align: left; color: #262626;font-size:0.12rem;line-height: 0.2rem}
.checkAttenDetailView>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>