<!--我的-->
<template>
  <div class="mineView">
    <div class="mineBg" v-for="item in userData">
      <img :src="item.imgSrc" alt="">
      <p><span>{{item.userName}}</span><span>{{item.phone}}</span></p>
    </div>
    <ul class="ul_mineView">
      <li class="li_mineView" v-for="item in liObj">
        <img :src="item.imgSrc" alt="">
        <span>{{item.text}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'mine',

  components: {
  },

  data () {
    return {
      userData: [
        {imgSrc: require('@/assets/images/mine_bg.jpg'), userName: '购买时光', phone: '13888888888'}
      ],
      liObj: [
        {imgSrc: require('@/assets/images/mine_1.png'), text: '通知'},
        {imgSrc: require('@/assets/images/mine_2.png'), text: '我的报修'},
        {imgSrc: require('@/assets/images/mine_3.png'), text: '我的意见反馈'},
        {imgSrc: require('@/assets/images/mine_4.png'), text: '退出当前账户'}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .mineView{position: absolute; top: 0; width: 100%;}
  .mineBg{position: relative; width: 100%; height: 2.1rem;}
  .mineBg img{width: 100%; height: 100%}
  .mineBg p{position: absolute; bottom: 0; width: 100%; height: 0.5rem; line-height: 0.5rem; color: #ffffff; background: rgba(0,0,0,0.7); font-size: 0.15rem;}
  .mineBg p span{margin-left: 0.25rem;}
  .ul_mineView{}
  .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
  .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626}
</style>
