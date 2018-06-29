<template>
  <div class="qualityView">
    <span>筛选条件</span>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-select v-model="form.time" placeholder="时间段">
          <el-option
            v-for="item in optionTime"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.type" placeholder="指标分类">
          <el-option
            v-for="item in optionType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'quality',
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [{
        value: '选项1',
        label: '全年'
      }, {
        value: '选项2',
        label: '2017'
      }, {
        value: '选项3',
        label: '2018'
      }],
      optionType: [{
        value: '选项1',
        label: '部门指标排名'
      }, {
        value: '选项2',
        label: '部门指标明细'
      }, {
        value: '选项3',
        label: '岗位角色指标排名'
      }]
    }
  }
}
</script>

<style scoped>
  .qualityView{padding: 0 0.25rem; display: flex; justify-content: space-between}
  .qualityView span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
</style>
