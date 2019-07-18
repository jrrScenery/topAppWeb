<template>
    <div class="workBenchWorkInfoView">
        <header-last :title="workBenchWorkInfoTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchWorkInfoContent">
            <span class="htmlInfoSpan" v-html="dutyInformation">{{dutyInformation}}</span>
        </div>
        <div class="eventShowFooter">
            <el-row>
                <el-col :span="7">
                    <router-link :to="{name:'workBenchTechSpec',query:{dutyType:'2'}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
                            <span>技术专家组</span>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="7">
                    <router-link :to="{name:'workBenchResourceAdjust',query:{dutyType:'3'}}">
                        <div>
                        <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                        <span>一线资源协调</span>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="7">
                    <router-link :to="{name:'workBenchWorkInfoParts',query:{dutyType:'4'}}">
                    <div>
                        <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                        <span>备件</span>
                    </div>
                    </router-link>
                </el-col>
                <el-col :span="3"><div class="el-icon-more" @click.stop="popBg=!popBg"></div></el-col>
            </el-row>
        </div>
        <div v-if="popBg" class="popBg" @click.stop="popBg=!popBg">
            <ul>
                <router-link :to="{name:'workBenchNorthOne',query:{dutyType:'5'}}">
                    <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/eventPartRequire.png" alt="">北区一部二线</li>
                </router-link>
                <router-link :to="{name:'workBenchNorthTwo',query:{dutyType:'6'}}">
                    <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/eventPersonRequire.png" alt="">北区二部二线</li>
                </router-link>
                <router-link :to="{name:'workBenchEast',query:{dutyType:'7'}}">
                    <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/riskWarn.png" alt="">东区二线</li>
                </router-link>
                <router-link :to="{name:'workBenchSouth',query:{dutyType:'8'}}">
                    <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/sla.png" alt="">南区二线</li>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'workBenchWorkInfo',
    components:{
        headerLast
    },
    data(){
        return{
            workBenchWorkInfoTit:'CMO',
            dutyInformation:'',
            popBg: false,
        }
    },
    created(){
        fetch.get("?action=/risk/queryEmpOnDuty&dutyType=1",{}).then(res=>{
            console.log(res);
            if(res.STATUSCODE=='1'){
                this.dutyInformation = res.data.dutyInformation
            }
        })
    },
}
</script>
<style scoped>
.workBenchWorkInfoContent{width: 100%;height:100%; margin-top: 0.05rem ;margin-bottom: 0.45rem; color: #999999; background: #ffffff;overflow: scroll;-webkit-overflow-scrolling : touch;}
.eventShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
.eventShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
.eventShowFooter .el-row .el-col img{vertical-align: sub;}
.eventShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}
.popBg{background: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
.popBg ul{background: #f5f5f9; position: absolute; right: 0; bottom: 0.5rem; z-index: 2; line-height: 0.3rem}
.popBg li{padding: 0 0.15rem}
.popBg .slali{padding: 0 0.12rem}
.popBg li:nth-child(1){border-bottom: 0.01rem solid #e1e1e1;}
.popBg li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}
</style>


