<template>
    <div class="workBenchSouthView">
        <header-last :title="workBenchSouthTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchSouthContent">
            <div v-if="dutyInformation">
                <span class="htmlInfoSpan" v-html="dutyInformation">{{dutyInformation}}</span>
            </div>
            <div style="text-align:center" v-else>暂无数据</div>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'workBenchSouth',
    components:{
        headerLast
    },
    data(){
        return{
            workBenchSouthTit:'南区二线',
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
.workBenchSouthContent{width: 100%; margin-top: 0.05rem ;color: #999999; background: #ffffff;overflow: scroll}
</style>


