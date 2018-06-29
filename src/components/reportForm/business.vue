<!--业务-->
<template>
  <div class="businessView">
    <el-form ref="form" :model="form" label-width="0.6rem">
      <el-form-item label="客户">
        <el-input v-model="form.custom"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-input v-model="form.program"></el-input>
      </el-form-item>
      <el-form-item label="时间段">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">~</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业">
          <el-option label="IT" value=""></el-option>
          <el-option label="企事业" value=""></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'business',
  data () {
    return {
      form: {
        custom: '',
        program: '',
        startTime: '',
        endTime: '',
        industry: ''
      }
    }
  }
}
</script>

<style scoped>
  .businessView{padding: 0 0.25rem;}
  .businessView >>> .el-form-item__label{text-align: left}
  .businessView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .businessView >>> .line{text-align: center}
  .businessView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .businessView >>> .el-input__inner:focus{border-color: #dcdfe6;}
  .businessView >>> .el-input__prefix{display: none;}
  .businessView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
</style>
