<template>
    <div class="processRecordView">
        <header-last :title="processRecordTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content">
            <ul>
                <li v-for="item in processRecordData" :key="item.id"><span>{{item.type}}</span>{{item.desc}}</li>
            </ul>
            <el-form ref="form" :model="form"> 
                <el-form-item class="text">
                    <el-input type="textarea" v-model="form.desc" placeholder="补充说明"></el-input>
                </el-form-item>
                <input type="hidden" v-model ="form.docId"><el-form-item class="takephbox" style="padding-left:10px;">
                    <el-button type="success" style="margin-top:10px;"  @click="takePhoto">上传照片</el-button>
                <div class="imgout">
                    <img id="showpic" :src="uploadres" ref="showpic" >
                </div>
                </el-form-item>
                <el-form-item class="submitBtn">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name: 'processRecord',
    components: {
        headerLast
    },
    data(){
        return{
            processRecordTit:"过程记录",
            processRecordData: [
                {type: '项目编号：', desc: ''},
                {type: '项目名称：', desc: ''},
                {type: '事件编号：', desc: ''}
            ],
            form:{
                desc: '',
                docId:''
            },
            uploadres:require('../../assets/images/takephoto.png'),
            caseId: this.$route.query.caseId
        }
    },
    mounted(){
        var vm = this;
        window.afun = () =>{ console.log(111)}
        window.photoResult = this.getPhotoUrl;
    },
    created:function(){
        console.log(this.caseId);
        fetch.get("?action=/secondline/getProjectInfoByCaseId&CASE_ID="+this.caseId,{}).then(res=>{
            console.log(res);
            if(res.STATUSCODE=='1'){
                var baseInfo = res.DATA;
                this.processRecordData[0].desc = baseInfo[0].PROJECT_CODE ;
                this.processRecordData[1].desc = baseInfo[0].PROJECT_NAME ;
                this.processRecordData[2].desc = baseInfo[0].CASE_CD ;
            }
        });
    },
    methods:{
        onSubmit () {
            const loading = this.$loading({ //const定义一个只读的常量，一旦定义，常量的值就不能改变
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            var vm = this;
            let temp = {};
            temp.logSource = 2;
            temp.caseId = vm.caseId;
            temp.dealId = "";
            temp.remark = vm.form.desc;
            temp.docId = vm.form.docId;
            var data = new URLSearchParams;
            data.append('data',JSON.stringify(temp));
            fetch.post("?action=/secondline/insertCaseProcess",data,"").then(res=>{
                console.log("res",res);
                loading.close();
                if(res.STATUSCODE=="1"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass:'msgdefine'
                    });
                    console.log("this.caseId:"+this.caseId);
                    var nowcaseid = vm.caseId;
                    setTimeout(function(){vm.$router.push({ name: 'eventShow',query:{caseId:nowcaseid}})},1000);
                }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        customClass:'msgdefine'
                    });
                }
            }).catch(function(res){
                this.$message({
                message:res.MESSAGE,
                type: 'error',
                center: true,
                    customClass:'msgdefine'
                });
            })
        },
        takePhoto:function(){
            let ua = navigator.userAgent.toLowerCase();
            console.log(ua);
            if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
                var info={action:"takePhoto"}
                window.webkit.messageHandlers.ioshandle.postMessage({body: info});
            }else if(/(Android)/i.test(ua) && /mobile/i.test(ua)){
                var value = "{action:takePhoto}";
                android.getClient(value);
            }
        },
    },
    getPhotoUrl: function(photodata){
      let loading = this.$loading({
        lock: true,
        text: '上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var data=new FormData();
      data.append("FILETYPE","jpg")
      data.append("FILE",'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==')
      data.append("FILE", photodata);
      fetch.post("?action=upload",data).then(res=>{
          console.log("111111111111");
        console.log(res)
        if(res['STATUSCODE'] == '0'){
          this.form.docId= res.data.docId
          this.$refs.showpic.src = photodata;
          // this.$toast(this.form.docId);
        }
        else{
          this.$toast(res.MESSAGE);
        }
        loading.close();
      });
    //   fetch.post("?action=upload",data).then(res=>{
    //     console.log(res)
    //     if(res['STATUSCODE'] == '0'){
    //       this.form.docId= res.data.docId
    //       this.$refs.showpic.src = photodata;
    //       // this.$toast(this.form.docId);
    //     }
    //     else{
    //       this.$toast(res.MESSAGE);
    //     }
    //     loading.close();
    //   });
    },
    beforeDestroy(){
        window.photoResult = null;
    }
}
</script>
<style scoped>
.content{margin-top: 0.05rem; background: #fafafa; position: relative;}
.content ul{padding: 0.1rem 0.25rem; color: #333333;}
.content li{line-height: 0.17rem;}
.text{margin: 0!important;}
.text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1.8rem!important; color: #333333;}
.text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
.takePhoto{position: absolute; bottom: 0rem; left: 0.15rem; width: 0.5rem; height: 0.5rem;}
.takePhoto img{width: 0.3rem; height: 0.3rem; margin: 0.1rem 0 0 0.1rem;}
.takephbox{ padding-left: 10px;}
.takephbox .imgout{ border:1px solid #ccc; width: 124px; height: 124px; margin-top: 10px;; padding: 1px; text-align: center;}
.takephbox .imgout img{ height: 120px; width: auto; margin: 0 auto; max-width: 120px;}
</style>

