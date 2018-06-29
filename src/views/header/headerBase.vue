<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="headerRight" @click.stop="popBg=!popBg">{{headerRight}}</div>
    </header>
    <template v-if="popBg">
      <div class="popBg">
        <search-view></search-view>
      </div>
    </template>
  </div>
</template>

<script>
import searchView from '@/components/searchView'
export default {
  name: 'headerBase',

  components: {
    searchView
  },

  data () {
    return {
      title: 'List',
      headerRight: '查询',
      popBg: false
    }
  },

  watch: {
  },

  created () {
  },

  methods: {
  }
}
</script>

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #e0002a; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #e0002a;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;}
  .popBg{background: rgba(0,0,0,0.5); position: fixed; top: 0.45rem; bottom: 0; z-index: 999; padding: 0 0.25rem;}
</style>
