<!--我的-通知-->
<template>
  <div class="mineNoticeView">
    <header-last :title="mineNoticeTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <ul>
        <li v-for="item in mineNoticeObj" :key="item.id">
          <img src="../../assets/images/mineNotice_ring.png" alt="">
          <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
          <div class="article">
            <div class="title"><p><span>{{item.title}}</span></p><p><span style="margin-left: 0.05rem; display: inline-block">{{item.name}}</span></p><span style="font-size: 0.12rem;">{{item.time}}</span></div>
            <div class="desc">{{item.desc}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'mineNotice',
  components: {
    headerLast
  },

  data () {
    return {
      mineNoticeTit: '通知',
      mineNoticeObj: [
        {title: '新用户审核新用户审核新用户审核新用户审核新用户审核新用户审核', name: '系统', time: '2017-11-23  10:1:38', desc: '周新甫于Thu Nov 20 10:13:13CST 2017变更苏军未国家外汇管理局2017'},
        {title: '新用户审核', name: '张三', time: '2017-11-23 10:1:38', desc: '周新甫于Thu Nov 20 10:13:13CST 2017变更苏军未国家外汇管理局2017'},
        {title: '新用户审核', name: '系统', time: '2017-11-23 10:1:38', desc: '周新甫于Thu Nov 20 10:13:13CST 2017变更苏军未国家外汇管理局2017'}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .mineNoticeView{ width: 100%;}
  .content{width: 100%; margin-top: 0.05rem; background: #ffffff; color: #999999}
  .content ul{padding: 0 0.2rem;}
  .content ul li{display: flex; padding: 0.05rem 0; border-bottom: 0.01rem solid #e6e6e6;}
  .content ul li img{width: 0.4rem; height: 0.4rem; padding-right: 0.1rem; margin-top: 0.15rem;}
  .content ul li .article{}
  .content ul li .article .title{display: flex; justify-content: space-between; height: 0.3rem; line-height: 0.3rem;}
  .content ul li .article .title p{width: 0.6rem; font-size: 0.15rem; color: #191919; overflow: hidden}
  .content ul li .article .desc{line-height: 0.2rem; height: 0.4rem; overflow: hidden}
</style>
