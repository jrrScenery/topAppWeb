<template>
    <div class="sparePartsSortOutSelectView">
        <header-base-eight :title="sparePartsSortOutTit"></header-base-eight>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="SelectListCell">
                <el-form ref="form" :model="form" style="display:flex" v-if="onceFlg==='1'">
                        <input type="hidden" v-model ="form.docId">
                        <el-form-item class="takephbox" style="padding-left:10px;">
                            <el-button data-id='bj' type="success" size="mini" style="margin-top:10px;" @click="takePhoto($event)">上传备件到场照片</el-button>
                            <div class="imgout">
                                <img data-id="bj" :src="uploadres" ref="showpic" >
                            </div>                   
                        </el-form-item>
                        <input type="hidden" v-model ="form.docId1">
                        <el-form-item class="takephbox" style="padding-left:10px;">
                            <el-button data-id='kd' type="success" size="mini" style="margin-top:10px;"  @click="takePhoto($event)">上传快递单照片</el-button>
                            <div class="imgout">
                                <img data-id="kd" :src="uploadres" ref="showpic1" >
                            </div>                   
                        </el-form-item>
                </el-form>

                <div class="sortAttentionDiv">特别注意：请对以下供货件进行整理</div>
            <el-table :data="sparePartsSortOutSelectArr" style="width: 100%">
                
                <el-table-column prop="date" label="修改" width="8%">
                    <template slot-scope="scope">
                    <div class="contentPopover">
                        <el-popover placement="bottom" width="340" trigger="click">
                        
                            <el-button @click="ifChoiseUsed(scope.row)" slot="reference" class="el-icon-edit-outline"></el-button>
                            <div class="contentParts">
                                <el-form label-width="1rem">
                                    <el-form-item label="备件来源">
                                        <el-radio-group v-model="scope.row.partsSource" disabled>
                                            <el-radio label="1">供货件</el-radio>
                                            <el-radio label="2">换下件</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="PN/FRU">
                                        <el-input v-model="scope.row.pnFru" placeholder="请输入PN/FRU" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备型号">                                    
                                        <el-autocomplete class="el-input"
                                            v-model="scope.row.modelName" 
                                            :value="scope.row.modelName"
                                            :fetch-suggestions="querySearchModel"
                                            placeholder="请输入型号" 
                                            :trigger-on-focus="false"
                                            @select="getModelName(scope.row.modelName)">
                                        </el-autocomplete>
                                        <!-- <el-input v-model="scope.row.modelName" placeholder="请输入设备型号" class="bInput"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="序列号">
                                        <el-input v-model="scope.row.sn" placeholder="请输入序列号" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备件类型">
                                        <el-select v-model="scope.row.typeName" placeholder="请选择备件类型" clearable>
                                            <el-option v-for="itemParts in partsTypeList" :label="itemParts.partsTypeName" :value="itemParts.partsTypeId" :key="itemParts.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否有包装">
                                        <el-radio-group v-model="scope.row.ifPackage">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="是否已带走">
                                        <el-radio-group v-model="scope.row.ifTakeaway">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="使用情况">
                                        <el-select v-model="scope.row.useStatus" placeholder="选择使用情况" @change="ifChoiseUsed(scope.row)" clearable>
                                            <el-option v-for="use in useStatusList" :label="use.useStatusName" :value="use.useStatusId" :key="use.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="换下件SN" v-show="isShow">
                                        <el-input placeholder="请输入换下件SN" v-model="scope.row.takeDownSN" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="能否回收">
                                        <el-radio-group v-model="scope.row.isRecycle">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                            <el-radio label="3">暂缓</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="回收件说明">
                                        <el-input placeholder="请输入回收件说明" v-model="scope.row.useStatusRemark" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="物流信息">
                                        <el-form-item label="物流公司">
                                        <p style="color: green; height: 30px">{{scope.row.deliveryInfo}}</p>
                                        </el-form-item>
                                        <el-form-item label="物流单号">
                                        <p style="color: green; height: 30px">{{scope.row.transcode}}</p>
                                        </el-form-item>
                                    </el-form-item>

                                    <el-form-item class="submitBtnSpare">
                                        <el-button type="primary" @click="onSubmit(scope.row)">提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
        
                        </el-popover>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="ifArrangeName" label="已整理" width="12%"></el-table-column>
                <el-table-column prop="dealStatus" label="处理状态" width="14%"></el-table-column>
                <el-table-column prop="partsSourceName" label="来源" width="14%"></el-table-column>
                <el-table-column prop="pnFru" label="PN/FRU" width="18%"></el-table-column>
                <el-table-column prop="typeName" label="备件类型" width="14%"></el-table-column>
                <el-table-column prop="sn" label="SN" width="20%"></el-table-column>
                        

            </el-table>
            </div>

            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>

        <!-- 请先完成结果反馈再进行离场feedbackVisible -->
        <div class="dialogdc">
            <el-dialog
                title="提示"
                :visible.sync="isDcFeedBack"
                :show-close="false"
                width="80%"
                center>
                <el-form>
                <div style="margin:0.2rem">
                    <span>请先完成到场反馈再进行备件整理</span>
                </div>
                <el-form-item class="submit">
                    <el-button type="primary" class="onsubmit" @click="isDcFeedBack = false" >确 定</el-button>
                    <!-- <el-button type="primary" class="onsubmit" @click="confirm()">确 定</el-button> -->
                </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBaseEight from '../header/headerBaseEight'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'sparePartsSortOut',
    components: {
        headerBaseEight,
        loadingtmp
    }, 
    data(){
        return{
            form:{
                docId:'',
                docId1:''
            },
            uploadres:require('../../assets/images/takephoto.png'),
            isShow: false,
            partsTypeList: [],
            sparePartsSortOutTit:"事件备件列表",
            caseId:this.$route.query.caseId,
            workId:this.$route.query.workId,
            onceFlg:this.$route.query.onceFlg,
            searchData:[],
            sparePartsSortOutSelectArr:[],
            slaFeedBack:'',
            isDcFeedBack:false,//未点击到场反馈时备件整理弹框
            modelOptions:[],//设备型号
            loading: false,
            busy:false,
            loadall: false,
            isSearch:false,
            searchData:{
                caseLevel:[]
            },
            radioParts: "",
            useStatus: "",
            useStatusList: [
                {"useStatusName": "已使用件", "useStatusId": "1"},
                {"useStatusName": "未使用件", "useStatusId": "2"},
                {"useStatusName": "坏件", "useStatusId": "3"},
                // {"useStatusName": "DOA不可用", "useStatusId": "4"},
                {"useStatusName": "未到场", "useStatusId": "5"},
            ],
            buttonType:''
        };
    },
    mounted(){
        window.photoResult = this.getPhotoUrl;
    },
    methods:{
        getModelName(modelName){
            if(modelName){
                for(let i=0;i<this.modelArray.length;i++){
                    if(this.modelArray[i].modelName == modelName){
                        modelName = this.modelArray[i].modelName;
                    }
                } 
            }
        },
        querySearchModel(queryString,cb) {
            fetch.get("?action=/parts/queryModelName&MODELNAME="+queryString,'').then(res=>{
                console.log("queryModelName",res);
                this.modelArray = res.data;
                let modelArray = [];
                for(let i=0;i<res.data.length;i++){
                   modelArray.push({'modelId':res.data[i].modelId,'factoryId':res.data[i].factoryId,'value':res.data[i].modelName})
                }               
                let results = queryString ? modelArray.filter(this.createStateFilter(queryString)) : modelArray;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
        },
        createStateFilter(queryString) {
            return (devId) => {
                return (devId.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        getSparePart(){
            console.log(this.workId);
            fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId+"&WORK_ID="+this.workId, {}).then(res=>{
                this.sparePartsSortOutSelectArr = res.DATA;
                console.log("GetCasePartsInfo",res.DATA);
                if(res.flag.length!=0){
                    console.log("00000000");
                    this.slaFeedBack = res.flag[0].STATUS;
                }
                console.log("spare", res)
                this.busy = false;
                this.loadall = true;

            });
            fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
                console.log("GetPartsTypeList",res.DATA);
                this.partsTypeList = res.DATA;
            });
        },

        showMsg (msg){
            this.$message(msg);
        },
        changePartsParams (formUpdateParts){
            let changeParts = {};
            changeParts.PARTS_ID = formUpdateParts.partsId;
            changeParts.PARTS_SOURCE = formUpdateParts.partsSource;
            changeParts.PN_FRU = formUpdateParts.pnFru;
            changeParts.SN = formUpdateParts.sn;
            changeParts.MODEL_NAME = formUpdateParts.modelName;
            changeParts.TYPE = formUpdateParts.type;
            changeParts.USE_STATUS = formUpdateParts.useStatus;
            changeParts.USE_STATUS_REMARK = formUpdateParts.useStatusRemark;
            changeParts.IF_PACKAGE = formUpdateParts.ifPackage;
            changeParts.IF_TAKEAWAY = formUpdateParts.ifTakeaway;
            changeParts.IS_RECYCLE = formUpdateParts.isRecycle;
            changeParts.CASE_ID = this.$route.query.caseId;
            return changeParts;
        },

        supplyPartsParams (){
            
        },

        takeDownParts(formUpdateParts) {
            let takedown = {};
            takedown.PARTS_ID = "";
            takedown.PARTS_SOURCE = 2;
            takedown.SN = formUpdateParts.takeDownSN;
            takedown.IS_RECYCLE = 1;
            takedown.USE_STATUS_REMARK = "";
            takedown.MODEL_NAME = formUpdateParts.modelName;
            takedown.COMEFROM_SN = formUpdateParts.sn;
            takedown.COMEFROM_PARTS_ID = formUpdateParts.partsId;
            takedown.CASE_ID = formUpdateParts.caseId;
            takedown.PN_FRU = formUpdateParts.pnFru;
            takedown.TYPE = formUpdateParts.type;
            takedown.IF_PACKAGE = formUpdateParts.ifPackage;
            takedown.IF_TAKEAWAY = formUpdateParts.ifTakeaway;
            return takedown;
        },
        
        ifOperation (formUpdateParts) {
            if (formUpdateParts.ifPackage==null) {
                this.warning("请选择是否包装")
                return;
            };
            if (formUpdateParts.ifTakeaway==null) {
                this.warning("请选择是否带走")
                return;
            };
            if (formUpdateParts.useStatus==null) {
                this.warning("请确认选择使用情况")
                return;
            };
            if (formUpdateParts.isRecycle==null) {
                this.warning("请选择是否回收")
                return;
            };
            return true;
        },

        onArray (formUpdateParts){
            let params = {};
            let array = new Array;
            let list = [];
            let params_dict = {};
            let ifJudge = this.ifOperation(formUpdateParts);
            console.log(formUpdateParts)
            if (ifJudge==true){
                console.log("wewewe", formUpdateParts.takeDownSN);
                if (formUpdateParts.takeDownSN!=undefined&&formUpdateParts.partsSource=="1"&&formUpdateParts.useStatus=="1") {
                    let chageArray = this.changePartsParams(formUpdateParts);
                    let takeArray = this.takeDownParts(formUpdateParts);
                    array.push(chageArray);
                    array.push(takeArray);
                }
                else if (formUpdateParts.takeDownSN==undefined&&formUpdateParts.partsSource=="1"&&formUpdateParts.useStatus=="1") {
                    array = "";
                }
                else if (formUpdateParts.takeDownSN==undefined&&formUpdateParts.partsSource=="2") {
                    let chageArray = this.changePartsParams(formUpdateParts)
                    array.push(chageArray);
                }
                else{
                    let chageArray = this.changePartsParams(formUpdateParts)
                    array.push(chageArray);
                }
                array = JSON.stringify(array);
                params.DATA = array;
                params.UPDATE_DATE = this.getCurrentTime();
                params.CASE_ID = this.caseId;
                return params
            }
            array = "judge_no";
            array = JSON.stringify(array);
            params=array;
            return params
        },
        
        warning (msg){
            this.$message({
                message: msg,
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
        },
         
        onSubmit (formUpdateParts) {
            let params = this.onArray(formUpdateParts);
            let params_DATA = JSON.parse(params.DATA);
            console.log("params_DATA:",params_DATA);
            if (params_DATA=="judge_no") {
                console.log(params_DATA);
            }else if(this.slaFeedBack!='1'){
                this.isDcFeedBack = true;
                return false;
            }
            else{
                const loading = this.$loading({
                    lock: true,
                    text: '提交中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.3)'
                });
                if (params_DATA.length==0&&params_DATA=="") {
                    loading.close();
                    this.$message({
                        message:'请输入：换下件SN',
                        type: 'warning',
                        center: true,
                        customClass:'msgdefine'
                    });
                    this.isShow = true;
                }else{
                    console.log("params",params);
                    fetch.questionPost("?action=/parts/updatePartsGathering", params).then(res=>{
                        console.log("updatePartsGathering", res)
                        loading.close();
                        if(res.STATUSCODE=="0"){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                            });
                         
                            fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId, {}).then(res=>{
                                console.log("GetCasePartsInfo",res)
                                this.sparePartsSortOutSelectArr = res.DATA;
                                this.busy = false;
                                this.loadall = true;
        
                            });
                            this.isShow = false;
        
                        }else{
                            this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                            });
                        }
                    });
    
                }
            }
        },

        loadMore(){
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getSparePart();
            }, 500);
        },

        getCurrentTime () {
            let month = new Date().getMonth() + 1;
            let currentTime = (new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());

            return currentTime
        },

        ifChoiseUsed (choiseForm){
            if (choiseForm.useStatus=="1"&&choiseForm.partsSource=="1"){
                this.isShow = true;
            }
            else{
                this.isShow = false;
            }
        },
        takePhoto:function(event){
            event = (event||window.event);
            console.log("event",event);
            let target = (event.target || event.srcElement);
            this.buttonType = target.innerText;
            console.log(target.innerText);
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
        getPhotoUrl: function(photodata){
            let loading = this.$loading({
                lock: true,
                text: '上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            var data=new FormData();
            data.append("FILETYPE","jpg");
            data.append("FILE", photodata);
            data.append("caseId",this.caseId);
            data.append("workId",this.workId);
            if(this.buttonType === '上传备件到场照片'){
                data.append("type","1");
            }else{
                data.append("type","2");
            }
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            fetch.post("?action=uploadPartsPic",data,config).then(res=>{
                console.log("upload",res)
                if(res['STATUSCODE'] == '0'){
                    if(this.buttonType === '上传备件到场照片'){
                        this.form.docId= res.data.docId;
                        this.$refs.showpic.src = photodata;
                    }else{
                        this.form.docId1= res.data.docId;
                        this.$refs.showpic1.src = photodata;
                    }
                }
                else{
                    this.$toast(res.MESSAGE);
                }
                loading.close();
            });
        },
    },
    beforeDestroy(){
        window.photoResult = null;
    },
    created(){
        this.getSparePart();
    },
}
</script>


<style scoped>
.sparePartsSortOutSelectView{width: 100%}
.sparePartsSortOutSelectView >>>.sortAttentionDiv{padding: 0.1rem;color: red;display: flex;justify-content: center}
.content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;margin-top: 0.05rem; overflow: scroll;}
.SelectListCell{background: #ffffff}
.SelectListCell >>> .el-radio__label{font-size: 0px}
.SelectListCell >>> .el-table__body{width: 100%!important}
.SelectListCell >>> .el-table__header{width: 100%!important}
.SelectListCell >>> .el-table{font-size: 0.13rem; text-align: center}
.SelectListCell >>> .el-table th{text-align: center; background: #f7f7f7}
.SelectListCell >>> .el-table td{border: none}
.SelectListCell >>> .el-table td:nth-child(3){text-align: right;}
.SelectListCell >>> .el-table td:nth-child(5){text-align: right; padding-right: 0.05rem}
.SelectListCell >>> .el-table .cell{padding: 0;}
.SelectListCell >>> .el-table__empty-block{position: initial}
.content:nth-child(2n+1){background: #fafafa}
.content >>> .el-col {border-radius: 4px;}
.content >>> .bg-purple-dark {background: #99a9bf;}
.content >>> .bg-purple {background: #d3dce6;}
.content >>> .bg-purple-light {background: #e5e9f2;}
.content >>> .grid-content {border-radius: 4px;min-height: 24px; text-align: center; line-height: 2}
.content >>> .row-bg {padding: 10px 0;background-color: #f9fafc;}
.content >>> .el-message-box{width: 70%}

  /* .content{margin-top: 0.05rem;background: #ffffff;} */
.contentParts{height:500px;width:340px;overflow:scroll}
.contentParts >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.contentParts >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
/* .contentParts >>> .el-form-item__content{height: 30px;} */

/* .contentParts >>> .el-input{height: 30px;} */
.contentParts >>> .el-input__inner{border: none; color: #333333; padding: 0px 0px; position: relative;}

/* .contentParts >>> .el-input__icon{line-height: 30px} */
.contentParts >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.contentParts >>> .el-input.is-disabled .el-input__inner{background: #ffffff}

.contentPopover >>> .el-button{padding: 0px 0px}
.contentPopover >>> .el-icon-edit-outline:before{color: green}

.submitBtnSpare >>> .el-form-item__content{margin: 0!important;}
.submitBtnSpare >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;}

.dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
.takephbox{ padding-left: 10px;}
.takephbox .imgout{ border:1px solid #ccc; width: 0.8rem; height: 0.8rem; margin-top: 10px;; padding: 1px; text-align: center;}
.takephbox .imgout img{ height: 0.7rem; width: auto; margin: 0 auto; max-width: 0.8rem;}
</style>