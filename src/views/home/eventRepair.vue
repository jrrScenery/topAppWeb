<!--相关报修-->
<template>
  <div class="proRepairView">
    <el-input
      placeholder="搜索编号、厂商、级别..."
      suffix-icon="el-icon-search"
      v-model="value">
    </el-input>
    <div class="content" style="max-height: 3.1rem; overflow: scroll">
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
var caseId ,projectId;

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
      total: 0,
      busy: false,
      loadall: false
    }
  },
  created () {
    caseId = this.$route.query.caseId;
    projectId = this.$route.query.projectId;
  },
  methods: {
    checkDivScroolTop(){
      let scrollDiv = document.querySelector('.content');
      let _this = this
      scrollDiv.addEventListener('scroll', function() {
        _this.busy = true;
        setTimeout(() => {
          _this.getEventList(_this.page);
        }, 500);
      }, true);
    },
    getEventList (page) {
      if (!this.loadall) {
        var url = "?action=GetRelateCase&CASE_ID="+caseId;
        fetch.get(url,{}).then(res=>{
          this.total = res.data.length
          if(this.total==0){
            this.busy = false;
            return;          
          }
          if (page == 1) {
            for (let i = 0; i < 10; i++) {
              this.proRepairObj = this.proRepairObj.concat(res.data[i])
            }
            this.page++
            console.log(1);
          }
          if (page > 1 && this.proRepairObj.length < this.total) {
            this.proRepairObj = []
            for (let i = 0; i < 10 * page; i++) {
              this.proRepairObj = this.proRepairObj.concat(res.data[i])
            }
            this.busy = false
            this.page++
            console.log(2)
          }
        })
      }
    }
  },
  mounted () {
    this.getEventList(this.page)
    this.checkDivScroolTop()
  }
}
</script>

<style scoped>
  .proRepairView{padding: 0 0.15rem;}
  .proRepairView >>> .el-input{padding: 0.1rem 0; border-bottom: 0.01rem solid #e1e1e1}
  .proRepairView >>> .el-input__icon{width: 0.4rem;font-size: 0.2rem}
  .proRepairView >>> .el-input__inner{border-color: #e1e1e1; border-radius: 0.2rem; background: #f5f5f9}
  .proRepairCell{border-bottom: 0.01rem solid #e1e1e1; padding: 0.05rem 0; color: #666666;}
  .proRepairCell p{color: #333333}
  .proRepairCell ul li{width: 100%; height: 0.25rem; line-height: 0.25rem; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .proRepairCell ul li span{display: inline-block; width: 50%}
</style>
