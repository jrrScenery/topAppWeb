<!--巡检计划-->
<template>
  <div class="proPlanView">
    <div class="proPlanCell">
      <el-table
        :data="tableData"
        stripe
        max-height="200"
        v-loadmore="loadMore"
        style="width: 100%">
        <template v-for="item in table_arr">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
            <template><loadingtmp :busy="busy" :loadall="loadall"></loadingtmp></template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'

export default {
  name: 'proPlan',

  components: {
    loadingtmp
  },

  data () {
    return {
      tableData: [],
      table_arr: [
        {
          prop: 'inspectBatch',
          label: '巡检批次',
          fixed: true,
          width: '40%'
        },
        {
          prop: 'planStartDate',
          label: '计划开始时间',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'planEndDate',
          label: '计划结束时间',
          fixed: true,
          width: '30%'
        }
      ],

      page: 1,
      pageSize: 5,
      total: 0,
      busy: false,
      loadall: false
    }
  },
  created () {
    this.getEventList(this.page)
  },
  methods: {
    loadMore () {
      this.busy = true;
      this.loadall = false;
      setTimeout(() => {
        this.getEventList(this.page);
      }, 500);
    },
    getEventList (page) {
      if (!this.loadall) {
        fetch.get("?action=GetProjectInspectionPlan&PROJECT_ID="+this.$route.query.projectId,{}).then(res=>{
          console.log(res.data)
          this.total = res.data.length
          if (page == 1) {
            for (let i = 0; i < 10; i++) {
              this.tableData = this.tableData.concat(res.data[i])
            }
            this.page++
            console.log(1)
          }
          if (page > 1 && this.tableData.length < this.total) {
            this.tableData = []
            for (let i = 0; i < 10 * page; i++) {
              this.tableData = this.tableData.concat(res.data[i])
            }
            this.busy = false
            this.loadall = false
            this.page++
            console.log(2)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem; padding: 0 0.05rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>
