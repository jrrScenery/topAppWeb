<!--我的-意见反馈-->
<template>
  <div class="mineFeedbackShowView">
    <header-last></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'mineFeedbackShow',
  components: {
    headerLast
  },

  data () {
    return {
      mineFeedbackShowObj: [
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .mineFeedbackShowView{ width: 100%;}
  .content{width: 100%; margin-top: 0.05rem; color: #999999}
</style>
