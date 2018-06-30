<!--工作台-人员信息-->
<template>
  <div class="workBenchPeopleInfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="city"
          label="城市"
          width="24%">
        </el-table-column>
        <el-table-column label="人员数量">
          <el-table-column
            prop="move"
            label="机动人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="stationed"
            label="驻场人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="person"
            label="个人合作"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="company"
            label="公司合作"
            width="19%">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchPeopleInfo',

  components: {
    headerBase
  },

  data () {
    return {
      tableData: [{
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }, {
        city: '北京',
        move: '625',
        stationed: '315',
        person: '421',
        company: '271'
      }],
      workBenchPeopleInfo: [
        {}
      ]
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .workBenchPeopleInfoView{width: 100%;}
  .content{margin-top: 0.05rem; color: #666666;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
</style>
