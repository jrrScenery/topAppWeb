<!--健康度-->
<template>
  <div class="proHealthView">
    <div class="proHealthCell">
      <div class="proHealthTit">执行概况</div>
      <div class="content">
        <ul class="tableTh">
          <li style="background: #fafafa!important;">
            <span>检查项</span>
            <span>数量</span>
            <span>评分</span></li>
        </ul>
      </div>
      <div class="content" v-for="item in dataArray">
        <ul v-if="item.IF_PARENT == 1" class="tableTh"><li>{{item.GROUP_NAME}}</li></ul>
        <ul v-if="item.IF_PARENT != 1" class="tableTd">
          <li>
            <span>{{item.ITEM_NAME}}</span>
            <span>{{item.ITEM_RESULT}}</span>
            <span>{{item.ITEM_SCORE}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
export default {
  name: 'proHealth',

  components: {

  },

  data () {
    return {
      dataArray: [],
      situationArr: [],
      evaluateArr: [],
      riskArr: [],
    }
  },
  created () {
    this.$axios.get(global_.proxyServer + '?action=GetProjectHealthList&EMPID=' + global_.empId + '&PROJECT_ID=' + this.$route.query.projectId, {}).then(res => {
      this.dataArray = res.data.data;
      // console.log(this.dataArray);
      // let j = 0
      // let k = 0
      // let z = 0
      // let oneArr = {}
      // let twoArr = {}
      // let threeArr = {}
      // for (let i = 0; i < this.dataArray.length; i++) {
      //   if (this.dataArray[i].GROUP_NAME == '执行情况') {
      //     oneArr = {check: this.dataArray[i].ITEM_NAME, num: this.dataArray[i].ITEM_RESULT, score: this.dataArray[i].ITEM_SCORE}
      //     this.situationArr[j] = oneArr
      //     j++
      //   }
      //   if (this.dataArray[i].GROUP_NAME == '评价/满意度') {
      //     twoArr = {check: this.dataArray[i].ITEM_NAME, num: this.dataArray[i].ITEM_RESULT, score: this.dataArray[i].ITEM_SCORE}
      //     this.evaluateArr[j] = twoArr
      //     k++
      //   }
      //   if (this.dataArray[i].GROUP_NAME == '潜在风险') {
      //     threeArr = {check: this.dataArray[i].ITEM_NAME, num: this.dataArray[i].ITEM_RESULT, score: this.dataArray[i].ITEM_SCORE}
      //     this.riskArr[j] = threeArr
      //     z++
      //   }
      // }
    })
  },

  methods: {

  }

}
</script>

<style scoped>
  .proHealthCell{}
  .proHealthCell .proHealthTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
  .proHealthCell .proHealthTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
  .proHealthCell .proHealthTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
  .tableTh li{display: flex; line-height: 0.3rem; font-size: 0.14rem; padding: 0 0.2rem; color: #000000; background: #ffffff!important;}
  .tableTh span{width: 15%; text-align: center;}
  .tableTh span:nth-child(1){width: 52%}
  .tableTh span:nth-child(2){width: 33%}
  .tableTd li{display: flex; line-height: 0.3rem; padding: 0 0.2rem; color: #666666;}
  .tableTd span{width: 15%; text-align: center;}
  .tableTd span:nth-child(1){width: 52%; text-align: left;}
  .tableTd span:nth-child(2){width: 33%;}
  /*.tableTd li:nth-child(2n+1){background: #fafafa}*/
  .content:nth-child(2n+1){background: #fafafa}
</style>
