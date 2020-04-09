<template>
    <div class="attenHistoryView">
        <header-last :title="attenHistoryTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="firstTabTit" name="first"><work-day></work-day></el-tab-pane>
                <el-tab-pane :label="secondTabTit" name="second" lazy><natural-day></natural-day></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast"
import workDay from "../../components/attenHistory/workDay"
import naturalDay from "../../components/attenHistory/naturalDay"
export default {
    name:'attenHistory',
    components:{
        headerLast,
        workDay,
        naturalDay
    },
    data(){
        return{
            attenHistoryTit:'打卡明细',
            activeName: 'first',
            firstTabTit: '工作日',
            secondTabTit: '自然日',
            searchData: {
                wholeMonth: "0", //type=0代办查看全月，type=1代表查看缺勤
                month: this.$route.query.dateStr
            },
            staffName:this.$route.query.staffName
        }
    },
    created(){
        console.log("searchData",this.searchData);
    }, 
    methods:{
    },
}
</script>
<style scoped>
.attenHistoryView{width: 100%;height: 100%;overflow: scroll}
.content{margin: 0 0; background: #ffffff; position: relative;}
.content >>> .el-tabs__header{margin: 0 0 0rem;}
.content >>> .el-tabs__item.is-active{color: #2698d6;}
.content >>> .el-tabs__active-bar{background: #2698d6;}
.content >>> .el-tabs__nav{width: 100%; text-align: center;}
.content >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>