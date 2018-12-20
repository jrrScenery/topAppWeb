<!--一级底部-->
<template>
  <div class="footerSelect">
    <el-menu
      :default-active="defaultActive"
      :collapse="false"
      mode="horizontal"
      @select="select">
    <template v-for="item in footerArr">
      <el-menu-item v-if="footerArr.length == 4" style="width: 25%;" :index="item.index" @click="routerPush(item.index)" :key="item.id">
        <!-- <img v-if="item.elType === 3" :src="item.imgSrc" class="workImg" /> -->
        <i :class="item.className"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
      <el-menu-item v-if="footerArr.length == 3" style="width: 33.3%;" :index="item.index" @click="routerPush(item.index)" :key="item.id">
        <i :class="item.className"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
    </template>
    </el-menu>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'footerHome',
  data: function () {
    return {
      footerArr: [],
      title: [],
      defaultActive: 'home'
    }
  },
  activated(){
    this.footerArr=[
      {elType: 1, index: 'home', text: '首页', className: 'el-icon-footer_1',display:true},
      {elType: 2, index: 'focus', text: '关注', className: 'el-icon-footer_2',display:true},
      {elType: 5, index: 'mine', text: '设置', className: 'el-icon-footer_5',display:true}
    ];
    this.efaultActive = 'home';
    // localStorage.removeItem("footerSelectObj");
    this.getFooterArr(); 
  },

  created () { 
    this.getFooterArr(); 
    this.routerChange(this.$route);
  },

  methods: {
    getFooterArr(){
      localStorage.removeItem("footerSelectObj");
      // this.defaultActive = 'home';
      let permissions = JSON.parse(localStorage.getItem("userPermission"));
      // console.log("permissions:",permissions)
      if(permissions.length==0){
        // console.log("111111111111111");
        this.footerArr[0] = {elType: 1, index: 'home', text: '首页', className: 'el-icon-footer_1',display:true};
        this.footerArr[1] = {elType: 2, index: 'focus', text: '关注', className: 'el-icon-footer_2',display:true};
        this.footerArr[2] = {elType: 3, index: 'mine', text: '设置', className: 'el-icon-footer_5',display:true}
        // console.log("this-this1",this.footerArr);
      }else{
        var m=0;
        for(let i=0;i<permissions.length;i++){
          if(permissions[i].PRIVID=='workFlow_business_statistics'){
            m++;
          }  
        }
        if(m!=0){
          this.footerArr[0] = {elType: 1, index: 'home', text: '首页', className: 'el-icon-footer_1',display:true};
          this.footerArr[1] = {elType: 2, index: 'focus', text: '关注', className: 'el-icon-footer_2',display:true};
          this.footerArr[2] = {elType: 3, index: 'workBench', text: '管理舱', className: 'el-icon-footer_4',display:false};
          this.footerArr[3] = {elType: 4, index: 'mine', text: '设置', className: 'el-icon-footer_5',display:true}
        }else{
          this.footerArr[0] = {elType: 1, index: 'home', text: '首页', className: 'el-icon-footer_1',display:true};
          this.footerArr[1] = {elType: 2, index: 'focus', text: '关注', className: 'el-icon-footer_2',display:true};
          this.footerArr[2] = {elType: 3, index: 'mine', text: '设置', className: 'el-icon-footer_5',display:true}
        }
        // console.log("m:",m);
        // console.log("this-this2",this.footerArr);
      }
    },
    select (index, indexPath, e) {
      
      // let footerSelectObj = localStorage.getItem('footerSelectObj') || JSON.stringify({})
      // let footerArr = this.footerArr
      // let dealAfterObj = JSON.parse(footerSelectObj);
      // console.log(dealAfterObj[index]);
      // if (dealAfterObj[index]) return
      // for (let i = 0; i < footerArr.length; i++) {
      //   console.log("111");
      //   console.log("index",index);
      //   console.log("footerArr[i].index",footerArr[i].index);
      //   if (index === footerArr[i].index) {
      //     dealAfterObj[index] = {path: footerArr[i].index, text: footerArr[i].text}
          
      //     localStorage.setItem('footerSelectObj', JSON.stringify(dealAfterObj))
      //     // console.log(footerSelectObj);
      //     return
      //   }
      // }
      // console.log(footerSelectObj);
      // console.log("dealAfterObj:",dealAfterObj)
    },

    routerChange (e) {
      // console.log("e:",e);
      let path = e.path.split('/')[1]
      let footerArr = this.footerArr;
      // console.log("bbbbbbbbbbbb",this.footerArr);
      // console.log("path22222222",path);
      for (let i = 0; i < footerArr.length; i++) {
        console.log(footerArr[i].index);
        console.log("path:",path);
        if (footerArr[i].index === path) {
          this.defaultActive = path
          break
        }
        if (footerArr[i].arr) {
          for (let j = 0; j < footerArr[i].arr.length; j++) {
            if (footerArr[i].arr[j].index === path) {
              this.defaultActive = path
              break
            }
          }
        }
      }
      console.log("defaultActive:",this.defaultActive)
    },

    routerPush (path) {
      // localStorage.removeItem("footerSelectObj");
      // console.log("path:",path)
      if(path.length>0){
        this.$router.push({path: '/' + path})        
      }
    }
  },

  watch: {
    '$route': 'routerChange'
  }
}
</script>

<style>
  .footerSelect{display: flex;position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; width: 100%; height: 0.45rem; box-shadow: 0 -0.01rem 0.02rem 0 #d9d9d9}
  .footerSelect .el-menu-item, .el-submenu__title{height: 0.45rem!important;}
  .footerSelect .el-menu--horizontal{width: 100%; padding: 0 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; border: none;width: 25%; text-align: center; padding: 0; color: #8a8a8a!important; background: #ffffff!important; font-size: 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item span{line-height: 0.2rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item.is-active{border: none; color: #2698d6!important; background: #ffffff!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item i{display: inline-block; width: 0.22rem; height: 0.22rem; margin: auto; font-size: 0.24rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item .workImg{width: 0.25rem; height: 0.25rem; margin: auto; position: absolute; top: -0rem; left: 50%; margin-left: -0.12rem}
</style>
