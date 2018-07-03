<!--一级头部-->
<template>
  <header v-if="!(title =='我的')" class="headerHomeView">
    <div class="headerLeft">
      <img src="../../assets/images/header_sao.png" alt="">
      <p>{{headerLeft}}</p>
    </div>
    <h2>{{title}}</h2>
    <div class="headerRight">
      <img src="../../assets/images/header_info.png" alt="">
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerHome',

  data () {
    return {
      headerLeft: '扫码',
      title: 'list'
    }
  },

  watch: {
    '$route': 'routerChange'
  },

  created () {
    this.routerChange(this.$route)
  },

  methods: {
    routerChange (e) {
      switch (e.name) {
        case 'home':
          this.title = '首页'
          break
        case 'approve':
          this.title = '待审批'
          break
        case 'workBench':
          this.title = '工作台'
          break
        case 'form':
          this.title = '报表'
          break
        case 'mine':
          this.title = '我的'
          break
      }
    }
  }
}
</script>

<style scoped>
  .headerHomeView{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem;}
  .headerLeft img,.headerRight img{width: 0.22rem; height: 0.22rem;}
  .headerLeft p{font-size: 0.12rem; line-height: 1; margin-top: 0.03rem}
</style>
