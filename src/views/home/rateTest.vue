<template>
    <div class="rateView">
        <header-last :title="rateTestTit"></header-last>
        <!-- <div style="height:0.45rem"></div> -->
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane name="first"><rate></rate></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast"
import rate from "../../components/rate/rate"
export default {
    name:'rateTest',
    components:{
        headerLast,
        rate
    },
    data(){
        return{
            rateTestTit:'评价',
            activeName:'first'
        }
    }

}
</script>
<style scoped>
.rateView{width: 100%;background: #ffffff}
</style>