<template>
    <div class='monthDetailView'>
        <div class="monthContent">
            <el-date-picker type="month" placeholder="请选择日期" v-model="date" style="width: 80%;" value-format="yyyy-MM-dd" @change="noKeyword"></el-date-picker>
            <ul class="ul_AttenView" @click="getMonthTypeDetail($event)" v-if="monthDetailArr.length!=0">
                <li class="li_AttenView" v-for="item in monthDetailArr" :key="item.projectId" :data-id='item.projectId'>
                    <template>
                        <span :data-id='item.projectId' v-if="item.leaveType==0">未补考勤</span>
                        <span :data-id='item.projectId' v-else>{{leaveType[item.leaveType]}}</span>
                        <span style="text-align:right;padding-right:0.2rem" :data-id='item.projectId' :data-type='item.leaveType'>{{item.num}}人</span>
                        <i class="el-icon-arrow-right" :data-id='item.projectId' :data-type='item.leaveType'></i>
                    </template>
                </li>
            </ul>
            <ul class="norecord" v-else>暂无当月统计数据</ul>
        </div>
    </div>
</template>
<script>
import fetch from '../../utils/ajax'
import transfrom from "@/utils/dateTransform.js"
export default {
    name:'monthDetail',
    components:{
    },
    data(){
        return{
            monthDetailArr:[],
            date:'',
            projectId:this.$route.query.id,
            leaveType:[],
        }
    },
    created(){
        let current = new Date();
        this.date = current.getFullYear()+"-"+(current.getMonth()+1);
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.getMonthDetail();
    },
    methods:{
        getMonthDetail(){
            let params = "&projectId="+this.projectId+"&type=2&dateStr="+this.date;
            fetch.get("?action=/attendance/queryPunchCollect"+params,'').then(res=>{
                console.log("queryPunchCollect",res);
                if(res.STATUSCODE === '1'){
                    this.monthDetailArr = res.data;
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
        getMonthTypeDetail:function(event){
            console.log(event);
            event = (event || window.event);
            let target = (event.target || event.srcElement);
            let id = target.getAttribute('data-id');
            let leaveType = target.getAttribute('data-type');
            console.log("id:"+id+",leaveType:"+leaveType);
            console.log("000000000000",this.date);
            this.$router.push({name:'monthTypeDetail',query:{projectId:id,dateStr:this.date,leaveType:leaveType}})
        },
        noKeyword () {
            this.getMonthDetail();
        },
    }
}
</script>
<style scoped>
.monthDetailView{width: 100%;height: 100%;overflow: scroll;position: relative;}
.monthContent{background: #ffffff;margin: 0.2rem;color: #999999;left: 0; top: 0.5rem; bottom: 0.45rem;}
.ul_AttenView .li_AttenView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
.ul_AttenView .li_AttenView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_AttenView .li_AttenView span{width: 100%; text-align: left; color: #262626;font-size:0.15rem}
.monthContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>