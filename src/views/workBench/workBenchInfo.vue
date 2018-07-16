<!--工作台-在保项目信息-->
<template>
  <div class="workBenchInfoView">
    <header-last :title="workBenchInfoTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="tableTh"><span>行业</span><span>客户数量</span><span>项目数量</span><span>合同规模</span></div>
    <div class="tableTd" v-for="items in workBenchInfoObj">
      <div class="tableTitle">业务方向：{{items.title}}</div>
      <ul class="ulTable">
        <li v-for="item in items.yunArr">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>
            <router-link :to="{name:'workBenchInfoDetail',query:{business:item.business,industry:item.industry}}" > 
              {{item.Pnum}}
            </router-link>
          </span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
      <ul class="ulTable">
        <li v-for="item in items.waiArr">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>{{item.Pnum}}</span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
      <ul class="ulTable">
        <li v-for="item in items.zhiArr">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>{{item.Pnum}}</span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
      <ul class="ulTable">
        <li v-for="item in items.SDCArr">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>{{item.Pnum}}</span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
      <ul class="ulTable">
        <li v-for="item in items.qiArr">
          <span>{{item.industry}}</span>
          <span>{{item.Cnum}}</span>
          <span>{{item.Pnum}}</span>
          <span>{{item.contract}}</span>
        </li>
      </ul>
      <ul class="ulTable">
        <li v-for="item in items.weiArr">
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
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'workBenchInfo',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchInfoTit: '在保项目信息',
      workBenchInfoObj: []
    }
  },
  created () {
    fetch.get('?action=GetProjectStat',{}).then(res => {
      // console.log(res)
      let infoJson = {}
      let yunArr = []
      let waiArr = []
      let zhiArr = []
      let SDCArr = []
      let qiArr = []
      let weiArr = []
      let workBenchInfoObj = []
      for (let i = 0; i < res.data.length; i++) {
        infoJson = {business:res.data[i].BUSINESS_TYPE,industry: res.data[i].INDUSTRY, Cnum: res.data[i].CUST_NUM, Pnum: res.data[i].PRO_NUM, contract: res.data[i].AMOUNT}
        if (res.data[i].BUSINESS_TYPE === '运维') {
          yunArr.push(infoJson)
          workBenchInfoObj[0] = {title: '运维', yunArr}
        }
        if (res.data[i].BUSINESS_TYPE === '外包') {
          waiArr.push(infoJson)
          workBenchInfoObj[1] = {title: '外包', waiArr}
        }
        if (res.data[i].BUSINESS_TYPE === '质测') {
          zhiArr.push(infoJson)
          workBenchInfoObj[2] = {title: '质测', zhiArr}
        }
        if (res.data[i].BUSINESS_TYPE === 'SDC') {
          SDCArr.push(infoJson)
          workBenchInfoObj[3] = {title: 'SDC', SDCArr}
        }
        if (res.data[i].BUSINESS_TYPE === '其他') {
          qiArr.push(infoJson)
          workBenchInfoObj[4] = {title: '其他', qiArr}
        }
        if (res.data[i].BUSINESS_TYPE === '未设置') {
          weiArr.push(infoJson)
          workBenchInfoObj[5] = {title: '未设置', weiArr}
        }
      }
      this.workBenchInfoObj = workBenchInfoObj
      //console.log(this.workBenchInfoObj)
    })
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
