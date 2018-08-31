<!--终极头部-->
<template>
  <div class="headerView">
      <header>
        <div class="headerLeft " v-on:click="back"><i class="el-icon-arrow-left"></i></div>
        <h2>{{title}}</h2>
        <el-dropdown trigger="click">
            <div class="el-icon-plus"></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native='newService(2)'>创建现场服务单</el-dropdown-item>
                <el-dropdown-item @click.native='newService(1)'>创建case故障处理服务单</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </header>
  </div>
</template>

<script>
export default {
  name: 'headerLast',

  data () {
    return {
      caseId:this.$route.query.caseId,
      workId:this.$route.query.workId,
      serviceId:this.$route.query.serviceId,
      taskId:this.$route.query.taskId
    }
  },
  props: ['title','backUrl','date1','date2'],

  watch: {
  },

  created () {
  },

  methods: {
      newService(serviceType){
        console.log(serviceType);
        console.log(this.caseId);
        console.log(this.workId);
        // this.$router.push({name: 'onsiteServiceInfo', query: {serviceId:null,caseId:this.caseId,workId:this.workId,taskId:this.taskId}})
      },

    back: function (event) {
      console.log("in back");
      if(this.backUrl&&this.backUrl.length>0){
        console.log("route backurl");
        this.$router.push({name:this.backUrl,query:{date1:this.date1,date2:this.date2}});       
      }else{
        this.$router.back(-1);
      }
    }
  }
}
</script>

<style scoped>
 header{position:fixed; top: 0; left: 0; right: 0; z-index: 9999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.2rem;}
  .headerLeft i{font-size: 0.2rem;}
  .el-icon-plus{font-weight: 900; line-height: 0.48rem;color: #ffffff}
  
</style>
