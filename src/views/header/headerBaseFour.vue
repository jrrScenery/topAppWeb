<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="headerRight"   @click="onSao">
        <img src="../../assets/images/header_sao.png" v-if="false" alt="">
        <p v-if="false">{{headerRight}}</p>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'headerBaseFour',

  components: {
  },

  data () {
    return {
      headerRight: '扫码'
    }
  },

  props: ['title'],

  watch: {
  },

  created () {
  },

  methods: {

    back: function (event) {
      this.$router.back(-1)
    },
    onSao(){
      let ua = navigator.userAgent.toLowerCase();
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        var info={action:"scan",scantype:'declare',empId:localStorage.getItem('empId')}
        window.webkit.messageHandlers.ioshandle.postMessage({body: info});
      }else if(/(Android)/i.test(ua)){
        var value = "{action:scan,scantype:declare,empId:"+localStorage.getItem('empId')+"}";
        android.getClient(value);
      }
    }

  }
}
</script>

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;}
  .headerRight img{width: 0.22rem; height: 0.22rem;}
  .headerRight p{font-size: 0.1rem; line-height: 1; margin-top: 0.03rem}
</style>
