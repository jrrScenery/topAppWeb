<!--报表-->
<template>
  <div class="reportFormView">
    <el-tabs v-model="activeName">
      <el-tab-pane label="业务" name="first"><business></business></el-tab-pane>
      <el-tab-pane label="质量" name="second"><quality></quality></el-tab-pane>
      <el-tab-pane label="效能" name="third"><effect></effect></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import business from '../../components/form/business'
import quality from '../../components/form/quality'
import effect from '../../components/form/effect'

export default {
  name: 'reportForm',

  components: {
    business,
    quality,
    effect
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
  .reportFormView{margin-top: 0.05rem; width: 100%; background: #ffffff;}
  .reportFormView >>> .el-tabs__nav{width: 100%}
  .reportFormView >>> .el-tabs__item{width: 33%; text-align: center; font-size: 0.14rem; color: #999999;}
  .reportFormView >>> .el-tabs__item.is-active{color: #2698d6;}
  .reportFormView >>> .el-tabs__item:hover{color: #2698d6;}
  .reportFormView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .reportFormView >>> .el-tabs__header{margin: 0 0.25rem}
</style>
