<template>
  <div class="proHealthView">
    <div class="proHealthCell" v-for="item in proHealthArr">
      <div class="proHealthTit">{{item.title}}</div>
      <div class="content">
        <ul class="tableTh">
          <li><span>检查项</span><span>数量</span><span>评分</span></li>
        </ul>
        <ul class="tableTd">
          <li v-for="info in item.Arr"><span>{{info.check}}</span><span>{{info.num}}</span><span>{{info.score}}</span></li>
        </ul>
        <div v-if="item.title == '执行情况'" v-for="i in item.OArr">
          <ul class="tableTh"><li>{{i.title}}</li></ul>
          <ul class="tableTd">
            <li v-for="info in i.item"><span>{{info.check}}</span><span>{{info.num}}</span><span>{{info.score}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'proHealth',

  components: {

  },

  data () {
    return {
      proHealthArr: [
        {
          title: '执行情况',
          Arr: [{
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '项目服务团队人员稳定',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }],
          OArr: [
            {
              title: 'case SLA达成率（累计）',
              item: [
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                }
              ]
            },
            {
              title: '超长期case数',
              item: [
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                }
              ]
            },
            {
              title: '一次实施不成功率',
              item: [
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                }
              ]
            },
            {
              title: '备件到场不可用率',
              item: [
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                }
              ]
            },
            {
              title: '巡检执行情况',
              item: [
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                },
                {
                  check: '故障Case总数',
                  num: '0',
                  score: '0'
                }
              ]
            },
          ]
        },
        {
          title: '评价满意度',
          Arr: [{
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '项目服务团队人员稳定',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }]
        },
        {
          title: '潜在风险',
          Arr: [{
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '项目服务团队人员稳定',
            score: '0'
          }, {
            check: '故障Case总数',
            num: '0',
            score: '0'
          }]
        }
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .proHealthCell{}
  .proHealthCell .proHealthTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #e0002a;}
  .proHealthCell .proHealthTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #e0002a;}
  .proHealthCell .proHealthTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
  .tableTh li{display: flex; line-height: 0.25rem; font-size: 0.14rem; padding: 0 0.2rem; color: #000000;}
  .tableTh span{width: 15%; text-align: center;}
  .tableTh span:nth-child(1){width: 52%}
  .tableTh span:nth-child(2){width: 33%}
  .tableTd li{display: flex; line-height: 0.25rem; padding: 0 0.2rem; color: #666666;}
  .tableTd span{width: 15%; text-align: center;}
  .tableTd span:nth-child(1){width: 52%; text-align: left;}
  .tableTd span:nth-child(2){width: 33%;}
  .tableTd li:nth-child(2n+1){background: #fafafa}
</style>
