<!--首页-事件详情-意见反馈-->
<template>
  <div class="eventFeedbackView">
    <header-last></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-form :model="formData" label-width="0.8rem" ref="formData">
        <el-form-item label="意见类型">
          <el-input v-model="formData.type" placeholder="请输入意见类型"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <div class="article">{{title}}</div>
        <el-form-item class="text">
          <el-input type="textarea" v-model="formData.article" placeholder="请输入意见内容"></el-input>
        </el-form-item>
        <el-form-item class="submitBtn">
          <el-button @click="submitForm('formData')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'eventFeedback',

  components: {
    headerLast
  },

  data () {
    return {
      title: '意见内容',
      formData: {
        name: '',
        phone: '',
        region: '',
        type: '',
        article: ''
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
  .content{margin-top: 0.05rem; background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
  .article{line-height: 0.3rem; background: #f5f5f9; color: #acacac; padding-left: 0.25rem;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
