<template>
  <div class="loginView">
    <div class="loginBox">
      <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
          <img src="../../assets/images/login_1.png" alt="">
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          <img src="../../assets/images/login_2.png" alt="">
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        pass: 'smits123',
        userName: 'duxinc'
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(global_.proxyServer+"?action=userLogin","ACCOUNT="+this.ruleForm.userName+"&PASSWORD="+this.ruleForm.pass).then(res=>{

            if(res.data.STATUSCODE=="0"){
              global_.userInfo = res.data.userInfo;
              global_.userPermission = res.data.userPermission;
              global_.userRole = res.data.userRole;
              global_.empId = res.data.userInfo[0].EMPID;
              console.log(typeof(android));
              if(typeof(android)!="undefined"){
                android.getClient("invoke form html");              
              }
              //console.log(res.data.userInfo[0]);
              this.$router.push({name: 'home'});

            }else{
              alert(res.data.MESSAGE);
            }
          });
          //alert('submit!');
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
  .loginView{background: url("../../assets/images/login.jpg") 0 0 no-repeat; width: 100%; height: 100%; background-size: 100% 100%; position: relative}
  .loginView .loginBox{position: absolute; top: 2rem; left: 0.17rem; right: 0.17rem;}
  .loginView .loginBox >>> .el-input__inner{padding: 0 0.4rem; border-radius: 0; border: none}
  .loginView .loginBox >>> .el-input__inner:focus{ border: none;}
  .loginView .loginBox >>> .el-form-item:nth-child(1){margin: 0}
  .loginView .loginBox >>> .el-form-item:nth-child(1) .el-input__inner{border-top-left-radius: 0.04rem;border-top-right-radius: 0.04rem; position: relative}
  .loginView .loginBox >>> .el-form-item:nth-child(1):after{position: absolute; left: 5%; width: 90%; height: 0.01rem; content: ''; background: #acacac;z-index: 999}
  .loginView .loginBox >>> .el-form-item:nth-child(2) .el-input__inner{border-bottom-left-radius: 0.04rem;border-bottom-right-radius: 0.04rem;}
  .loginView .loginBox >>> .el-form-item__content{position: relative}
  .loginView .loginBox >>> .el-form-item img{width: 0.2rem; height: 0.2rem; position: absolute; z-index: 999; top: 0.1rem; left: 0.15rem;}
  .loginView .loginBox >>> .el-button{ width: 100%; background: #4cc9ff; color: #ffffff;}
  .loginView .loginBox >>> .el-button:focus, .el-button:hover{background: #4cc9ff; color: #ffffff}
</style>
