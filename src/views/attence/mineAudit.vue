<template>
<div class="mineAuditView">
    <header-last :title="mineAuditTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="firstTabTit" name="first"><mine-auditing></mine-auditing></el-tab-pane>
            <el-tab-pane :label="secondTabTit" name="second" lazy><mine-done-audit></mine-done-audit> </el-tab-pane>
            <el-tab-pane :label="thirdTabTit" name="third" lazy><mine-refused></mine-refused> </el-tab-pane>
        </el-tabs>
    </div>
</div>
    
</template>
<script>
import headerLast from '@/views/header/headerLast'
import mineAuditing from '@/components/mineAudit/mineAuditing'
import mineDoneAudit from '@/components/mineAudit/mineDoneAudit'
import mineRefused from '@/components/mineAudit/mineRefused'
export default {
    name:'mineAudit',
    components:{
        headerLast,
        mineAuditing,
        mineDoneAudit,
        mineRefused
    },
    data(){
        return{
            mineAuditTit:'我的',
            firstTabTit:'审批中',
            secondTabTit:'已审批',
            thirdTabTit:'被驳回',
            activeName: 'first',
        }
    }
}
</script>
<style scoped>
.content{margin: 0 0; background: #ffffff; position: relative;}
.content >>> .el-tabs__header{margin: 0 0 0rem;}
.content >>> .el-tabs__item.is-active{color: #2698d6;}
.content >>> .el-tabs__active-bar{background: #2698d6;}
.content >>> .el-tabs__nav{width: 100%; text-align: center;}
.content >>> .el-tabs__item{width: 33%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>