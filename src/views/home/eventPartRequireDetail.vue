<template>
    <div class="eventPartRequireDetailView">
        <header-last :title="eventPartRequireDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="eventPartRequireDetailContent">
            <el-form :model="formData" label-width="1.5rem" ref="formData">
                <el-form-item label="需求单编号：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.demandMainCode" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备件分类：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.partsTypeName" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备型号：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                            v-model="formData.caseDemand.modelName" 
                            :value="formData.caseDemand.modelName"
                            :fetch-suggestions="querySearchMN"
                            placeholder="请输入设备型号" 
                            :trigger-on-focus="false"
                            @select="getModelName">
                        </el-autocomplete>
                    </el-col>    
                </el-form-item>
                <el-form-item label="厂商：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                                v-model="formData.caseDemand.factoryNm" 
                                :value="formData.caseDemand.factoryNm"
                                :fetch-suggestions="querySearchFN"
                                placeholder="请输入厂商" 
                                :trigger-on-focus="false"
                                @select="getFactoryNmName">
                            </el-autocomplete>
                    </el-col>    
                </el-form-item>
                <el-form-item label="设备类型：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                            v-model="formData.caseDemand.equipTypeName" 
                            :value="formData.caseDemand.equipTypeName"
                            :fetch-suggestions="querySearchTN"
                            placeholder="请输入设备类型" 
                            :trigger-on-focus="false"
                            @select="getEquipTypeName">
                        </el-autocomplete>
                    </el-col>    
                </el-form-item>
                <el-form-item label="PN/FRU号：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                            v-model="formData.caseDemand.PN" 
                            :value="formData.caseDemand.partPn"
                            :fetch-suggestions="querySearchPN"
                            placeholder="请输入PN/FRU号" 
                            :trigger-on-focus="false"
                            @select="getPNAuto">
                        </el-autocomplete>
                    </el-col>    
                </el-form-item>
                <el-form-item label="微码：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.wm"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="通用PN：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.commonPn"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="数量：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.num"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备份：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.backupNum"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="相应描述：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.decrible"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="接口类型：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.interfaceType"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="盘架要求：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.rackReq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="软件要求：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.softwareReq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="版本要求：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.versionReq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发货特殊要求：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.caseDemand.specialReq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货方式">
                    <el-col :span="20">
                        <el-select v-model="formData.caseDemand.supplyType" filterable placeholder="请选择供货方式">
                            <el-option v-for="item in supplyType" :label="item.name" :value="item.value" :key="item.sortNo">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货方式">
                    <el-col :span="20">
                        <el-select v-model="formData.caseDemand.outstockPurchaseReason" filterable placeholder="请选择转采岗原因">
                            <el-option v-for="item in supplyReason" :label="item.name" :value="item.value" :key="item.sortNo">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <div style="height:0.5rem"></div>
                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('formData')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:"eventPartRequireDetail",
    components:{
        headerLast
    },
    data(){
        return{
            eventPartRequireDetailTit:'编辑备件需求',
            formData:{
                caseDemand:{}
            },
            deviceSnArray:[],
            factoryNameArray:[],
            deviceTypeArray:[],
            supplyType:[],
            supplyReason:[],
            caseId:this.$route.query.caseId,
            demandMainId:this.$route.query.demandMainId,
            detailId:this.$route.query.demandDetailId
        }
    },
    created(){
        if(this.demandMainId){
            this.getCaseDemand();
        }else{
            this.initCaseDemand();
        }
            this.getSupplyType();
            this.getSupplyReason();
    },
    methods:{
        getSupplyType(){
            fetch.get("?action=getDict&type=NT_SUPPLY_TYPE","").then(res=>{
                console.log(res.data);
                this.supplyType = res.data;
            });
        },
        getSupplyReason(){
            fetch.get("?action=getDict&type=NT_OUTSTOCK_PURCHASE_REASON","").then(res=>{
                console.log(res.data);
                this.supplyReason = res.data;
            });
        },
        getCaseDemand(){
            console.log(this.caseId);
            fetch.get("?action=/secondline/queryCaseDemand&CASE_ID="+this.caseId+"&MAIN_ID="+this.demandMainId+"&DETAIL_ID="+this.detailId).then(res=>{
                console.log("queryCaseDemand",res);
                if(res.STATUSCODE=="1"){
                    this.formData.caseDemand = res.data[0];
                }
            })
        },
        initCaseDemand(){
            fetch.get("?action=/secondline/initCaseDemand&CASE_ID="+this.caseId,'').then(res=>{
                console.log("initCaseDemand",res);
                if(res.STATUSCODE=="1"){
                    this.formData.caseDemand = res.data[0]
                }
            })
        },
        

        getModelName(){
            console.log("caseDemand",this.formData.caseDemand);
            console.log("deviceSnArray",this.deviceSnArray);
            if(this.formData.caseDemand.modelName){
                for(let i=0;i<this.deviceSnArray.length;i++){
                    if(this.deviceSnArray[i].modelName == this.formData.caseDemand.modelName){
                        this.formData.caseDemand.modelId = this.deviceSnArray[i].modelId;
                        this.formData.caseDemand.modelName = this.deviceSnArray[i].modelName;
                        this.formData.caseDemand.factoryId = this.deviceSnArray[i].factoryId;
                        this.formData.caseDemand.factoryNm = this.deviceSnArray[i].factoryNm;
                        this.formData.caseDemand.equipTypeId = this.deviceSnArray[i].equipTypeId;
                        this.formData.caseDemand.equipTypeName = this.deviceSnArray[i].equipTypeName;
                    }
                }
            }
        },

        querySearchMN(queryString, cb) {
            fetch.get("?action=/secondline/queryModelAuto&key="+this.formData.caseDemand.modelName,'').then(res=>{
                 console.log("queryModelAuto",res);
                this.deviceSnArray = res.data;
                if(res.data.length==0){
                    this.formData.caseDemand.modelName = '';
                }
                let modelNameArray = [];
                for(let i=0;i<res.data.length;i++){
                   modelNameArray.push({'modelId':res.data[i].modelId,'modelName':res.data[i].modelName,'value':res.data[i].modelName})
                }
                
                let results = queryString ? modelNameArray.filter(this.createStateFilter(queryString)) : modelNameArray;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
        },

        getFactoryNmName(){
            if(this.formData.caseDemand.factoryNm){
                for(let i=0;i<this.factoryNameArray.length;i++){
                    if(this.factoryNameArray[i].factoryNm == this.formData.caseDemand.factoryNm){
                        this.formData.caseDemand.factoryNm = this.factoryNameArray[i].factoryNm;
                        this.formData.caseDemand.factoryId = this.factoryNameArray[i].factoryId;
                    }
                }
            }
        },
        querySearchFN(queryString, cb) {
            fetch.get("?action=/secondline/queryFactory&key="+this.formData.caseDemand.factoryNm,'').then(res=>{
                 console.log("queryFactory",res);
                 if(res.STATUSCODE=='1'){
                     this.factoryNameArray = res.data;
                    if(res.data.length==0){
                        this.formData.caseDemand.factoryNm = '';
                    }
                    let factoryNmArray = [];
                    for(let i=0;i<res.data.length;i++){
                    factoryNmArray.push({'factoryId':res.data[i].factoryId,'factoryNm':res.data[i].factoryNm,'value':res.data[i].factoryNm})
                    }
                    let results = queryString ? factoryNmArray.filter(this.createStateFilter(queryString)) : factoryNmArray;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                 }
                
            })
        },
        getEquipTypeName(){
            if(this.formData.caseDemand.equipTypeName){
                for(let i=0;i<this.deviceTypeArray.length;i++){
                    if(this.deviceTypeArray[i].equipTypeName == this.formData.caseDemand.equipTypeName){
                        this.formData.caseDemand.equipTypeId = this.deviceTypeArray[i].equipTypeId;
                        this.formData.caseDemand.equipTypeName = this.deviceTypeArray[i].equipTypeName;
                    }
                }
            }
        },
        querySearchTN(queryString, cb) {
            let param = new URLSearchParams;
            param.append("key",this.formData.caseDemand.equipTypeName)
            fetch.post("?action=/secondline/queryModelType",param).then(res=>{
                 if(res.STATUSCODE=='1'){
                     this.deviceTypeArray = res.data;
                    if(res.data.length==0){
                        this.formData.caseDemand.equipTypeName = '';
                    }
                    let deviceTypeArray = [];
                    for(let i=0;i<res.data.length;i++){
                    deviceTypeArray.push({'equipTypeId':res.data[i].equipTypeId,'equipTypeName':res.data[i].equipTypeName,'value':res.data[i].equipTypeName})
                    }
                    let results = queryString ? deviceTypeArray.filter(this.createStateFilter(queryString)) : deviceTypeArray;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                 }
                
            })
        },
        getPNAuto(row){
            console.log(this.PNArray);
            if(this.formData.caseDemand.PN){
                for(let i=0;i<this.PNArray.length;i++){
                    if(this.PNArray[i].partPn == this.formData.caseDemand.PN){
                        this.formData.caseDemand.PN = this.PNArray[i].equipTypeName;
                        this.formData.caseDemand.partPn = this.PNArray[i].partPn;
                        this.formData.caseDemand.partsTypeId = this.PNArray[i].partsTypeId;
                        this.formData.caseDemand.partsTypeName = this.PNArray[i].partsTypeName;
                        this.formData.caseDemand.decrible = this.PNArray[i].partDescribe;
                    }
                }
            }
        },
        querySearchPN(queryString, cb) {
            fetch.get("?action=/secondline/queryPnAuto&key="+this.formData.caseDemand.PN,'').then(res=>{
                 console.log("PN",res);
                 if(res.STATUSCODE=='1'){
                     this.PNArray = res.data;
                    if(res.data.length==0){
                        this.formData.caseDemand.PN = '';
                    }
                    let PNArray = [];
                    for(let i=0;i<res.data.length;i++){
                    PNArray.push({'partPn':res.data[i].partPn,'partDescribe':res.data[i].partDescribe,'value':res.data[i].partPn})
                    }
                    let results = queryString ? PNArray.filter(this.createStateFilter(queryString)) : PNArray;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                 }
                
            })
        },
        createStateFilter(queryString) {
            return (modelName) => {
                return (modelName.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        submitForm (formName) {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(vm.formData.caseDemand);
                    let main = {};
                    let ADD_FLAG = 0;
                    main.caseId = vm.caseId;
                    let detailsObj = {};
                    if(!vm.formData.caseDemand.demandDetailId){
                        ADD_FLAG = 1;
                    }
                    if(!vm.formData.caseDemand.num){
                        vm.$message({
                            message:'请输入数量',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(!vm.formData.caseDemand.supplyType){
                        vm.$message({
                            message:'请输入供货方式',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    if(vm.formData.caseDemand.demandMainId){
                        detailsObj.demandMainId = vm.formData.caseDemand.demandMainId;
                    }else{
                        detailsObj.demandMainId = '';
                    }
                    if(vm.formData.caseDemand.demandDetailId){
                        detailsObj.demandDetailId = vm.formData.caseDemand.demandDetailId;
                    }else{
                        detailsObj.demandDetailId = '';
                    }
                    detailsObj.modelName = vm.formData.caseDemand.modelName;
                    detailsObj.factoryId = vm.formData.caseDemand.factoryId;
                    detailsObj.equipTypeId = vm.formData.caseDemand.equipTypeId;
                    detailsObj.partPn = vm.formData.caseDemand.partPn;
                    detailsObj.partsTypeId = vm.formData.caseDemand.partsTypeId;
                    detailsObj.wm = vm.formData.caseDemand.wm;
                    detailsObj.commonPn = vm.formData.caseDemand.commonPn;
                    detailsObj.num = vm.formData.caseDemand.num;
                    detailsObj.backupNum = vm.formData.caseDemand.backupNum;
                    detailsObj.decrible = vm.formData.caseDemand.decrible;
                    detailsObj.interfaceType = vm.formData.caseDemand.interfaceType;
                    detailsObj.rackReq = vm.formData.caseDemand.rackReq;
                    detailsObj.softwareReq = vm.formData.caseDemand.softwareReq;
                    detailsObj.versionReq = vm.formData.caseDemand.versionReq;
                    detailsObj.specialReq = vm.formData.caseDemand.specialReq;
                    detailsObj.supplyType = vm.formData.caseDemand.supplyType;
                    detailsObj.outstockPurchaseReason = vm.formData.caseDemand.outstockPurchaseReason;
                    var data = new URLSearchParams;
                    data.append('main',JSON.stringify(main));
                    data.append('details',JSON.stringify(detailsObj));
                    data.append('ADD_FLAG',ADD_FLAG);
                    console.log(data);
                    fetch.post("?action=/secondline/saveDemand",data).then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.STATUSCODE=='1'){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                duration:1000,
                                customClass: 'msgdefine'
                            });
                            // vm.getCaseDemand();
                            let nowcaseid = vm.caseId;
                            setTimeout(function(){vm.$router.push({ name: 'eventPartRequireList',query:{caseId:nowcaseid}})},1000);
                        }else{
                            this.$message({
                            message:res.MESSAGE+"发生错误",
                            type: 'error',
                            center: true,
                            customClass: 'msgdefine'
                            });
                        }
                    })
                }else {
                    this.$message({
                        message:"请正确填写",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            })
        }
    }

}
</script>
<style scoped>
.eventPartRequireDetailView{height:100%;overflow: scroll;}
.eventPartRequireDetailContent{width: 100%; margin-top: 0.05rem;bottom: 0.45rem; color: #999999; background: #ffffff;}
.eventPartRequireDetailContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.eventPartRequireDetailContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.eventPartRequireDetailContent >>> .el-input__inner{border: 0.01rem solid #e5e5e5; color: #333333;}
.eventPartRequireDetailContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.eventPartRequireDetailContent >>> .el-form-item:nth-child(2n+1){color: #999999;background: #ffffff;}
.eventPartRequireDetailContent >>> .el-form-item:nth-child(2n){color: #999999;background: #f7f7f7;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>

