<template>
    <div class="attenDetailView">
        <header-last :title="attenDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="content">
            <ul>
                <li v-for="item in detailArr" :key="item.id">
                <div class="div_Img">
                    <img src="../../assets/images/mineNotice_ring.png" alt="">
                    <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
                    <p>{{item.name}}</p>
                </div>
                <div class="article">
                    <div class="title"><span class="tit_l">打卡日期:</span><span class="tit_r">{{item.punchDate}}</span></div>
                    <div> 打卡时间：{{item.beginTime}}-{{item.endTime}}</div>
                    <div class="desc">补提考勤:{{item.absBeginTime}}-{{item.absEndTime}}</div>
                    <div class="desc">请假类型:{{leaveType[item.leaveType]}}</div>
                    <div class="desc">请假原因:{{item.reason}}</div>
                </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import loadingtmp from '@/components/load/loading'
import transfrom from "@/utils/dateTransform.js"
import fetch from '../../utils/ajax'
export default {
    name:'attenDetail',
    components:{
        headerLast,
        loadingtmp
    },
    data(){
        return{
            attenDetailTit:'考勤明细',
            searchType:'attenDetail',
            detailArr:[],
            formData: [],
            id:this.$route.query.id
        }
    },
    created(){      
        this.leaveType = transfrom.getLeaveType().leaveType;
        this.processStatus = transfrom.getLeaveType().processStatus;
        this.getAttenDetail();
    },
    methods:{
        getAttenDetail(){
            fetch.get("?action=/attendance/queryProjectAttendance&processId="+this.id,'').then(res=>{
                console.log("queryProjectAttendance",res);
                if(res.STATUSCODE==='1'){
                    this.detailArr = res.data;
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
    }
}
</script>
<style scoped>
.attenDetailView{ width: 100%; height: 100%;}
.content{width: 100%;  background: #ffffff; color: #999999;overflow-y: scroll; position: absolute; left: 0; top: 0.5rem; bottom: 0.45rem; overflow-x: hidden;}
  .content ul{padding: 0 0.2rem;}
  .content ul li{display: flex; padding: 0.07rem 0; border-bottom: 0.01rem solid #e6e6e6;}
  .content ul li .div_Img{padding: 0.05rem 0; width: 0.4rem; margin-right: 0.15rem; text-align: center}
  .content ul li img{width: 0.4rem; height: 0.4rem;}
  .content ul li .article{width: calc(100% - 0.55rem);}
  .content ul li .article .title{line-height: 0.3rem; display: flex; justify-content: space-between}
  .content ul li .article .title .tit_l{font-size: 0.15rem; color: #191919; width: calc(100% - 1.27rem); overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .content ul li .article .title .tit_r{font-size: 0.12rem; width: 1.27rem; vertical-align: top; text-align: right}
  .content ul li .article .desc{line-height: 0.2rem;}
</style>