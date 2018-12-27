<template>
    <div class="workBenchPOPayDetailView">
        <header-last :title="workBenchPOPayDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchPOStaffObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchPOPayDetail',
    components: {
        headerLast
    },
    data () {
        return{
            workBenchPOPayDetailTit: 'PO支付详情',
            payPlanId:this.$route.query.payPlanId,
            workBenchPOStaffObj:[
                {leftTit: '计划编号：', rightCon: ''},
                {leftTit: '姓名：', rightCon: ''},
                {leftTit: '类型：', rightCon: ''},
                {leftTit: '业务方向：', rightCon: ''},
                {leftTit: '区域：', rightCon: ''},
                {leftTit: '制作者：', rightCon: ''},
                {leftTit: '审批日期：', rightCon: ''},
                {leftTit: '支付金额：', rightCon: ''},
                {leftTit: '预计支付：', rightCon: ''},
                {leftTit: '实际支付：', rightCon: ''},
                {leftTit: '说明：', rightCon: ''}
            ]
        }
    },
    created(){
        fetch.get("?action=/po/GetPODetail&TYPE="+this.$route.query.type+"&PAYPLAN_ID="+this.$route.query.payPlanId,{}).then(res=>{
            console.log("GetPODetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchPOStaffObj[0].rightCon = res.data[i].PAYPLAN_ID;
                this.workBenchPOStaffObj[1].rightCon = res.data[i].SUPPLIER_NAME;
                if(this.$route.query.type=='1'){
                    this.workBenchPOStaffObj[2].rightCon = "人员";
                }else{
                    this.workBenchPOStaffObj[2].rightCon = "备件";
                }
                this.workBenchPOStaffObj[3].rightCon = res.data[i].BUSINESS;
                this.workBenchPOStaffObj[4].rightCon = res.data[i].AREA_NAME;
                this.workBenchPOStaffObj[5].rightCon = res.data[i].PAYPLAN_OWNER;
                this.workBenchPOStaffObj[6].rightCon = res.data[i].APPROVE_DATE;
                this.workBenchPOStaffObj[7].rightCon = res.data[i].TOTALAMOUNT;
                this.workBenchPOStaffObj[8].rightCon = res.data[i].PAYPLAN_DATE;
                this.workBenchPOStaffObj[9].rightCon = res.data[i].PAYPLAN_ACTUALDATE;
                this.workBenchPOStaffObj[10].rightCon = res.data[i].REMARK;
            }
        });
    }
    
}
</script>

<style scoped>
  .workBenchPOStaffView{width: 100%;}
  /* .content{width: 100%; position: absolute; top: 0;bottom: 0; color: #666666;overflow: scroll;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center;}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial} */

  .content{width: 100%; margin-top: 0.05rem; color: #999999; background: #ffffff;}
  .content .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .content .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .content ul li{padding: 0 0.25rem;}
  .content ul li{display: flex; line-height: 0.25rem;}
  .content ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
  .content ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
  .content ul li p:nth-child(1){width: 0.91rem;}
  .content ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>



  