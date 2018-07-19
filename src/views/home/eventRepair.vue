<!--相关报修-->
<template>
  <div class="proRepairView">
    <header-last :title="eventRepairTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <el-input
      placeholder="搜索编号、厂商、级别..."
      suffix-icon="el-icon-search"
      v-model="value">
    </el-input>
    <div class="content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
      <div class="proRepairCell" v-for="item in proRepairObj" :key="item.CASE_ID" >
        <p>编号：{{item.CASE_CD}}</p>
        <ul>
          <li>{{item.CREATED_ON}}</li>
          <li><span>厂商：{{item.FACTORY_NM}}</span><span>级别：{{item.CASE_LEVEL}}</span></li>
          <li>时间描述：{{item.CUSTOMER_NAME}}</li>
        </ul>
      </div>
      <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
import HeaderLast from '../header/headerLast'
let caseId ,projectId;

export default {
  name: 'proRepair',

  components: {
    loadingtmp,
    HeaderLast
  },

  data () {
    return {
      eventRepairTit: '相关报修',
      value: '',
      proRepairObj: [],

      page: 1,
      pageSize: 10,
      total: 0,
      busy: false,
      loadall: false,
      caseId : this.$route.query.caseId,
      projectId : this.$route.query.projectId
    }
  },
  created () {

  },
  methods: {

    getEventList(flag){
      this.$axios.get(global_.proxyServer+"?action=GetRelateCase",{params:{CASE_ID:this.caseId,PROJECT_ID:this.projectId,PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize}}).then(res=>{
        if(flag){
            this.proRepairObj = this.proRepairObj.concat(res.data.data);
        }else{
            this.proRepairObj = res.data.data;
        }
        if(0 == res.data.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }

      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.getEventList(this.page>1);
      }, 500);
    }
  },
  mounted () {

    this.checkDivScroolTop()
  }
}
</script>

<style scoped>
  .content{position: absolute; left: 0.15rem; right: 0.15rem; top: 1.07rem; bottom: 0; overflow: scroll;}
  .proRepairView{padding: 0 0.15rem;}
  .proRepairView >>> .el-input{padding: 0.1rem 0; border-bottom: 0.01rem solid #e1e1e1}
  .proRepairView >>> .el-input__icon{width: 0.4rem;font-size: 0.2rem}
  .proRepairView >>> .el-input__inner{border-color: #e1e1e1; border-radius: 0.2rem; background: #f5f5f9}
  .proRepairCell{border-bottom: 0.01rem solid #e1e1e1; padding: 0.05rem 0; color: #666666;}
  .proRepairCell p{color: #333333}
  .proRepairCell ul li{width: 100%; height: 0.25rem; line-height: 0.25rem; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .proRepairCell ul li span{display: inline-block; width: 50%}
</style>
<style>
  .proRepairView  .el-input__inner{height: 0.4rem; line-height:0.4rem;}
</style>

