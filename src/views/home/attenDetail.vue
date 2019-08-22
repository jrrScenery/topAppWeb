<template>
    <div class="attenDetailView">
        <header-atten-detail :title="attenDetailTit" @searchNotice="searchNotice"></header-atten-detail>
        <div style="height:0.45rem"></div>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul>
                <li v-for="item in detailArr" :key="item.id">
                <div class="div_Img">
                    <img src="../../assets/images/mineNotice_ring.png" alt="">
                    <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
                    <p>{{item.name}}</p>
                </div>
                <div class="article">
                    <div class="title"><span class="tit_l">打卡时间:</span><span class="tit_r">{{item.punchTime}}</span></div>
                    <div class="desc">是否提交说明:{{item.isSubmitDesc}}</div>
                    <div class="desc">说明:{{item.desc}}</div>
                    <div class="desc">是否审批:{{item.isAudit}}</div>
                    <div class="desc">审批人:{{item.auditMana}}</div>
                </div>
                </li>
            </ul>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>
    </div>
</template>
<script>
import headerAttenDetail from "../header/headerAttenDetail";
import loadingtmp from '@/components/load/loading'
export default {
    name:'attenDetail',
    components:{
        headerAttenDetail,
        loadingtmp
    },
    data(){
        return{
            attenDetailTit:'考勤明细',
            detailArr:[],
            formData: [],
            searchPage: '',
            page:1,
            pageSize:10,
            busy:false,
            loadall: false,
            caseId:this.$route.query.caseId
        }
    },
    created(){
        console.log(this.$route.query.caseId);
        this.detailArr = [
            {name:'杜鑫',punchTime:'2019-08-16 - ',isSubmitDesc:'否',desc:'',isAudit:'否',auditMana:'胡素标'},
            {name:'杜鑫',punchTime:'2019-08-15 10:00- ',isSubmitDesc:'是',desc:'因公外出',isAudit:'是',auditMana:'胡素标'}
        ]
    },
    methods:{
        getAttenDetail(flag){
            // let url = "?action=GetTaskMessage&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
            // fetch.get(url,"").then(res=>{
            //     console.log(res);
            //     if(flag){
            //         this.detailArr = this.detailArr.concat(res.data);
            //     }else{
            //         this.detailArr = res.data;
            //     }
            //     if(0 == res.data.length || res.data.length<this.pageSize ){
            //     this.busy = true;
            //     this.loadall = true;
            //     }
            //     else{
            //     this.busy = false;
            //     this.page++
            //     }
            // });
        },
        loadMore(){
            this.busy = true;
            setTimeout(() => {
                if ( this.searchPage == 1) {
                    this.searchNoticeIn(this.formData)
                } else {
                    this.getAttenDetail(this.page>1);
                }
            }, 500);
        },
        searchNotice (formData) {
            this.page = 1;
            this.detailArr = []
            this.searchNoticeIn(formData);
        },
        // 搜索条件data
        searchNoticeIn (formData) {
            this.formData = formData
            console.log(this.formData)
            this.loadall = false
            this.searchPage = 1
            // let notice = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TITLE: this.formData.title,SEND_NAME: this.formData.sendName};
            // fetch.get("?action=GetTaskMessage",notice).then(res=>{
            //     console.log(res)
            //     if(this.page > 1){
            //     this.detailArr = this.detailArr.concat(res.data);
            //     }else{
            //     this.detailArr = res.data;
            //     }
            //     if(0 == res.data.length || res.data.length<this.pageSize ){
            //     this.busy = true;
            //     this.loadall = true;
            //     }
            //     else{
            //     this.busy = false;
            //     this.page++
            //     }
            // })
        }
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