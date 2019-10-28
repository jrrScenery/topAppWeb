<template>
    <div class="checkAttenDetailView">
        <header-last :title="checkAttenDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <ul class="ul_AttenView" @click="getPunchDetail" v-if="liObj.length!=0">   
            <li class="li_AttenView" v-for="item in liObj" :data-id='item.id' :key="item.id">
                <template>
                    <span :data-id='item.id'>{{item.text}}</span>
                    <i class="el-icon-arrow-right" :data-id='item.id'></i>
                </template>
            </li>
        </ul>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
export default {
    name:'checkAttenDetail',
    components:{
        headerLast
    },
    data(){
        return{
            checkAttenDetailTit:'项目列表',
            liObj: [  
                {id:'1',text: '神州数码维保项目'},
                {id:'WYWAI60FSVB1',text: '北汽集团系统外包项目'},
                {id:'DYWAI60HNI',text: '去哪网外包框架项目'},
                {id:'WVJAI60A14W1',text: '机房搬迁项目'},
                {id:'NPMTEST3',text: 'NPMC测试项目3'},
            ]
        }
    },
    methods:{
        getPunchDetail:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let id = target.getAttribute('data-id');
            console.log('data-id',id);
            this.$router.push({name:'punchDetail',query:{id:id}})
        },
        pushDtail(caseId){
            console.log("caseId:",caseId);
            this.$router.push({name:'attenDetail',query:{caseId:caseId}})
        }
    }
}
</script>
<style scoped>
.checkAttenDetailView{position: absolute; top: 0; width: 100%;overflow: scroll}
.ul_AttenView .li_AttenView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
/* .ul_AttenView .li_AttenView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;} */
.ul_AttenView .li_AttenView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_AttenView .li_AttenView span{width: 100%; text-align: left; color: #262626;font-size:0.15rem}
</style>