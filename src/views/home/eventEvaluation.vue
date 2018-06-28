<template>
  <div class="eventEvaluationView">
    <header-last></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <template v-for="item in table_arr">
          <el-table-column
            :fixed="item.fixed"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'eventEvaluation',

  components: {
    headerLast
  },

  data () {
    return {
      tableData: [{
        evaluateID: '1277962',
        evaluatetype: '客户评价故障处理服务',
        state: '已评论',
        evaluateNum: '3'
      }, {
        evaluateID: '1277962',
        evaluatetype: '一线评价二线',
        state: '未评论',
        evaluateNum: '3'
      }, {
        evaluateID: '1277962',
        evaluatetype: '南区服务部',
        state: '已评论',
        evaluateNum: '3'
      }],
      table_arr: [
        {
          prop: 'evaluateID',
          label: '评价ID',
          fixed: true,
          width: '23%'
        }, {
          prop: 'evaluatetype',
          label: '评价类型',
          width: '45%'
        }, {
          prop: 'state',
          label: '状态',
          width: '20%'
        }, {
          prop: 'evaluateNum',
          label: '评价分值',
          width: '22%'
        }
      ]
    }
  },

  methods: {

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
