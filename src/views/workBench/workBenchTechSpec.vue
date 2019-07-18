<template>
    <div class="workBenchTechSpecView">
        <header-last :title="workBenchTechSpecTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchTechSpecContent">
            <span class="htmlInfoSpan" v-html="dutyInformation">{{dutyInformation}}</span>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'workBenchTechSpec',
    components:{
        headerLast
    },
    data(){
        return{
            workBenchTechSpecTit:'技术专家组',
            dutyInformation:'',
            dutyType:this.$route.query.dutyType
        }
    },
    created(){
        fetch.get("?action=/risk/queryEmpOnDuty&dutyType="+this.dutyType,{}).then(res=>{
            console.log(res);
            if(res.STATUSCODE=='1'){
                this.dutyInformation = res.data.dutyInformation
            }
        })
    }
}
</script>
<style scoped>
.workBenchTechSpecContent{width: 100%; margin-top: 0.05rem ;color: #999999; background: #ffffff;overflow: scroll}
</style>


