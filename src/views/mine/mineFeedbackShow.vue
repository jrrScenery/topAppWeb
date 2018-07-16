<!--我的-意见反馈详情-->
<template>
  <div class="mineFeedbackShowView">
    <header-last :title="mineFeedbackShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="cell" v-for="item in mineFeedbackShowObj" :key="item.id">
        <div class="title">{{item.title}}</div>
        <ul><li v-for="info in item.cellObj" :key="info.id"><p>{{info.leftTit}}</p><p>{{info.rightCon}}</p></li></ul>
      </div>
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
      mineFeedbackShowTit: '意见反馈详情',
      mineFeedbackShowObj: [
        {
          title: '基本信息',
          cellObj: [
            {leftTit: '任务编号：', rightCon: 'QM021703230002'},
            {leftTit: '意见来源：', rightCon: 'QM021703230002'},
            {leftTit: '意见类型：', rightCon: 'QM021703230002'},
            {leftTit: '提交人：', rightCon: 'QM021703230002'},
            {leftTit: '联系电话：', rightCon: 'QM021703230002'},
            {leftTit: '提交时间：', rightCon: 'QM021703230002'},
            {leftTit: '项目编号：', rightCon: 'QM021703230002'},
            {leftTit: '项目名称：', rightCon: 'QM021703230002'},
            {leftTit: '事件编号：', rightCon: 'QM021703230002'},
            {leftTit: '意见内容：', rightCon: '今天上午报修，客户要求今天人员现场，目前安排的是明天现场，客户不同意'}
          ]
        },
        {
          title: '跟踪处理情况',
          cellObj: [
            {leftTit: '回访意见：', rightCon: 'QM021703230002QM021703230002QM021703230002QM021703230002QM021703230002QM021703230002'},
            {leftTit: '受理人意见：', rightCon: 'QM021703230002'},
            {leftTit: '评估人：', rightCon: 'QM021703230002'},
            {leftTit: '任务关闭时间：', rightCon: 'QM021703230002'}
          ]
        },
        {
          title: '评估定性',
          cellObj: [
            {leftTit: '问题定性分类：', rightCon: 'QM021703230002'},
            {leftTit: '问题根源分类：', rightCon: 'QM021703230002'},
            {leftTit: '责任人：', rightCon: 'QM021703230002'},
            {leftTit: '问题定性描述：', rightCon: 'QM021703230002'}
          ]
        }
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .mineFeedbackShowView{ width: 100%;}
  .content{width: 100%; margin-top: 0.05rem; color: #999999; background: #ffffff;}
  .content .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .content .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .content ul li{padding: 0 0.25rem;}
  .content ul li{display: flex; line-height: 0.25rem;}
  .content ul li p:nth-child(1){width: 0.91rem;}
  .content ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>
