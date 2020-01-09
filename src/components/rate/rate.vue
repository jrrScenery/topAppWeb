<template>
    <div class="rateView">
        <div class="title">请您对本次现场工程师【杜鑫】的服务内容进行确认</div>
        <div class="scoreView">
            <el-steps :active="active">
                <el-step title="极差" description="0" icon="el-icon-star-on" @click.native="next(0)"></el-step>
                <el-step title="差" description="1" icon="el-icon-star-on" @click.native="next(1)"></el-step>
                <el-step title="不满意" description="2" icon="el-icon-star-on" @click.native="next(2)"></el-step>
                <el-step title="一般" description="3" icon="el-icon-star-on" @click.native="next(3)"></el-step>
                <el-step title="满意" description="4" icon="el-icon-star-on" @click.native="next(4)"></el-step>
                <el-step title="非常满意" description="5" icon="el-icon-star-on" @click.native="next(5)"></el-step>
            </el-steps>
            <el-form :model="formData" ref="formData">
                <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                    <div class="improve" v-if="active<=3">
                        <div class="selectTitle">请您选择需要改进的问题</div>
                        <el-form-item>
                            <el-checkbox-group v-model="item.aroptschked">
                                <el-checkbox v-for="itemoption in item.options" :key="itemoption.optionId" :label="itemoption.optionId"><div class="optionTextView">{{itemoption.optionComment}}</div></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="otherTitle">您对工程师的其他意见与建议</div>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.otherResult" placeholder="请输入其他想法和建议"></el-input>
                </el-form-item>
                <div style="height:0.1rem"></div>
                <el-form-item class="rateSubmitBtn" >
                    <el-button @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'',
    components:{},
    data(){
        return{
            active: 4,
            formData:{
                optionOption:[],
                // question:[],
                scoreOption:[],
                data:'',
                aroptschked:[],
                otherResult:'',
            },
            evaluateval:[
                // {
                //     options:[
                //         {optionComment:"服务意识差，主动性和责任心不够",checkFlg:0,optionId:1000186,optionSort:1,otherFlg:'0',otherResult:null},
                //         {optionComment:"服务过程中态度不好",checkFlg:0,optionId:1000187,optionSort:2,otherFlg:'0',otherResult:null},
                //         {optionComment:"事前沟通不足",checkFlg:0,optionId:1000188,optionSort:3,otherFlg:'0',otherResult:null},
                //         {optionComment:"实施前准备不足",checkFlg:0,optionId:1000224,optionSort:4,otherFlg:'0',otherResult:null},
                //         {optionComment:"未按照约定时间到场",checkFlg:0,optionId:1000216,optionSort:5,otherFlg:'0',otherResult:null},
                //         {optionComment:"技能不够",checkFlg:0,optionId:1000225,optionSort:6,otherFlg:'0',otherResult:null},
                //         {optionComment:"实施处理效率低",checkFlg:0,optionId:1000226,optionSort:7,otherFlg:'0',otherResult:null},
                //         {optionComment:"工具准备完善",checkFlg:0,optionId:1000227,optionSort:8,otherFlg:'0',otherResult:null},
                //         {optionComment:"未遵守客户机房管理规范",checkFlg:0,optionId:1000228,optionSort:9,otherFlg:'0',otherResult:null},
                //         {optionComment:"设备操作不规范",checkFlg:0,optionId:1000229,optionSort:10,otherFlg:'0',otherResult:null},
                //         {optionComment:"离场沟通与遗留事项未交接",checkFlg:0,optionId:1000230,optionSort:11,otherFlg:'0',otherResult:null},
                //         {optionComment:"实施后的现场未整理（包含设备与线缆复位、包装物和备件整理）",checkFlg:0,optionId:1000231,optionSort:12,otherFlg:'0',otherResult:null},
                //     ],
                //     aroptschked:[],
                //     scoreval:0
                // }
            ],
        }
    },
    created(){
        this.getWorkEvaluateInfo();
    },
    methods:{
        getWorkEvaluateInfo(){
            console.log("22222222222222");
            let jsonres = {
                EVALUATE_ID_RETURN:"1412380",
                SUBMIT_FLG:"1",
                TEMPLATE_TYPE:"2",
                QUESTION:[{
                    optionOption:[
                        {optionComment:"服务意识差，主动性和责任心不够",checkFlg:0,optionId:1000186,optionSort:1,otherFlg:'0',otherResult:null},
                        {optionComment:"服务过程中态度不好",checkFlg:0,optionId:1000187,optionSort:2,otherFlg:'0',otherResult:null},
                        {optionComment:"事前沟通不足",checkFlg:0,optionId:1000188,optionSort:3,otherFlg:'0',otherResult:null},
                        {optionComment:"实施前准备不足",checkFlg:0,optionId:1000224,optionSort:4,otherFlg:'0',otherResult:null},
                        {optionComment:"未按照约定时间到场",checkFlg:0,optionId:1000216,optionSort:5,otherFlg:'0',otherResult:null},
                        {optionComment:"技能不够",checkFlg:0,optionId:1000225,optionSort:6,otherFlg:'0',otherResult:null},
                        {optionComment:"实施处理效率低",checkFlg:0,optionId:1000226,optionSort:7,otherFlg:'0',otherResult:null},
                        {optionComment:"工具准备完善",checkFlg:0,optionId:1000227,optionSort:8,otherFlg:'0',otherResult:null},
                        {optionComment:"未遵守客户机房管理规范",checkFlg:0,optionId:1000228,optionSort:9,otherFlg:'0',otherResult:null},
                        {optionComment:"设备操作不规范",checkFlg:0,optionId:1000229,optionSort:10,otherFlg:'0',otherResult:null},
                        {optionComment:"离场沟通与遗留事项未交接",checkFlg:0,optionId:1000230,optionSort:11,otherFlg:'0',otherResult:null},
                        {optionComment:"实施后的现场未整理（包含设备与线缆复位、包装物和备件整理）",checkFlg:0,optionId:1000231,optionSort:12,otherFlg:'0',otherResult:null},
                    ],
                    questionId:"",
                    scoreOption:[
                        {checkFlg:0,failFlg:"1",optionId:12,optionScore:0,optionSort:0},
                        {checkFlg:0,failFlg:"1",optionId:13,optionScore:1,optionSort:1},
                        {checkFlg:0,failFlg:"1",optionId:14,optionScore:2,optionSort:2},
                        {checkFlg:0,failFlg:"0",optionId:15,optionScore:3,optionSort:3},
                        {checkFlg:0,failFlg:"0",optionId:16,optionScore:4,optionSort:4},
                        {checkFlg:0,failFlg:"0",optionId:17,optionScore:5,optionSort:5},
                    ]}
                ]
            };
            let tmpjsonval =[];
            jsonres.QUESTION.forEach(function(v,i,ar){
            let tmpobj = {};
            tmpobj.question= v;
            tmpobj.options = v.optionOption;
            tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
            tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
            tmpobj.scores = v.scoreOption;
            let index=0;
            tmpobj.scores.forEach(function(v,i,ar){
                if(v.checkFlg==1){
                    index=i+1;
                }
            });
            tmpobj.scoreval=index;
            tmpjsonval.push(tmpobj);
            })
            this.evaluateval = tmpjsonval;
            console.log("evaluateval",this.evaluateval);
        },
        next(score){
            // console.log("score:",score);
            this.active = score;
            // console.log(this.active);
        },
        submitForm(){}
    }
}
</script>
<style scoped>
.rateView{width: 100%}
.rateView >>>.title{font-size: 0.13rem;font-weight: bold;padding-left: 0.1rem}
.rateView >>>.scoreView{font-size: 0.12rem;margin: 0.2rem}
/* .rateView .el-step__title{font-size: 0.12rem;} */
.rateView .editorView{margin: 0 0.2rem}

