<!--工作台-事件申报-->
<template>
  <div class="workBenchDeclareView">
    <header-base-four :title="workBenchDeclareTit"></header-base-four>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-form :model="formData" label-width="0.9rem" ref="formData">
        <el-form-item label="序列号：">
          <el-input v-model="formData.num" placeholder="请输入序列号"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model="formData.type" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item label="厂商：">
          <el-input v-model="formData.firm" placeholder="请输入厂商"></el-input>
        </el-form-item>
        <el-form-item label="所在城市：">
          <el-input v-model="formData.city" :disabled="true" placeholder="所在城市"></el-input>
        </el-form-item>
        <el-form-item label="影响程度：">
          <el-select v-model="formData.degree" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="影响范围：">
          <el-select v-model="formData.range" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text">
          <el-input type="textarea" v-model="formData.desc" placeholder="请输入现场描述"></el-input>
        </el-form-item>
        <div class="takePhoto"><span>上传照片（可选）</span><img src="../../assets/images/takephoto.png" alt=""></div>
        <el-form-item class="submitBtn">
          <el-button @click="submitForm('formData')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headerBaseFour from '../header/headerBaseFour'
export default {
  name: 'workBenchDeclare',

  components: {
    headerBaseFour
  },

  data () {
    return {
      workBenchDeclareTit: '事件申报',
      formData: {
        num: '',
        type: '',
        firm: '',
        city: '',
        degree: '',
        range: '',
        desc: ''
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          alert('err')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .workBenchDeclareView{width: 100%;}
  .content{margin-top: 0.05rem; background: #ffffff; position: relative; padding-bottom: 0.5rem; margin-bottom: 0.5rem}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
  .text{margin: 0!important;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1.8rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .takePhoto{position: absolute; bottom: 0; left: 0.15rem; right: 0.15rem; line-height: 0.5rem; display: flex; justify-content: space-between; color: #999999}
  .takePhoto img{width: 0.3rem; height: 0.3rem; margin: 0.1rem 0 0 0.1rem;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
