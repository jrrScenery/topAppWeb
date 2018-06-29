<!--工作台-人员信息-->
<template>
  <div class="workBenchEventInfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">

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
  .workBenchEventInfoView{width: 100%;}
</style>
