<!--首页-事件详情-相关人员-->
<template>
  <div class="eventPeopleView">
    <header-last :title="eventPeopleTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="eventPeopleCell" v-for="item in eventPeopleData" :key="item.id" @click="ringUp">
        <div class="cellLeft">
          <img :src="item.imgSrc" alt="">
          <img v-if="!item.imgSrc" src="../../assets/images/photo.png" alt="">
        </div>
        <div class="cellRight">
          <p>{{item.name}}</p>
          <ul>
            <li v-for="info in item.arr" :key="info.id"><span>{{info.type}}</span>{{info.desc}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="popBg" class="popBg" @click="popBg = !popBg">
      <div class="popBox">
        <p><span>电话</span>{{}}</p>
        <p><span>手机</span>{{}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
var caseId;
export default {
  name: 'eventPeople',

  components: {
    headerLast
  },

  data () {
    return {
      eventPeopleTit: '相关人员',
      popBg: false,
      eventPeopleData: [
        {
          imgSrc: '',
          name: '吕阳',
          arr: [
            {type: '角色', desc: '项目经理'},
            {type: '电话', desc: '010-34347834'},
            {type: '手机', desc: '13515664564'},
            {type: '部门', desc: '二线支持部'},
            {type: '邮箱', desc: 'zhengjianb@dcits.com'}
          ]
        },
        {
          imgSrc: '',
          name: '吕阳',
          arr: [
            {type: '角色', desc: '项目经理'},
            {type: '电话', desc: '010-34347834'},
            {type: '手机', desc: '13515664564'},
            {type: '部门', desc: '二线支持部'},
            {type: '邮箱', desc: 'zhengjianb@dcits.com'}
          ]
        }
      ]
    }
  },

  methods: {
    ringUp () {
      this.popBg = !this.popBg
    }
  },
  created:function(){
    caseId = this.$route.params.caseId;
    fetch.get("?action=GetSupportorList&CASE_ID="+this.$route.params.caseId,{}).then(res=>{
      console.log(res.data);
      for(var i=0;i<res.data.length;i++){
        var info = res.data[i];
        this.eventPeopleData[i].name = info.SUPPORTOR_NAME;
        this.eventPeopleData[i].arr[0].desc = info.ROLE;
        this.eventPeopleData[i].arr[1].desc = info.TEL;
        this.eventPeopleData[i].arr[2].desc = info.MOBILE;
        this.eventPeopleData[i].arr[3].desc = info.ORGNAME;
        this.eventPeopleData[i].arr[4].desc = info.EMAIL;
      }
    });
  }
}
</script>

<style scoped>
  .eventPeopleView{ width: 100%; height: 100%; position: relative}
  .content{margin-top: 0.05rem; background: #ffffff;}
  .eventPeopleCell{display: flex; margin: 0 0.25rem; padding: 0.15rem 0; border-bottom: 0.01rem solid #cccccc}
  .eventPeopleCell .cellLeft{width: 0.75rem; height: 0.75rem; margin-right: 0.3rem;}
  .eventPeopleCell .cellLeft img{width: 0.75rem; height: 0.75rem; border-radius: 50%;}
  .eventPeopleCell .cellRight p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
  .eventPeopleCell .cellRight li{color: #666666; font-size: 0.12rem; line-height: 0.18rem;}
  .eventPeopleCell .cellRight li span{margin-right: 0.15rem;}

  .popBg{position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);}
  .popBg .popBox{position: absolute; top: 50%; left: 50%; margin: -0.45rem 0 0 -1.25rem; width: 2.3rem; height: 0.9rem; border-radius: 0.04rem; background: #000000; color: #ffffff;}
  .popBg .popBox p{height: 0.45rem; line-height: 0.45rem; padding: 0 0.15rem; font-size: 0.14rem;}
  .popBg .popBox p span{display: inline-block; margin-right: 0.1rem;}
  .popBg .popBox p:nth-child(1){position: relative;}
  .popBg .popBox p:nth-child(1):after{position: absolute; bottom: 0; left: 5%; width: 90%; height: 0.01rem; content: ''; background: #818181}
</style>
