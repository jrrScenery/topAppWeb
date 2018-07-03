<!--工作台-在保项目信息-->
<template>
  <div class="workBenchInfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="tableTh"><span>行业</span><span>客户数量</span><span>项目数量</span><span>合同规模</span></div>
    <div class="tableTd" v-for="items in workBenchInfoObj" :key="items.id">
      <div class="tableTitle">{{items.title}}</div>
      <ul class="ulTable">
        <li v-for="item in items.infoArr" :key="item.id">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>{{item.Pnum}}</span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'workBenchInfo',

  components: {
    headerBase
  },

  data () {
    return {
      workBenchInfoObj: [
        {
          title: '业务方向：运维',
          infoArr: [
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '2', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'}
          ]
        },
        {
          title: '业务方向：外包',
          infoArr: [
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'}
          ]
        },
        {
          title: '业务方向：质测',
          infoArr: [
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '移动', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '联通', Cnum: '108', Pnum: '3', contract: '111111111111'},
            {industry: '电信', Cnum: '108', Pnum: '3', contract: '111111111111'}
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
  .workBenchInfoView{width: 100%; color: #999999; line-height: 0.3rem}
  .tableTh span{display: inline-block; width: 25%; text-align: center; color: #666666; line-height: 0.4rem;}
  .tableTd .tableTitle{color: #2698d6; padding-left: 0.25rem; position: relative; background: #ffffff;}
  .tableTd .tableTitle:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.09rem; background: #2698d6;}
  .tableTd .ulTable{text-align: center; display: flex; flex-wrap: wrap;}
  .tableTd .ulTable li{width: 100%; display: flex}
  .tableTd .ulTable li:nth-child(2n+1){background: #f7f7f7;}
  .tableTd .ulTable li:nth-child(2n){text-align: center; background: #ffffff;}
  .tableTd .ulTable li span{display: inline-block; width: 25%; overflow: hidden}
</style>
