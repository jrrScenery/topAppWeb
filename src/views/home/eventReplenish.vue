<!--首页-事件详情-补充说明-->
<template>
  <div class="eventReplenishView">
    <header-last :title="eventReplenishTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <ul>
        <li v-for="item in eventReplenishData" :key="item.id"><span>{{item.type}}</span>{{item.desc}}</li>
      </ul>
      <el-form ref="form" :model="form">
        <el-form-item class="text">
          <el-input type="textarea" v-model="form.desc" placeholder="补充说明"></el-input>
        </el-form-item>
        <div class="takePhoto"><img src="../../assets/images/takephoto.png" alt=""></div>
        <el-form-item class="submitBtn">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-upload
      list-type="picture-card"
      :action="upaction"
      :http-request="upload"
      :before-upload="beforeAvatarUpload">
      <i class="el-icon-plus"></i>
    </el-upload>

  </div>
</template>

<script>

import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'

var caseId ;

export default {
  name: 'eventReplenish',

  components: {
    headerLast
  },

  data () {
    return {
      eventReplenishTit: '补充说明',
      eventReplenishData: [
        {type: '项目编号：', desc: '51478'},
        {type: '项目名称：', desc: 'TOP系统测试项目-华东'},
        {type: '事件编号：', desc: '107961'}
      ],
      form: {
        desc: ''
      },
      caseid: this.$route.query.caseId,
      //upaction: 'http://139.129.207.35:8084/api/upload'
      upaction: 'http://localhost:8081/api/upload?EMPID=' + sessionStorage.getItem("empId")
    }
  },

  methods: {
    onSubmit () {
      //alert('submit!');
      var vm = this;
      this.$axios.get(global_.proxyServer+"?action=GetComplaintsList&EMPID="+global_.empId+"&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.opinionTab[0].data = res.data.data;
      });


      fetch.get("?action=UpdateProcessInfo&CASE_ID="+this.caseid+"&REMARK="+this.form.desc,"").then(res=>{
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true
          });
          var nowcaseid = vm.caseid;
          setTimeout(function(){vm.$router.push({ name: 'eventShow',query:{caseId:nowcaseid}})},1000);
        }
        else{
          this.$message({
            message:res.MESSAGE,
            type: 'error',
            center: true
          });
        }
      }).catch(function(res){
        this.$message({
          message:res.MESSAGE,
          type: 'error',
          center: true
        });
      }) ;
    }
  },
  created:function(){
    this.$axios.get(global_.proxyServer+"?action=GetCaseInfo&CASE_ID="+this.caseid,{}).then(res=>{
      var baseInfo = res.data.data;
      this.eventReplenishData[0].desc = baseInfo.PROJECT_NO ;
      this.eventReplenishData[1].desc = baseInfo.PROJECT_NAME ;
      this.eventReplenishData[2].desc = baseInfo.CASE_NO ;
    });
  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #fafafa; position: relative;}
  .content ul{padding: 0.1rem 0.25rem; color: #333333;}
  .content li{line-height: 0.17rem;}
  .text{margin: 0!important;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1.8rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
  .takePhoto{position: absolute; bottom: 0rem; left: 0.15rem; width: 0.5rem; height: 0.5rem;}
  .takePhoto img{width: 0.3rem; height: 0.3rem; margin: 0.1rem 0 0 0.1rem;}
</style>

