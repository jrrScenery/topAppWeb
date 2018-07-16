<!--进展情况-->
<template>
  <div class="eventProgressView">
    <el-collapse v-model="activeName" v-for="items in eventProgressObj" :key="items.name">
      <el-collapse-item :name="items.name">
        <template slot="title">
          <img class="titleImg" :src="items.imgSrc" alt="">{{items.title}}
        </template>
        <template>
          <!--<img v-if="items.name === '3'" src="../../assets/images/eventBaseInfo_1.jpg" alt="" width="376" height="92">-->
          <div v-for="item in items.desc" :key="item.id" class="eventProgressDesc">
            <span>{{item.time}}</span>
            <p>{{item.info}}</p>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'eventProgress',

  components: {

  },

  data () {
    return {
      activeName: ['2'],
      eventProgressObj: [
        {title: '事件受理', name: '1', imgSrc: require('@/assets/images/eventProgress_1.png'), desc: [{info: '等待客户提供信息', time: '2016-09-09 12:23:23'}]},
        {title: '分析诊断', name: '2', imgSrc: require('@/assets/images/eventProgress_2.png'), desc: [{info: '等待客户提供信息', time: '2016-09-09 12:23:23'}, {info: '客户以提供信息', time: '2016-09-09 12:23:23'}, {info: '提交分析诊断记录', time: '2016-09-09 12:23:23'}]},
        {title: '人员/备件/方案', name: '3', imgSrc: require('@/assets/images/eventProgress_3.png'), desc: [{info: '等待客户提供信息', time: '2016-09-09 12:23:23'}]}
      ],
      eparr:[]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  },
  created:function(){

  },
  mounted(){
    var url = "?action=GetCaseLogList&CASE_ID="+this.$route.query.caseId;
    fetch.get(url,"").then(res=>{
      //console.log(res.data)
      var logData = res.data;
      var temparr= [] ;
      for(var i=0;i<logData.length;i++){
        var data = logData[i];
        var curStep = data.CASE_STEP-1;
        if(!temparr[curStep]){
          temparr[curStep] = {};
        }
        if(!temparr[curStep].title){
          temparr[curStep].title = data.CASE_STEP_NAME;
          temparr[curStep].name = data.CASE_STEP;
          temparr[curStep].imgSrc = require('@/assets/images/eventProgress_2.png');
        }
        var descIndex = 0;
        if(!temparr[curStep].desc){
          temparr[curStep].desc = [];
        }else{
          descIndex = temparr[curStep].desc.length;
        }
        temparr[curStep].desc[descIndex] = {};
        temparr[curStep].desc[descIndex].info = data.PROCESSING_LOG;
        temparr[curStep].desc[descIndex].time = data.CREATE_DATE;
      }
      //console.log(this.eventProgressObj);
      this.activeName = 1;
      this.eventProgressObj = temparr;
    });
  }
}
</script>

<style scoped>
  .eventProgressView{padding: 0 0.25rem; position: relative; margin-bottom: 0.5rem}
  .eventProgressView:before{position: absolute; top: 0; left: 0.34rem; width: 0.02rem; height: 100%; bottom: 0; background: #999999; content: '';}
  .eventProgressView .titleImg{width: 0.18rem; height: 0.18rem;position: absolute; top: 0.15rem; left: -0.43rem;}
  .eventProgressView >>> .el-collapse-item__header{color: #666666; font-size: 0.14rem; margin: 0 0 0.1rem 0.43rem; border: none; position: relative}
  .eventProgressView >>> .el-collapse-item__arrow{color: #2698d6; font-size: 0.2rem; border: none}
  .eventProgressView >>> .el-collapse-item__wrap{border: none}
  .eventProgressView >>> .el-collapse{border: none}
  .eventProgressView >>> .el-collapse-item__content{margin-left: 0.43rem; padding: 0;}
  .eventProgressView >>> .el-collapse-item__content span{font-size: 0.1rem}
  .eventProgressView >>> .el-collapse-item__content p{font-size: 0.13rem}
  .eventProgressDesc{margin-bottom: 0.15rem;}
  .eventProgressDesc span{position: relative;}
  .eventProgressDesc span:before{position: absolute; top: 0.15rem; left: -0.39rem; width: 0.12rem; height: 0.12rem; background: #999999; content: ''; border-radius: 50%;}
</style>
