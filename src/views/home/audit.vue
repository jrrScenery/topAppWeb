<template>
    <div class="todoAuditView">
        <header-last :title="todoAuditTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="firstTabTit" name="first"><todo-audit></todo-audit></el-tab-pane>
                <el-tab-pane :label="secondTabTit" name="second" lazy><done-audit></done-audit> </el-tab-pane>
            </el-tabs> 
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import todoAudit from '../../components/audit/todoAudit'
import doneAudit from '../../components/audit/doneAudit'
export default {
    name:'audit',
    components:{
        headerLast,
        todoAudit,
        doneAudit,
    },
    data(){
        return{
            activeName: 'first',
            todoAuditTit:'审批',
            firstTabTit: '待我审批',
            secondTabTit: '我已审批',
            todoListArr:[],
        }
    },
    created(){
    }
}
</script>
<style scoped>
.todoAuditView{width: 100%;}
.content{margin: 0 0; background: #ffffff; position: relative;}
.content >>> .el-tabs__header{margin: 0 0 0rem;}
.content >>> .el-tabs__item.is-active{color: #2698d6;}
.content >>> .el-tabs__active-bar{background: #2698d6;}
.content >>> .el-tabs__nav{width: 100%; text-align: center;}
.content >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>