.rateView .selectTitle{margin: 0.2rem 0rem}
.rateView .otherTitle{margin: 0.2rem;font-size: 0.12rem;font-weight: bold;}
.editorView .el-checkbox+.el-checkbox{margin-left: 0rem;margin-right: 0.1rem}
.editorView .improve span{word-wrap: break-word;word-break: normal;}
.optionTextView{word-wrap:break-word;word-break: break-all;white-space:normal;margin-right:0.2rem}
.rateSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.rateSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;z-index: 1;margin-left: -0.2rem;}
</style>
<style>
.improve .el-form-item__content{line-height: 0.28rem}
.rateView .el-step__line{background-color:#ffffff}
.rateView .el-step__title{font-size: 0.12rem;}
.rateView .el-step__main {text-align: center}
.rateView .el-step__head.is-finish{border-color:#ffffff}
.rateView .is-finish .el-step__line{background:#ffffff}
.rateView .el-step__head.is-process{color:#409EFF}/*当前状态星星变化*/
.rateView .el-step__title.is-process{color:#409EFF}/*当前状态字体变化*/
.rateView .el-step__description.is-process{color:#409EFF}

/* .rateView .el-step__head{text-align: center} */
.rateView .el-step__head{text-align: center}
.rateView i .el-step__line-inner{transition-delay: 0ms; border-width: 0px; width: 100%;}
.rateView .el-step__line{border-color:#ffffff}

</style>