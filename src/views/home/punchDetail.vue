<template>
    <div class="punchDetailView">
        <header-last :title="punchDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="firstTabTit" name="first"><day-detail></day-detail></el-tab-pane>
                <el-tab-pane :label="secondTabTit" name="second" lazy><month-detail></month-detail></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast"
import dayDetail from "../../components/punchDetail/dayDetail"
import monthDetail from "../../components/punchDetail/monthDetail"
export default {
    name:'punchDetail',
    components:{
        headerLast,
        dayDetail,
        monthDetail
    },
    data(){
        return{
            punchDetailTit:'打卡明细',
            searchType:'punchDetail',
            activeName: 'first',
            firstTabTit: '日统计',
            secondTabTit: '月统计',
            searchData:this.$route.query.searchData
        }
    },
    created(){
        console.log("searchData",this.searchData);
    }, 
    methods:{
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'checkAttenDetail') {
            to.meta.isUseCache = true;    
        }        
        next();
    }
}
</script>
<style scoped>
.punchDetailView{width: 100%;height: 100%;overflow: scroll}
.content{margin: 0 0; background: #ffffff; position: relative;}
.content >>> .el-tabs__header{margin: 0 0 0rem;}
.content >>> .el-tabs__item.is-active{color: #2698d6;}
.content >>> .el-tabs__active-bar{background: #2698d6;}
.content >>> .el-tabs__nav{width: 100%; text-align: center;}
.content >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>