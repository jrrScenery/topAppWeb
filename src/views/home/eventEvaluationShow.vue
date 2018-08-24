<!--首页-事件详情-服务评价编辑-->
<template>
  <div class="eventEvaluationEditorView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
        <div class="star">
          <span class="starTit">{{item.question.questionComment}}</span>
          <el-rate
                  v-model="item.scoreval"
                  disabled
                  :colors="['#666666', '#999999', '#FF9900']">
          </el-rate>
        </div>
        <div class="improve" v-if="item.scoreval<4">
          <span>{{item.question.questionComment2}}{{item.scoreval}}</span>
          <div class="improveCell">
            <el-checkbox-group v-model="item.aroptschked">
              <el-checkbox  disabled  v-for="itemoption in item.options" :label="itemoption.optionId" :key="itemoption.optionId">{{itemoption.optionComment}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>



      <ul class="signature">
        <li class="lisign">
          <span>客户签字</span>
          <div class="sign">

            <img :src="signimg">
          </div>
        </li>
        <li>
          <span>工程师</span>
          <div>{{engineer}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
  name: 'eventEvaluationShow',

  components: {
    headerLast
  },

  data () {
    return {
      eventEvaluationTit: '服务评价',
      signimg:"",
      engineer: '梁瑛',
      evaluateval:[],
      evaluateid: this.$route.query.evaluateid
    }
  },
  mounted(){
    console.log(this.evaluateid)
    fetch.get("?action=GetCaseEvaluateInfo&EVALUATE_ID=" + this.evaluateid).then(res=>{
        //console.log(this.eventListArr);

      console.log(res.data)
      if("0" == res.STATUSCODE){
        let jsonres= res;
        this.signimg = jsonres.imgObject.imgStr;
        this.engineer = jsonres.imgObject.engineerName;
        let tmpjsonval =[];
        jsonres.question.forEach(function(v,i,ar){
          let tmpobj = {};
          tmpobj.question= v;
          tmpobj.options = jsonres.optionOption.filter(function(item){return v.questionId == item.questionId})
          tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
          tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
          tmpobj.scores = jsonres.scoreOption.filter(function(item){return v.questionId == item.questionId})
          tmpobj.scoreval= tmpobj.scores.length? tmpobj.scores[0]["questionScore"]:0;
          tmpjsonval.push(tmpobj);
        })
        console.log(tmpjsonval);
        this.evaluateval = tmpjsonval;

      }

    });
  }
  ,
  methods: {
    getCaseEvaluateInfo: function(){

    }
  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff; color: #999999; padding: 0.1rem 0.25rem 0.15rem;}
  .editorView .star{display: flex;}
  .editorView .star .starTit{ display: inline-block; width: 1.2rem;}
  .editorView .improve span{line-height: 0.24rem}
  .editorView .improve >>> .el-checkbox{display: block; margin: 0; font-size: 0.13rem; color: #999999;}
  .signature li{overflow: hidden;zoom:1; margin: 0; padding: 0.1rem 0;  color: #2698d6; border-bottom: 0.01rem solid #e1e1e1}
  .signature li span{ width: 0.6rem; float: left;}
  .signature li div{color: #333333; margin-left: 0.6rem;}
  .signature li .sign{ }
  .signature li .sign img{width: 100%; display: block; flex-grow: 1;}
  label.el-checkbox{word-wrap: break-word}
  .improveCell span{ color: #666;word-wrap: break-word}
  .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #666!important;}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>
