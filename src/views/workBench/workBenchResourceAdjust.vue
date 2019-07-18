<template>
    <div class="workBenchResourceAdjustView">
        <header-last :title="workBenchResourceAdjustTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchResourceAdjustContent">
            <span class="htmlInfoSpan" v-html="dutyInformation">{{dutyInformation}}</span>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'workBenchResourceAdjust',
    components:{
        headerLast
    },
    data(){
        return{
            workBenchResourceAdjustTit:'一线资源协调',
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
.workBenchResourceAdjustContent{width: 100%; margin-top: 0.05rem ;color: #999999; background: #ffffff;overflow: scroll}
</style>


