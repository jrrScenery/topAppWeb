<template>
    <div class="dayDetailView">
        <div class="dayContent">
            <el-form :model="form">
                <el-form-item label="时间">
                    <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" style="width: 80%;" value-format="yyyy-MM-dd" @change="noKeyword"></el-date-picker>
                </el-form-item>
                <div class="content"><!-- v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"-->
                    <ul v-if="dayDetailArr.length!=0">
                        <li v-for="item in dayDetailArr" :key="item.id">
                            <div class="article">
                                <div class="title">{{item.realname}} {{item.beginTime}}-{{item.endTime}}</div>
                                <div class="desc">{{item.addressInfo}}</div>
                            </div>
                            <div class="status" :style="{color:item.status=='正常'?'green':'red'}">{{item.status}}</div>
                        </li>
                    </ul>
                    <ul class="norecord" v-else>暂无当天打卡数据</ul>
                    <!-- <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp> -->
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
import dayDetailArr from "../../utils/dateTransform.js"
export default {
    name:'dayDetail',
    components:{
        loadingtmp
    },
    data(){
        return{
            form:{
                date:this.GetDateStr(-1),
            },
            dayDetailArr:[],
            projectId:this.$route.query.id,
            searchData:this.$route.query.searchData
            // page:1,
            // pageSize:1,
            // busy:false,
            // loadall: false
        } 
    },
    created(){
        console.log("searchData:",this.searchData);
        this.getDayDetail();
        if(this.searchData.date){
            this.form.date = this.searchData.date
        }
    },
    methods:{
        GetDateStr(AddDayCount){
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
            console.log(y + "-" + m + "-" + d);
            return y + "-" + m + "-" + d;
        },
        getDayDetail(){
            let params = "&projectId="+this.projectId+"&type=1&dateStr="+this.form.date
            fetch.get("?action=/attendance/queryPunchCollect"+params,'').then(res=>{
                console.log("queryPunchCollect",res);
                if(res.STATUSCODE === '1'){
                    this.dayDetailArr = res.data;
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
        noKeyword () {
            // document.activeElement.blur();
            this.getDayDetail();
        },
        // loadMore(){
        //     if(this.busy){return false}
        //     this.busy = true;
        //     setTimeout(() => {
        //         dayDetailArr.getDayDetail();
        //     }, 500);
        // },
    }
}
</script>
<style scoped>
.dayDetailView{width: 100%;height: 100%;overflow: scroll;position: relative;}
.dayContent{background: #ffffff;margin: 0.2rem;color: #999999;left: 0; top: 0.5rem; bottom: 0.45rem;}
/* .dayContent ul{padding: 0 0.1rem;} */
.dayContent ul li{display: flex; padding: 0.07rem 0; border-bottom: 0.01rem solid #e6e6e6;}
.dayContent ul li .article{width: 90%}
.dayContent ul li .status{width: 10%}
.dayContent ul li .article .title{line-height: 0.3rem; display: flex; justify-content: space-between}
.dayContent ul li .article .desc{line-height: 0.2rem;}
.dayContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>