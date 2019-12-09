<template>
    <div class="workBenchWorkInfoPartsView">
        <header-last :title="workBenchWorkInfoPartsTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchWorkInfoPartsContent" @click="handleHtml($event)">
            <span class="htmlInfoSpan" v-html="dutyInformation">{{dutyInformation}}</span>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'workBenchWorkInfoParts',
    components:{
        headerLast
    },
    data(){
        return{
            workBenchWorkInfoPartsTit:'备件',
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
    },
    methods:{
        handleHtml($event){
        　　console.log("target",$event.target);
            console.log($event.target.firstChild.data);
            if($event.target.firstChild.data!=undefined){
                let a = $event.target.firstChild.data.trim("");
                let phone = a.slice(a.length-11,a.lenght);
                console.log(phone);
                if(this.telRuleCheck2(phone)){
                    window.location.href = 'tel://'+phone
                }
            }
        },
        telRuleCheck2(string) {
            var pattern = /^1[34578]\d{9}$/;
            if (pattern.test(string)) {
                return true;
            }
            return false;
        }
    }
}
</script>
<style scoped>
.workBenchWorkInfoPartsContent{width: 100%; margin-top: 0.05rem ;color: #999999; background: #ffffff;overflow: scroll}
</style>


