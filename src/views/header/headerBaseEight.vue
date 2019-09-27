<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="el-icon-plus" @click.stop="handle()"></div>
    </header>
    <div class="popBg" v-if="popBg">
      <add-parts @change="updatePopBg" @search="searchData"></add-parts>
    </div>
    <!-- 请先完成结果反馈再进行离场feedbackVisible -->
      <div class="dialogdc">
          <el-dialog
              title="提示"
              :visible.sync="visible"
              :show-close="false"
              width="80%"
              center>
              <el-form>
              <div style="margin:0.2rem">
                  <span>请先完成到场反馈再进行备件整理</span>
              </div>
              <el-form-item class="submit">
                  <el-button type="primary" class="onsubmit" @click="visible = false" >确 定</el-button>
                  <!-- <el-button type="primary" class="onsubmit" @click="confirm()">确 定</el-button> -->
              </el-form-item>
              </el-form>
          </el-dialog>
      </div>
  </div>
</template>

<script>
import addParts from '@/views/home/addParts'
import fetch from '../../utils/ajax'
export default {
  name: 'headerBaseEight',

  components: {
    addParts
  },

  data () {
    return {
      popBg: false,
      visible:false,
      caseId:this.$route.query.caseId,
      workId:this.$route.query.workId,
      slaFeedBack:''
    }
  },

  props:['title'],

  watch: {
  },

  created () {
    fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId+"&WORK_ID="+this.workId, {}).then(res=>{
        if(res.flag.length!=0){
            this.slaFeedBack = res.flag[0].STATUS;
        }
        console.log("spare", res)

    });
  },

  methods: {
    handle(){
      // console.log(this.slaFeedBack)
      if(this.slaFeedBack!='1'){    
        this.visible=true
      }else{
        this.popBg=!this.popBg
      }
      console.log('111111111')
    },
    updatePopBg (data) {
      this.popBg = data.popBg
    },

    searchData (data) {
      this.$emit('searchPro', data)
      console.log("11111111111111112222",data)
    },

    onAddParts () {
      this.$router.push({name:"addParts",query:{caseId: this.$route.query.caseId,slaFeedBack:this.this.$route.query.slaDcFeedback}});
    },

    back: function (event) {
      this.$router.back(-1)
    }

  }
}
</script>

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 9999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.2rem;}
  .headerLeft i{font-size: 0.2rem;}
  .el-icon-plus{font-weight: 900; line-height: 0.48rem;}
  .popBg{background: rgba(0,0,0,0.5); position: fixed; top: 0.45rem; bottom: 0; left: 0; right: 0; z-index: 999; padding: 0 0.25rem;}

  .dialogdc >>> .el-dialog__body{padding: 0px 0px}
  .dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
  .dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
  .dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .dialogdc >>> .submit .el-button:hover{background: #ffffff;}
  .dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
  .dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
  .dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>