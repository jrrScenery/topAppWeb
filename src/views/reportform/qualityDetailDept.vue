<!--质量-->
<template>
  <div class="qualityView">
    <header-last :title="echartsTit"></header-last>
    <div class="qualityTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <template v-for="item in qualityTableObj">
          <el-table-column
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
import fetch from '../../utils/ajax'
import headerLast from '../header/headerLast'

export default {
  name: 'quality',
  components: {
    headerLast
  },
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [
      ],
      batch:'',
      echartsTit: '部门指标排名',
      tableData: [
      ],
      qualityTableObj: [
        {prop: 'ZBX', label: '指标项', width: '30%'},
        {prop: 'FJMBZ', label: '分解目标值', width: '40%'},
        {prop: 'BMKHQZ', label: '岗位/部门考核权重', width: '30%'},
        {prop: 'KFX', label: '岗位/部门考核扣分项', width: '30%'},
        {prop: 'ZBDCQK', label: '指标达成情况', width: '30%'},
        {prop: 'ZBZHFZ', label: '指标转化分值', width: '30%'},
        {prop: 'KFX', label: '扣分项(个数)', width: '30%'}
      ],
    }
  },
  mounted () {
      console.log(this.$route.query.batchId);
      let params = {TARGET_ID:2,BATCH_ID:this.$route.query.batchId,DEPT_NAME:this.$route.query.dept}
      var url = "?action=GetQualityReleaseData";
      fetch.get(url,params).then(res=>{
        console.log(res.dataDetail);
        this.tableData=res.dataDetail;
      });
  },
  methods: {

  },
}
</script>

<style scoped>
  canvas{width: 100%!important;}
  .qualityView{padding: 0 0.25rem 0.15rem; color: #999999}
  .qualityView .qualityTop{display: flex; justify-content: space-between;}
  .qualityView span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
  .qualityEcharts{margin: 0.1rem 0;}
  .qualityEcharts .qualityTit{line-height: 0.3rem;}
  .qualityTable >>> th{color: #333333; padding: 0; height: 0.3rem; line-height: 0.3rem; background: #f7f7f7}
  .qualityTable >>> td{color: #666666; padding: 0; height: 0.3rem; line-height: 0.3rem;}
  .qualityTable >>> .cell{font-size: 0.13rem; text-align: center}
</style>
