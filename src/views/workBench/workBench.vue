<template>
  <div class="workBenchView">
    <ul class="ul_workBench" v-for="items in workBenchObj">
      <li class="li_workBench" v-for="item in items.arr">
        <img :src="item.imgSrc" alt="">
        <span>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'workBench',

  components: {
  },

  data () {
    return {
      workBenchObj: [
        {arr: [
          {imgSrc: require('@/assets/images/workBench_1.png'), text: '项目信息'},
          {imgSrc: require('@/assets/images/workBench_2.png'), text: '事件信息'},
          {imgSrc: require('@/assets/images/workBench_3.png'), text: '人员信息'},
          {imgSrc: require('@/assets/images/workBench_4.png'), text: '备件库存'},
          {imgSrc: require('@/assets/images/workBench_5.png'), text: '供应商信息'},
          {imgSrc: require('@/assets/images/workBench_6.png'), text: 'PO信息'}
        ]},
        {arr: [
          {imgSrc: require('@/assets/images/workBench_7.png'), text: '我的事件'},
          {imgSrc: require('@/assets/images/workBench_8.png'), text: '所有事件'},
          {imgSrc: require('@/assets/images/workBench_9.png'), text: '我的项目'},
          {imgSrc: require('@/assets/images/workBench_10.png') ,text: '所有项目'}
        ]},
        {arr: [
          {imgSrc: require('@/assets/images/workBench_11.png'), text: '我的任务'},
          {imgSrc: require('@/assets/images/workBench_12.png'), text: '事件申报'},
          {imgSrc: require('@/assets/images/workBench_13.png'), text: '单次支持'}
        ]}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .workBenchView{ width: 100%;}
  .workBenchView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;}
  .workBenchView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 25%; height: 0.55rem; text-align: center;}
  .workBenchView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
  .workBenchView img{ width: 0.3rem; height: 0.3rem; margin: auto;}
</style>
