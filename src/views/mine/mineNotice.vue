<!--我的-通知-->
<template>
  <div class="mineNoticeView">
    <header-last :title="mineNoticeTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul>
        <li v-for="item in eventListArr" :key="item.id">
          <img src="../../assets/images/mineNotice_ring.png" alt="">
          <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
          <div class="article">
            <div class="title"><p><span>{{item.BIZ_NAME}}</span></p><p><span style="margin-left: 0.05rem; display: inline-block">{{item.SEND_NAME}}</span></p><span style="font-size: 0.12rem;">{{item.CREATE_ON}}</span></div>
            <div class="desc">{{item.TITLE}}</div>
          </div>
        </li>
      </ul>

      <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>

    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
export default {
  name: 'mineNotice',
  components: {
    headerLast,
    loadingtmp
  },

  data () {
    return {
      mineNoticeTit: '通知',
      eventListArr: [
      ],
      page:1,
      pageSize:10,
      busy:false,
      loadall: false
    }
  },

  methods: {
    getEventList(flag){
      let url = "?action=GetTaskMessage&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      fetch.get(url,"").then(res=>{
        //console.log(this.eventListArr);
        if(flag){
            this.eventListArr = this.eventListArr.concat(res.data);
        }else{
            this.eventListArr = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }

      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.getEventList(this.page>1);
      }, 500);
    }
  },
  created () {

  }
}
</script>

<style scoped>
  .mineNoticeView{ width: 100%; height: 100%;}
  .content{width: 100%;  background: #ffffff; color: #999999;overflow-y: scroll; position: absolute; left: 0; top: 0.5rem; bottom: 0; overflow-x: hidden;}
  .content ul{padding: 0 0.2rem;}
  .content ul li{display: flex; padding: 0.05rem 0; border-bottom: 0.01rem solid #e6e6e6;}
  .content ul li img{width: 0.4rem; height: 0.4rem; padding-right: 0.1rem; margin-top: 0.15rem;}
  .content ul li .article{}
  .content ul li .article .title{display: flex; justify-content: space-between; height: 0.3rem; line-height: 0.3rem;}
  .content ul li .article .title p{width: 0.6rem; font-size: 0.15rem; color: #191919; overflow: hidden}
  .content ul li .article .desc{line-height: 0.2rem; height: 0.4rem; overflow: hidden}
</style>
