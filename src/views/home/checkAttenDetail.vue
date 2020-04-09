<template>
    <div class="checkAttenDetailView">
        <header-last :title="checkAttenDetailTit"></header-last>
        <div style="height:0.45rem"></div>
            <el-collapse v-model="activeName" accordion class="content">
                <div @click="getPunchDetail" v-if="liObj.length!=0">
                    <el-collapse-item class="ul_AttenView" v-for="(items,index) in liObj" :key="items.id" :name='index+1'>
                        <template slot="title">
                            <span>{{items.projectArea}} ({{searchData.date}})</span>
                            <span style="color:red;float:right">{{items.NUM}}</span>
                        </template>
                        <li class="li_AttenView" v-for="item in items.list" :key="item.projectId" :data-id='item.projectId'>
                            <span :data-id='item.projectId'>{{item.projectName}}</span>
                            <i style="color:red">{{item.NUM}}</i>
                            <i class="el-icon-arrow-right" :data-id='item.projectId'></i>
                        </li>
                    </el-collapse-item>
                </div>
            </el-collapse>
        <!-- <ul class="ul_AttenView" @click="getPunchDetail" v-if="liObj.length!=0">   
            <li class="li_AttenView" v-for="item in liObj" :data-id='item.projectId' :key="item.projectId">
                <template>
                    <span :data-id='item.projectId'>{{item.projectName}}</span>
                    <i class="el-icon-arrow-right" :data-id='item.projectId'></i>
                </template>
            </li>
        </ul>
        <ul class="norecord" v-else>暂无项目信息</ul> -->
    </div> 
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
export default {
    name:'checkAttenDetail',
    components:{
        headerLast
    },
    data(){
        return{
            checkAttenDetailTit:'项目列表',
            activeName:1,
            liObj: [],
            searchData:this.$route.query.searchData
            // area:this.$route.query.area,
            // projectGroup:this.$route.query.projectGroup,
            // date:this.$route.query.date,
            // prjName:this.$route.query.prjName,
            // staffName:this.$route.query.staffName,
        }
    },
    activated(){
        console.log("isUseCache",this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
            this.liObj = [];
            this.getProjectList();
        }
        this.$route.meta.isUseCache = false;
    },
    created(){
        console.log("11111111111",this.$route.query.searchData);
        // this.getProjectList();
    },
    methods:{
        getProjectList:function(){
            // console.log("11111111111",this.$route.query.searchData);
            let area = this.$route.query.searchData.area;
            let projectArea = this.$route.query.searchData.projectGroup;
            let prjName = this.$route.query.searchData.prjName;
            let staffName = this.$route.query.searchData.staffName;
            let day = this.$route.query.searchData.date;
            let params = {parentArea:area,projectArea:projectArea,prjName:prjName,staffName:staffName,day:day};
            console.log("params111",params);
            fetch.get("?action=/attendance/queryProjectList",params).then(res=>{
                console.log("queryProjectList",res);
                if(res.STATUSCODE === '1'){
                    this.liObj = res.data;
                }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }
            })
        },
        getPunchDetail:function(event){
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            let id = target.getAttribute('data-id');
            console.log('data-id',id);
            let searchData = this.$route.query.searchData;
            if(id!=null){
                this.$router.push({name:'punchDetail',query:{id:id,searchData:searchData}})
            }
        },
    },
    //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    if (to.name == 'punchDetail') {
      this.scrollTop = document.querySelector('.content').scrollTop;
      console.log("scrollTop:",this.scrollTop)
    }   
    if (to.name == 'punchReportForm') {
        to.meta.isUseCache = true;    
    } 
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter (to, from, next) {
    console.log("next:",next);
    next(vm => {
      console.log("vmvmvm",vm.scrollTop);
      document.querySelector('.content').scrollTop = vm.scrollTop
    })
  },
}
</script>
<style scoped>
.checkAttenDetailView{position: absolute; top: 0; width: 100%;overflow: scroll}
.ul_AttenView .li_AttenView{display: flex; justify-content: space-between; align-items: center;height: 0.55rem; background: #ffffff; border-top: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
.ul_AttenView .li_AttenView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_AttenView .li_AttenView span{width: 100%; text-align: left; color: #262626;font-size:0.12rem;line-height: 0.2rem}
.checkAttenDetailView>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>
<style>
.checkAttenDetailView .el-collapse .el-collapse-item__header{padding-left:0.2rem;font-size: 0.16rem;color: #2698d6;font-weight: bold}
.checkAttenDetailView .el-collapse .el-collapse-item .el-collapse-item__content{padding-bottom: 0rem}
</style>