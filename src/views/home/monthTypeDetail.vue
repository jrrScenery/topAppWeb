<template>
    <div class="monthTypeDetailView">
        <header-last :title='monthTypeDetailTit'></header-last>
        <div style="height:0.45rem"></div>
            <div class="tableTh"><span>打卡日期</span><span>首次打卡</span><span>末次打卡</span></div>
            <div class="tableTd" v-for="items in monthDetail" :key="items.staffName">
                <div class="tableTitle">{{items.staffName}}</div>
                <div class="divTable" v-for="item in items.punchdetail" :key="item.id">
                    <span class="bolder">{{item.punchDate}}</span>          
                    <span class="bolder">{{item.punchBeginTime}}</span>        
                    <span class="bolder">{{item.punchEndTime}}</span> 
                </div>
            </div>
    </div>
    
</template>
<script>
import headerLast from "../header/headerLast";
export default {
    name:'monthTypeDetail',
    components:{
        headerLast
    },
    data(){
        return{
            monthTypeDetailTit:'月统计明细',
            monthDetail:[
                {
                    staffName:'郭丽',
                    punchdetail:[{
                        punchDate:"2019-10-10",
                        punchBeginTime:"09:01",
                        punchEndTime:"18:03"
                    },{
                        punchDate:"2019-10-11",
                        punchBeginTime:"09:30",
                        punchEndTime:"18:00"
                    }]
                },{
                    staffName:'杜鑫',
                    punchdetail:[{
                        punchDate:"2019-10-11",
                        punchBeginTime:"09:20",
                        punchEndTime:"18:03"
                    }]
                }
            ]
        }
    },
    created(){

    },
    methods:{

    }
}
</script>
<style scoped>
.monthTypeDetailView{width: 100%;height:100%;overflow: scroll;line-height: 0.3rem;}
.monthTypeDetailView>>>.tableTh span{display: inline-block; width: 33%; color: #666666; line-height: 0.4rem; text-align: center;}
.monthTypeDetailView>>>.tableTd .tableTitle{color: #2698d6; padding-left: 0.25rem; position: relative; background: #ffffff;}
.monthTypeDetailView>>>.tableTd .tableTitle:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.09rem; background: #2698d6;}
.monthTypeDetailView>>>.tableTd .divTable{text-align: center; display: flex; flex-wrap: wrap;}
/* .monthTypeDetailView>>>.tableTd .divTable a{display: flex; width: 100%; color: #999999}
.monthTypeDetailView>>>.tableTd .divTable a:nth-child(2n+1){background: #f7f7f7;}
.monthTypeDetailView>>>.tableTd .divTable a:nth-child(2n){text-align: center; background: #ffffff;} */
.monthTypeDetailView>>>.tableTd .divTable span{display: inline-block; width: 33%; overflow: hidden; text-align: center;}
/* .monthTypeDetailView>>>.tableTd .divTable a span:last-child{width: 31%; text-align: right; padding-right: 0.05rem} */
</style>