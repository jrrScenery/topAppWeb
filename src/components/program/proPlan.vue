<template>
  <div class="proPlanView">
    <div class="proPlanCell">
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
export default {
  name: 'proPlan',

  components: {

  },

  data () {
    return {
      tableData: [{
        batch: '2018年第二次巡检',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }, {
        batch: '2018年第二次巡检',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }, {
        batch: '2018年第二次巡检',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }, {
        batch: '2018年第二次巡检',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }],
      table_arr: [
        {
          prop: 'batch',
          label: '巡检批次',
          fixed: true,
          width: '42%'
        },
        {
          prop: 'startTime',
          label: '计划开始时间',
          fixed: true,
          width: '29%'
        },
        {
          prop: 'endTime',
          label: '计划结束时间',
          fixed: true,
          width: '29%'
        }
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>
