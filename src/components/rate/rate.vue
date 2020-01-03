<template>
    <div class="rateView">
        <div class="title">请您对本次现场工程师【杜鑫】的服务内容进行确认</div>
        <div class="scoreView" @click="next">
            <el-steps :active="active">
                <el-step data-id="0" title="极差" description="0" icon="el-icon-star-on"></el-step>
                <el-step data-id="1" title="差" description="1" icon="el-icon-star-on"></el-step>
                <el-step data-id="2" title="不满意" description="2" icon="el-icon-star-on"></el-step>
                <el-step data-id="3" title="一般" description="3" icon="el-icon-star-on"></el-step>
                <el-step data-id="4" title="满意" description="4" icon="el-icon-star-on"></el-step>
                <el-step data-id="5" title="非常满意" description="5" icon="el-icon-star-on"></el-step>
            </el-steps>
            <!-- <el-button  @click="next">下一步</el-button> -->
        </div>
    </div>
</template>
<script>
export default {
    name:'',
    components:{},
    data(){
        return{
            active: 4
        }
    },
    created(){

    },
    methods:{
        next(){
            console.log("event",event);
            event = (event||window.event);
            let target = (event.target || event.srcElement);
            console.log("target000",target);
            let dataId = target.getAttribute('data-id');
            console.log(dataId);
            console.log("000000000000");
            if (this.active++ > 4) this.active = 0;
            console.log(this.active);
        }
    }
}
</script>
<style scoped>
.rateView{width: 100%}
.rateView >>>.title{font-size: 0.13rem;font-weight: bold;padding-left: 0.1rem}
.rateView >>>.scoreView{font-size: 0.12rem;margin: 0.2rem}
/* .rateView .el-step__title{font-size: 0.12rem;} */

</style>
<style>
.rateView .el-step__line{background-color:#ffffff}
.rateView .el-step__title{font-size: 0.12rem;}
.rateView .el-step__main {text-align: center}
.rateView .el-step__head.is-finish{border-color:#ffffff}
.rateView .is-finish .el-step__line{background:#ffffff}
.rateView .el-step__head.is-process{color:#409EFF}/*当前状态星星变化*/
.rateView .el-step__title.is-process{color:#409EFF}/*当前状态字体变化*/
.rateView .el-step__description.is-process{color:#409EFF}
</style>