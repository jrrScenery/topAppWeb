<!--基础信息-->
<template>
  <div class="eventBaseInfoView">
    <div class="eventBaseInfoTit">{{title}}</div>
    <ul class="eventBaseInfoCell">
      <li v-for="item in eventBaseInfoArr"><span>{{item.tit}}</span>{{item.desc}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'eventBaseInfo',

  components: {

  },

  data () {
    return {
      title: '事件基本信息',
      eventBaseInfoArr: [
        {tit: '项目名称', desc: '维保项目toptext07'},
        {tit: '项目编号', desc: 'toptext07'},
        {tit: '事件编号', desc: 'CS1611290103'},
        {tit: '事件类型', desc: '故障'},
        {tit: '事件级别', desc: '四级'},
        {tit: '厂商', desc: 'IMB'},
        {tit: '设备型号', desc: '9117-570(P5 570)'},
        {tit: '设备SN', desc: 'toptext071156'},
        {tit: '工单编号', desc: '2016113000305W101'},
        {tit: '标准任务项', desc: '常规AIS'},
        {tit: '概要说明', desc: '测试技术咨询201608011042'}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .eventBaseInfoTit{position: relative; line-height: 0.35rem; margin-left: 0.2rem; font-size: 0.14rem; color: #000000;}
  .eventBaseInfoTit::before{position: absolute; top: 0.1rem; left: -0.12rem; width: 0.05rem; height: 0.15rem; content: ''; background: #e0002a;}
  .eventBaseInfoCell{padding: 0 0.2rem 0.1rem; line-height: 0.28rem; color: #262626;}
  .eventBaseInfoCell span{width: 0.9rem; color: #999999; display: inline-block;}
</style>
