<template>
  <div class="reportFormView">
    <el-tabs v-model="activeName">
      <el-tab-pane label="业务" name="first"><business></business></el-tab-pane>
      <el-tab-pane label="质量" name="second"><quality></quality></el-tab-pane>
      <el-tab-pane label="效能" name="third">效能</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import business from '../../components/reportForm/business'
import quality from '../../components/reportForm/quality'

export default {
  name: 'reportForm',

  components: {
    business,
    quality
  },

  data () {
    return {
      activeName: 'first'
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .reportFormView{margin-top: 0.1rem; width: 100%; background: #ffffff;}
  .reportFormView >>> .el-tabs__nav{width: 100%}
  .reportFormView >>> .el-tabs__item{width: 33%; text-align: center; font-size: 0.14rem;}
  .reportFormView >>> .el-tabs__item.is-active{color: #e0002a;}
  .reportFormView >>> .el-tabs__item:hover{color: #e0002a;}
  .reportFormView >>> .el-tabs__active-bar{ background-color: #e0002a}
  .reportFormView >>> .el-tabs__header{margin: 0 0.25rem}
</style>
