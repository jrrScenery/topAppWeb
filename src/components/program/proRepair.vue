<!--相关报修-->
<template>
  <div class="proRepairView">
    <el-input
      placeholder="搜索编号、厂商、级别..."
      suffix-icon="el-icon-search"
      v-model="value">
    </el-input>
    <div class="proRepairCell" v-for="item in proRepairObj" :key="item.id">
      <p>编号：{{item.num}}</p>
      <ul>
        <li>{{item.time}}</li>
        <li><span>厂商：{{item.firm}}</span><span>级别：{{item.level}}</span></li>
        <li>时间描述：{{item.desc}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'proRepair',

  components: {

  },

  data () {
    return {
      value: '',
      proRepairObj: [
        {num: 'CS1708290002', time: '2016-12-08  12:40:11', firm: '富士通', level: 'M5000', desc: 'RHOU209902设备出现故障RHOU209902设备出现故障，持续报警…'},
        {num: 'CS1708290002', time: '2016-12-08  12:40:11', firm: '富士通', level: 'M5000', desc: 'RHOU209902设备出现故障，持续报警…'}
      ]
    }
  },

  methods: {

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
