<template>
    <div class="customerEditRateView">    
        <div class="serviceInfoCell">
            <div class="content">
                <el-form :model="formData" ref="formData">
                    <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                        <el-form-item>
                            <div class="star">
                                <span class="starTit">{{i+1}}.{{item.question.questionComment}}</span>
                                <el-rate
                                        v-model="item.scoreval">
                                </el-rate>
                            </div>
                        </el-form-item>
                        <div class="improve" v-if="item.scoreval<4">
                            <span>{{item.question.questionComment2}}</span>
                            <div class="improveCell">
                                <el-form-item>
                                    <el-checkbox-group v-model="item.aroptschked">
                                        <el-checkbox v-for="itemoption in item.options" :label="itemoption.optionId" :key="itemoption.optionId">{{itemoption.optionComment}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div>客户签名</div>
                    <div v-if="formData.data.imgStr">
                        <img style="height:1.5rem;" v-bind:src="formData.data.imgStr" alt="">
                    </div>
                    <div v-else><img style="height:0.5rem;" src="" alt=""></div>
                    <add-signature :title="addSignatureTit" :queryData="searchData" @searchPro="signature"></add-signature>
                    <ul class="signature">
                        <el-form-item label="工程师">
                            <div>{{formData.data.enginnername}}</div>
                        </el-form-item>
                    </ul>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="submitBtn">
                        <el-button @click="submitForm('formData')">提交</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
import addSignature from '../../components/addSignature'
export default {
    name:'customerEditRate',
    components:{
        addSignature
    },
    data(){
        return{
            addSignatureTit:'添加签名',
            searchData:[],
            formData:{
                optionOption:[],
                question:[],
                scoreOption:[],
                data:''
            },
            score:[],
            evaluateval:[],
            activeName:'third',
            evaluateId:this.$route.query.evaluateId,
        }
    },
    created:function(){
        let vm= this;
        fetch.get("?action=/work/GetClientReview&evaluateId="+this.evaluateId).then(res=>{
            console.log(res);
            if("0" == res.STATUSCODE){
                let jsonres= res;
                this.formData.data = res.DATA[0];
                let tmpjsonval =[];
                jsonres.question.forEach(function(v,i,ar){
                let tmpobj = {};
                tmpobj.question= v;
                tmpobj.options = jsonres.optionOption.filter(function(item){return v.questionId == item.questionId})
                tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
                tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
                tmpobj.scores = jsonres.scoreOption.filter(function(item){return v.questionId == item.questionId});
                tmpobj.scoreval = vm.getScore(tmpobj.scores);
                // tmpobj.data = res.DATA[0];
                tmpjsonval.push(tmpobj);
                // tmpjsonval.push(data);
                })
                console.log(tmpjsonval);
                this.evaluateval = tmpjsonval;
                console.log(this.evaluateval);
            }

        })
    },
    methods:{       
        signature(imgStr){
            this.formData.data.imgStr = imgStr;
        },
        getScore(scores){
            var score = 0;
            scores.forEach(function(v,i,ar){
                if(v.checkFlg==1){
                    if(score<v.optionScore)
					score = v.optionScore;
                }
            })
            return score;
        },
        submitForm(formName){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    let detailArray = new Array();
                    var totalScore = 0;
                    var failFlg = 0;
                    var countScore = 0;
                    var returnFlg = 0;
                    this.evaluateval.forEach(function(v,i,ar){
                        if(v.scoreval>0){
                            totalScore+=v.scoreval;
                            countScore += 1;
                            if(v.scoreval<3) failFlg = 1;
                            this.evaluateval.scores.forEach(function(item,i,ar){
                                if(item.optionScore = v.scoreval){
                                    let scoreOptionId = item.optionId;
                                    var temp1 = {};
                                    temp1.evaluateId=vm.evaluateId;
                                    temp1.questionId=item.questionId;
                                    temp1.optionId=scoreOptionId;
                                    detailArray.push(temp1);	
                                }
                            })
                           
                        }else{
                            returnFlg = 1;
                            this.$message({
                                message:'请给相关项打分',
                                type: 'success',
                                center: true,
                                customClass:'msgdefine'
                            });
                            return false;
                        }

                        this.evaluateval.options.forEach(function(item,i,ar){
                            
                        })
                    })
                }
            })

        }
    }

    
}
</script>

<style scoped>
.customerEditRateView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.1rem}
.serviceInfoCell{white-space:normal}
.serviceInfoCell .serviceInfoTit{position: relative; line-height: 0.05rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.serviceInfoCell .serviceInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.1rem; content: ''; background: #2698d6;}
.serviceInfoCell .serviceInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{background: #ffffff; color: #999999; padding: 0.1rem 0.2rem 0.15rem;}

.editorView .star{display: flex;}
.editorView .star .starTit{ display: inline-block; width: 1.5rem;font-size: 0.14rem}
.editorView .improve span{line-height: 0.05rem;font-size: 0.13rem}
.editorView .improve >>> .el-checkbox{display: block; margin: 0; font-size: 0.13rem; color: #999999;}

.improveCell span{ color: #666;word-wrap: break-word}
.el-checkbox__input.is-disabled+span.el-checkbox__label{color: #666!important;}

.signature .el-form-item{overflow: hidden;zoom:1; margin: 0; color: #2698d6; border-top: 0.01rem solid #e1e1e1;border-bottom: 0.01rem solid #e1e1e1}
.signature .el-form-item div{color: #333333; margin-left: 0.6rem;}
.signature .el-form-item .sign{ }
.signature .el-form-item .sign img{width: 100%; display: block; flex-grow: 1;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>


