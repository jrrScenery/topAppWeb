<!--工作量确认表填写-->
<template>
  <div class="declareWordLoadView">
    <header-last :title="declareTitle"></header-last>
    <div style="height: 0.45rem;"></div>
      <div class="content">
          <el-form ref="form" :model="form" label-width="0.9rem">
            <el-form-item label="派工者">
              <el-input v-model="form.creatorRolename" class="bInput"></el-input>
            </el-form-item>
            <!-- <hr class="secondBoundaries"></hr> -->
            <el-form-item label="开始时间">
              <el-date-picker type="date" @focus="noKeyword" placeholder="开始时间" v-model="form.expectStart" style="width: 100%;" value-format="yyyy-MM-dd">
                <!-- <el-input class="bInput" v-model="form.expectStart">
                </el-input> -->
              </el-date-picker>
              <!-- <el-input v-model="form.expectStart" class="bInput"></el-input> -->
              <!-- </el-input> -->
            </el-form-item>
            <el-form-item label="结束时间">
              <!-- <el-input v-model="form.expectEnd" class="bInput"></el-input> -->
              <el-date-picker type="date" @focus="noKeyword" placeholder="结束时间" v-model="form.expectEnd" style="width: 100%;" value-format="yyyy-MM-dd">
                <!-- <el-input class="bInput" v-model="form.expectStart">
                </el-input> -->
              </el-date-picker>
            </el-form-item>
            <el-form-item label="实施工作量">
              <el-input v-model="form.standardWorkload" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="路途工作量">
              <el-input placeholder="请输入路途工作量" v-model="form.wayWorkload" class="bInput"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        
        </div>

  </div>
</template>

<script>
import headerLast from "../header/headerLast"
import fetch from "../../utils/ajax.js"


export default {
  name: "declareWorkLoad",

  components: {
      headerLast,
  },

  data () {
    return {
      declareTitle:"工作量申报",
      form: {
        expectStart: '',
        expectEnd: '',
        creatorRolename: '',
        standardWorkload: '',
        wayWorkload: ''
      }
    }
  },
  created (){
    this.form.expectStart = this.$route.query.expectStart;
    this.form.expectEnd = this.$route.query.expectEnd;
    this.form.creatorRolename = this.$route.query.creatorRolename;
    this.form.standardWorkload = this.$route.query.standardWorkload;
    this.form.wayWorkload = this.$route.query.wayWorkload;
    this.form.caseId = this.$route.query.caseId;
    this.form.workId = this.$route.query.workId;
  },
  methods: {
    onSubmit () {
      let form = this.form;
      fetch.get("?action=/work/DeclareWorkload"+"&START_TIME="+form.expectStart+"&END_TIME="+form.expectEnd+"&CASE_ID="+form.caseId+"&WORK_ID="+form.workId+"&NORMAL_WORKLOAD="+form.standardWorkload+"&EXTRA_WORKLOAD="+form.wayWorkload,{}).then(res=>{
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", res)
      })
      
    },
    noKeyword () {
      document.activeElement.blur()
    },
  }


}
</script>

<style scoped>
  .declareWordLoadView{width:100%;background: #ffffff;}
  .content{margin-top: 0.05rem;background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
   
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}

  .secondBoundaries{padding: 0 20px 0;margin: 20px 0;line-height: 10px;z-index: 999}
</style>

      
  