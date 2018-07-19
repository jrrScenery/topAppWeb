<!--文档下载-->
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
              <template slot-scope="scope">
                  <template v-if="item.prop == 'DOC_NAME'">
                    <a :href="scope.row['href']" :download="scope.row['DOC_NAME']"> {{scope.row['DOC_NAME']}}</a>
                  </template>
                  <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'proPlan',

  components: {

  },

  data () {
    return {
      tableData: [],
      table_arr: [
        {
          prop: 'DOC_NAME',
          label: '文档名称',
          fixed: true,
          width: '42%'
        },
        {
          prop: 'UPLOADER',
          label: '上传人',
          fixed: true,
          width: '20%'
        },
        {
          prop: 'CREATE_ON',
          label: '上传时间',
          fixed: true,
          width: '40%'
        }
      ]
    }
  },
  created () {
    var url = "?action=GetProjectDoc&PROJECT_ID="+this.$route.query.projectId;
    fetch.get(url,{}).then(res=>{
      this.tableData = res.data;
      for(var i=0;i<this.tableData.length;i++){
        this.tableData[i].href = global_.Server +"/api/download?fileId="+this.tableData[i].DOC_ID + "&fileName=" + this.tableData[i].DOC_NAME;
      }
      console.log(this.tableData);
    });
  },
  methods: {

  }
}
</script>

<style scoped>
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem; padding: 0 0.05rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td:first-child{text-align: left}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>
