<!--首页-事件详情-服务评价-->
<template>
  <div class="eventEvaluationView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-table
        :data="tableData"
        v-loadmore="loadMore"
        :height="tableHeight"
        stripe
        ref="etable"
        style="width: 100%">
        <template v-for="item in table_arr">
          <router-link :to="{name:'eventEvaluationEditor'}" :key="item.id">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
          </router-link>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'

export default {
  name: 'eventEvaluation',

  components: {
    headerLast
  },

  data () {
    return {
      eventEvaluationTit: '服务评价',
      tableData: [
        /*
        {
        EVALUATE_ID: '1277962',
        TYPE_NAME: '客户评价故障处理服务',
        STATUS_NAME: '已评论',
        TOTAL_SCORE: '3'

        }
        */
      ],
      table_arr: [
        {
          prop: 'EVALUATE_ID',
          label: '评价ID',
          fixed: true,
          width: '23%'
        }, {
          prop: 'TYPE_NAME',
          label: '评价类型',
          width: '45%'
        }, {
          prop: 'STATUS_NAME',
          label: '状态',
          width: '20%'
        }, {
          prop: 'TOTAL_SCORE',
          label: '评价分值',
          width: '22%'
        }
      ],
      page:1,
      pageSize:20,
      busy:false,
      loadall: false,
      tableHeight:500
    }
  },

  methods: {
    getEventList(flag){
      var caseId = this.$route.params.caseId;
      this.$axios.get(
      global_.proxyServer+"?action=GetCaseEvaluate",{params:{PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,CASE_ID:this.$route.params.caseId}}).then(res=>{
        if(flag){
            this.tableData = this.tableData.concat(res.data.data);
        }else{
            this.tableData = res.data.data;
        }

        if(0 == res.data.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }
      });
    },
    loadMore(){
      if(this.busy){return}
      this.busy = true;
      setTimeout(() => {
        this.getEventList(this.page>1);
      }, 500);
    }
  },
  created:function(){
    var caseId = this.$route.params.caseId;
    var url = global_.proxyServer+"?action=GetCaseEvaluate&PAGE_NUM=1&PAGE_TOTAL=10";
    if(caseId!=undefined&&caseId.length > 0){
      url = global_.proxyServer+"?action=GetCaseEvaluateList&PAGE_NUM=1&PAGE_TOTAL=10&CASE_ID="+caseId;
    }
    this.$axios.get(url,{}).then(res=>{
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },
  mounted(){
    this.$nextTick(() => {
        let self = this;
        this.tableHeight = document.documentElement.clientHeight- this.$refs.etable.$el.offsetTop;
            // 通过捕获系统的onresize事件触发去改变原有的高度
        window.onresize = function() {
            this.tableHeight = document.documentElement.clientHeight- this.$refs.etable.$el.offsetTop;
        }
    })
    this.getEventList(false);
  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff;}
  .content >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .content >>> .el-table th>.cell{line-height: 0.3rem; padding: 0}
  .content >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .content >>> .el-table td>.cell{line-height: 0.3rem; padding: 0}
</style>
