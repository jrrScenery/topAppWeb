<template>
    <div class="todoAuditView">
        <div class="todoContent">
           <div class="todoCell" v-for="item in todoListArr" :key="item.id">
                <router-link :to="{name:'auditDetail',query:{status:item.status}}">
                    <ul class="tableTd">                  
                        <li>
                            <span>打卡日期：</span>  
                            <span style="color:#2698d6">{{item.date}}</span>
                        </li>
                        <li>
                            <span>提交人：</span>  
                            <span>{{item.submitter}}</span>
                        </li>
                        <li>
                            <span>提交时间：</span>  
                            <span>{{item.submitTime}}</span>
                        </li>
                    </ul>
                </router-link>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'todoAudit',
    components:{},
    data(){
        return{
            todoListArr:[
                {
                    date:'2019-08-13 10:00',
                    submitter:'杜鑫',
                    submitTime:'2019-08-13 11:30',
                    status:'A0'
                },
                {
                    date:'2019-08-12 10:00',
                    submitter:'王永红',
                    submitTime:'2019-08-13 14:00',
                    status:'A0'
                }
            ],

        }
    },
    created(){
    }

}
</script>
<style scoped>
.todoAuditView{width:100%;height:100%;}
.todoContent{width: 100%; top: 0.45rem; margin-top: 0.05rem; overflow: scroll;}
.todoCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
.tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: left;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.todoContent:nth-child(2n+1){background: #fafafa}
</style>