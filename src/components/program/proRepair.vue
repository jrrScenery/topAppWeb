<!--相关报修-->
<template>
  <div class="proRepairView">
    <el-input
      placeholder="搜索编号、厂商、级别..."
      suffix-icon="el-icon-search"
      v-model="value">
    </el-input>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="proRepairCell" v-for="item in proRepairObj" >
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

export default {
  name: 'proRepair',

  components: {
    loadingtmp
  },

  data () {
    return {
      value: '',
      proRepairObj: [],
      page: 1,
      pageSize: 5,
      busy:false,
      loadall: false
    }
  },
  created () {
  },
  methods: {

    getEventList(flag){

      let url = "?action=GetRelateCaseOfProject&PROJECT_ID="+this.$route.query.projectId;
     //url += "&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      let param = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};

      fetch.get(url,param).then(res=>{
        console.log(res.data);
        if(flag){
            this.proRepairObj = this.proRepairObj.concat(res.data);
        }else{
            this.proRepairObj = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++;
        }
      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.getEventList(this.page>1);
      }, 5000);
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .content{ width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll;}
  .proRepairView{padding: 0 0.15rem;}
  .proRepairView >>> .el-input{padding: 0.1rem 0; border-bottom: 0.01rem solid #e1e1e1}
  .proRepairView >>> .el-input__icon{width: 0.4rem;font-size: 0.2rem}
  .proRepairView >>> .el-input__inner{border-color: #e1e1e1; border-radius: 0.2rem; background: #f5f5f9}
  .proRepairCell{border-bottom: 0.01rem solid #e1e1e1; padding: 0.05rem 0; color: #666666;}
  .proRepairCell p{color: #333333}
  .proRepairCell ul li{width: 100%; height: 0.25rem; line-height: 0.25rem; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .proRepairCell ul li span{display: inline-block; width: 50%}
</style>
