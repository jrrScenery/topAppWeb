<template>
  <div class="eventPeopleView">
    <header-last></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="eventPeopleCell" v-for="item in eventPeopleData">
        <div class="cellLeft">
          <img :src="item.imgSrc" alt="">
          <img v-if="!item.imgSrc" src="../../assets/images/photo.png"alt="">
        </div>
        <div class="cellRight">
          <p>{{item.name}}</p>
          <ul>
            <li v-for="info in item.arr"><span>{{info.type}}</span>{{info.desc}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'eventPeople',

  components: {
    headerLast
  },

  data () {
    return {
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
        },
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff;}
  .eventPeopleCell{display: flex; margin: 0 0.25rem; padding: 0.15rem 0; border-bottom: 0.01rem solid #cccccc}
  .eventPeopleCell .cellLeft{width: 0.75rem; height: 0.75rem; margin-right: 0.3rem;}
  .eventPeopleCell .cellLeft img{width: 0.75rem; height: 0.75rem; border-radius: 50%;}
  .eventPeopleCell .cellRight p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
  .eventPeopleCell .cellRight li{color: #666666; font-size: 0.12rem; line-height: 0.18rem;}
  .eventPeopleCell .cellRight li span{margin-right: 0.15rem;}
</style>

