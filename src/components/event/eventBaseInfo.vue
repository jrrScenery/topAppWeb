<!--基础信息-->
<template>
  <div class="eventBaseInfoView">
    <div class="baseInfoTop">
      <el-row>
        <el-col :span="11">
          <div class="cellTopNum">
            <span v-if="caseLevel == 1 || caseLevel == 2" style="background: #ff0000;">{{caseLevel}}</span>
            <span v-if="caseLevel == 3" style="background: #ff9900;">{{caseLevel}}</span>
            <span v-if="caseLevel == 4" style="background: #ffff00;">{{caseLevel}}</span>
            <span v-if="caseLevel == 5" style="background: #1ca2a5;">{{caseLevel}}</span>{{eventNum}}
          </div>
        </el-col>
        <el-col :span="1">
          <span v-if="health == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
          <span v-if="health == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
          <span v-if="health == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
          <span v-if="health == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
          <span v-if="health == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
        </el-col>
        <el-col :span="12">
          <div class="cellTopTime"><span>{{eventTime}}</span><span style="margin-left: 0.05rem;"></span></div>
        </el-col>
      </el-row>
    </div>
    <div class="baseInfoBottom">
      <div class="companyInfo">
        <span style="color: #2698d6; font-size: 0.14rem">{{companyInfo.name}}</span>
        <h4>{{companyInfo.tit}}</h4>
        <div style="display: flex; justify-content: space-between"><p><span style="color: #999999">设备：</span>{{companyInfo.equipment}}</p><p><span style="color: #999999">SN：</span>{{companyInfo.SN}}</p></div>
        <p>{{companyInfo.desc}}</p>
        <p>{{companyInfo.size}}</p>
      </div>
      <div class="speed">
        <el-steps :active="status.active" align-center>
          <template v-for="item in status.title">
            <el-step :title="item.tit" :key="item.id"></el-step>
          </template>
        </el-steps>
        <p>状态：{{status.state}}</p>
      </div>
      <div class="peopleInfo">
        <div v-for="item in peopleInfo" :key="item.id" style="display: flex; justify-content: center; width: 50%">
          <img v-if="item.imgSrc" :src="item.imgSrc" alt="">
          <img v-else src="../../assets/images/photo.png" alt="">
          <div>
            <p>
              {{item.name}} 
              <a href="tel:item.phone"> {{item.phone}} </a>
            </p>
            <span>{{item.position}}</span></div>
        </div>
      </div>
      <ul class="eventBaseInfoCell">
        <li v-for="item in baseInfoArr" :key="item.id"><span>{{item.tit}}</span>{{item.desc}} 
          <a href="tel:item.phone"> {{item.phone}} </a>
        </li>
      </ul>
      <div class="resolvent">
        <div style="display: flex; justify-content: space-between"><p>{{resolventObj.tit}}</p><p><span>解决时间：{{resolventObj.time}}</span></p></div>
        <div class="desc">{{resolventObj.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'eventBaseInfo',

  components: {

  },

  data () {
    return {
      title: '事件基本信息',
      health: '',
      eventNum: 'CS1608240019',
      eventTime: '2018-09-09 03:34:34',
      caseLevel: '',
      companyInfo: {name: '上海联通', tit: '2018年-2019年上海联通IT及Oracle服务项目', equipment: 'DELL PE2950', SN: 'DQ5DN2X', desc: '上海联通疆场DELL DQ5DN2X一块硬告警'},
      status: {active: 2, title: [{tit: '受理'}, {tit: '诊断'}, {tit: '处理'}, {tit: '关闭'}], state: '待管理责任人处理'},
      peopleInfo: [{imgSrc: '', name: '里斯', position: '管理责任人',phone:''}, {imgSrc: '', name: '张三', position: '技术责任人',phone:''}],
      baseInfoArr: [
        {tit: 'PM：', desc: '史蒂夫',phone:''},
        {tit: '销售：', desc: '阿斯顿发',phone:''},
        {tit: '所属区域：', desc: '北区一部'},
        {tit: '城市：', desc: '河北省石家庄'},
        {tit: '地址：', desc: '上海市就是的风景而'}
      ],
      resolventObj: {tit: '最终解决办法', time: '2018-09-09 23:23:23', desc: '的撒风洒到家发恶汉文化风景卡号放假啊哈佛诶发哈解放军红色'}
    }
  },

  methods: {

  },
  created:function(){

    let url = "?action=GetCaseInfo&CASE_ID="+this.$route.query.caseId;
    fetch.get(url,"").then(res=>{
      //console.log(res.data);
      let baseInfo = res.data;
      this.eventNum = baseInfo.CASE_NO;
      this.health = baseInfo.CASE_HEALTH;
      this.eventTime = baseInfo.HAPPENED_DATE;
      this.companyInfo.name = baseInfo.CUSTOMER_NAME;
      this.companyInfo.tit = baseInfo.PROJECT_NAME;
      this.companyInfo.equipment = baseInfo.DEVICE;
      this.companyInfo.SN = baseInfo.SN;
      this.companyInfo.desc = baseInfo.PROBLEM_DETAIL;
      this.status.active = parseInt(baseInfo.ACCEPT_STATUS);
      this.status.state = baseInfo.DEAL_STATUS_NAME;
      this.peopleInfo[0].name = baseInfo.MANAGER_REALNAME;
      this.peopleInfo[0].phone = baseInfo.MANAGER_MOBILE;
      this.peopleInfo[1].name = baseInfo.TECH_MANAGER_REALNAME;
      this.peopleInfo[1].phone = baseInfo.TECH_MANAGER_MOBILE;
      this.baseInfoArr[0].desc = baseInfo.PM_NAME;
      this.baseInfoArr[0].phone = baseInfo.PM_MOBILE;
      this.baseInfoArr[1].desc = baseInfo.SALE_NAME;
      this.baseInfoArr[1].phone = baseInfo.SALE_MOBILE;
      this.baseInfoArr[2].desc = baseInfo.QY_NAME;
      this.baseInfoArr[3].desc = baseInfo.CASE_LOCATION;
      this.baseInfoArr[4].desc = baseInfo.CASE_ADDRESS;
      this.resolventObj.time = baseInfo.SOLVING_TIME;
      this.resolventObj.desc = baseInfo.FINAL_SOLUTION;
      this.caseLevel = parseInt(baseInfo.CASE_LEVEL);
     });
  }

}
</script>

<style scoped>
  .eventBaseInfoView{padding: 0 0.15rem; margin-bottom: 0.5rem}
  .baseInfoTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .baseInfoTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .baseInfoTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.03rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .baseInfoTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0 0 -0.03rem; text-align: right}
  .baseInfoTop .cellTopTime{text-align: right; color: #999999;}
  .baseInfoBottom{color: #262626; line-height: 0.22rem}
  .baseInfoBottom .companyInfo{}
  .baseInfoBottom .companyInfo h4{font-size: 0.14rem}
  .baseInfoBottom .speed{margin: 0.1rem 0;}
  .baseInfoBottom .speed >>> .el-step__icon{width: 0.14rem; height: 0.14rem}
  .baseInfoBottom .speed >>> .el-step__icon-inner{display: none}
  .baseInfoBottom .speed >>> .el-step__title{font-size: 0.13rem}
  .baseInfoBottom .speed p{line-height: 0.4rem; color: #e0be35; text-align: center}
  .baseInfoBottom .peopleInfo{display: flex; margin-bottom: 0.1rem; line-height: 0.25rem}
  .baseInfoBottom .peopleInfo img{width: 0.5rem; height: 0.5rem; border-radius: 50%; margin-right: 0.1rem}
  .baseInfoBottom .resolvent{line-height: 0.2rem}
  .baseInfoBottom .resolvent p{line-height: 0.3rem}
  .baseInfoBottom .resolvent span{color: #999999}
  .baseInfoBottom .resolvent .desc{color: #999999}
  .eventBaseInfoCell{padding: 0 0.1rem 0.05rem; color: #262626; border-bottom: 0.01rem solid #e1e1e1}
  .eventBaseInfoCell span{width: 0.65rem; color: #999999; display: inline-block;}
</style>
