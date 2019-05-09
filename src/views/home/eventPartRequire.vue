<template>
    <div class="eventPartRequireView">
        <header-event-risk :title="eventPartRequireTit"></header-event-risk>
        <div style="height: 0.45rem;"></div> 
        <div class="eventPartRequireContent">
            <el-form ref="form" :model="form">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    row-key="id"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="30" v-if="flag"></el-table-column>
                    <el-table-column
                        fixed
                        label="需求单编号"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.demandMainCode" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="备件分类"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.partsTypeName" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="设备型号"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.modelName" 
                                :value="scope.row.modelName"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入型号" 
                                :trigger-on-focus="false"
                                @select="getModelName(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="厂商"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.factoryNm" 
                                :value="scope.row.factoryNm"
                                :fetch-suggestions="querySearchFN"
                                placeholder="请输入厂商" 
                                :trigger-on-focus="false"
                                @select="getFactoryNmName(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="设备类型"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.equipTypeName" 
                                :value="scope.row.equipTypeName"
                                :fetch-suggestions="querySearchTN"
                                placeholder="请输入设备类型" 
                                :trigger-on-focus="false"
                                @select="getEquipTypeName(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="PN/FRU号"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.PN" 
                                :value="scope.row.partPn"
                                :fetch-suggestions="querySearchPN"
                                placeholder="请输入PN/FRU号" 
                                :trigger-on-focus="false"
                                @select="getPNAuto(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="微码"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.wm"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="通用PN"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.commonPn"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="数量"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.num"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="备份"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.backupNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="相应描述"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.decrible"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="接口类型"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.interfaceType"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="盘架要求"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.rackReq"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="软件要求"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.softwareReq"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="版本要求"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.versionReq"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="发货特殊要求"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.specialReq"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="供货方式"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-select v-model="scope.row.supplyType" filterable placeholder="请选择供货方式">
                                <el-option v-for="item in supplyType" :label="item.name" :value="item.value" :key="item.sortNo">
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model="scope.row.supplyTypeName"></el-input> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="转采岗原因"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-select v-model="scope.row.outstockPurchaseReason" filterable placeholder="请选择转采岗原因">
                                <el-option v-for="item in supplyReason" :label="item.name" :value="item.value" :key="item.sortNo">
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model="scope.row.outstockPurchaseReason"></el-input> -->
                        </template>
                    </el-table-column>
                </el-table>

                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('form')">保存</el-button>
                </el-form-item>
                <!-- <div style="margin-bottom:0.3rem;background: #ffffff;" v-for="items in eventPartRequireList" :key="items.id">
                    <el-form-item label="需求单编号:">
                        <el-input v-model="items.requiredId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备件分类:">
                        <el-input v-model="items.requiredType" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号:">
                        <template>
                            <el-select v-model="items.deviceSN" filterable placeholder="请选择设备型号">
                                <el-option v-for="item in deviceSnArray" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="厂商:">
                        <template>
                            <el-select v-model="items.factoryName" filterable placeholder="请选择设备型号">
                                <el-option v-for="item in factoryNameArray" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="设备类型:">
                        <template>
                            <el-select v-model="items.deviceType" filterable placeholder="请选择设备型号">
                                <el-option v-for="item in deviceTypeArray" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="PN/FRU号:">
                        <template>
                            <el-select v-model="items.PN" filterable placeholder="请选择PN/FRU号">
                                <el-option v-for="item in PNArray" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="微码:">
                        <el-input v-model="items.wm"></el-input>
                    </el-form-item>
                    <el-form-item label="通用PN:">
                        <el-input v-model="items.normalPN"></el-input>
                    </el-form-item>
                    <el-form-item label="数量:">
                        <el-input v-model="items.num"></el-input>
                    </el-form-item>
                    <el-form-item label="备份:">
                        <el-input v-model="items.store"></el-input>
                    </el-form-item>
                    <el-form-item label="相应描述:">
                        <el-input v-model="items.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="接口类型:">
                        <el-input v-model="items.apiType"></el-input>
                    </el-form-item>
                    <el-form-item label="盘架要求:">
                        <el-input v-model="items.pjRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="软件要求:">
                        <el-input v-model="items.softRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="版本要求:">
                        <el-input v-model="items.versionRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="发货特殊要求:">
                        <el-input v-model="items.specialRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="供货方式:">
                        <el-input v-model="items.provideWay"></el-input>
                    </el-form-item>
                    <el-form-item label="转采岗原因:">
                        <el-input v-model="items.reason"></el-input>
                    </el-form-item>
                </div> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import headerEventRisk from '../header/headerEventRisk'
import fetch from '../../utils/ajax'
export default {
    name: 'eventPartRequire',

    components: {
        headerEventRisk
    },
    // provide(){
    //     return{
    //         addRow:this.addRow,
    //         deleteRow:this.deleteRow
    //     }
    // },
    data(){
        return{
            eventPartRequireTit:'备件需求',
            form:{
                modelName:"",
                factoryNm:'',
                equipTypeName:"",
                PN:""
            },
            tableData:[],
            eventPartRequireList:[],
            deviceSnArray:[],
            factoryNameArray:[
            ],
            deviceTypeArray:[],
            PNArray:[],
            supplyType:[],
            supplyReason:[],
            multipleSelection:[],
            caseId:this.$route.query.caseId,
            flag:false
        }
    },
    created(){
        this.getCaseDemand();
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
        getModelName(row){
            console.log(this.deviceSnArray);
            if(this.form.modelName){
                for(let i=0;i<this.deviceSnArray.length;i++){
                    if(this.deviceSnArray[i].modelName == this.form.modelName){
                        this.form.modelName = this.deviceSnArray[i].modelName;
                        row.modelId = this.deviceSnArray[i].modelId;
                        row.modelName = this.deviceSnArray[i].modelName;
                        row.factoryId = this.deviceSnArray[i].factoryId;
                        row.factoryNm = this.deviceSnArray[i].factoryNm;
                        row.equipTypeId = this.deviceSnArray[i].equipTypeId;
                        row.equipTypeName = this.deviceSnArray[i].equipTypeName;
                    }
                }
            }
        },
        querySearchAsync(queryString, cb) {
            fetch.get("?action=/secondline/queryModelAuto&key="+this.form.modelName,'').then(res=>{
                 console.log("queryModelAuto",res);
                this.deviceSnArray = res.data;
                if(res.data.length==0){
                    this.form.modelName = '';
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

        getFactoryNmName(row){
            console.log("factoryNm",this.form.factoryNm);
            if(this.form.factoryNm){
                for(let i=0;i<this.factoryNameArray.length;i++){
                    if(this.factoryNameArray[i].factoryNm == this.form.factoryNm){
                        this.form.factoryNm = this.factoryNameArray[i].factoryNm;
                        row.factoryNm = this.factoryNameArray[i].factoryNm;
                        // row.factoryId = this.deviceSnArray[i].factoryId;
                        row.factoryId = this.factoryNameArray[i].factoryId;
                        // this.tableData[row].factoryId = this.factoryNameArray[i].factoryId;
                        // this.tableData[row].factoryNm = this.factoryNameArray[i].factoryNm;
                    }
                }
            }
        },

        querySearchFN(queryString, cb) {
            console.log("factoryNm",this.form.factoryNm);
            fetch.get("?action=/secondline/queryFactory&key="+this.form.factoryNm,'').then(res=>{
                 console.log("queryFactory",res);
                 if(res.STATUSCODE=='1'){
                     this.factoryNameArray = res.data;
                    if(res.data.length==0){
                        this.form.factoryNm = '';
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

        getEquipTypeName(row){
            console.log("equipTypeName",this.form.equipTypeName);
            if(this.form.equipTypeName){
                for(let i=0;i<this.deviceTypeArray.length;i++){
                    if(this.deviceTypeArray[i].equipTypeName == this.form.equipTypeName){
                        this.form.equipTypeName = this.deviceTypeArray[i].equipTypeName;
                        row.equipTypeId = this.deviceTypeArray[i].equipTypeId;
                        row.equipTypeName = this.deviceTypeArray[i].equipTypeName;
                    }
                }
            }
        },

        querySearchTN(queryString, cb) {
            let param = new URLSearchParams;
            param.append("key",this.form.equipTypeName)
            fetch.post("?action=/secondline/queryModelType",param).then(res=>{
                 if(res.STATUSCODE=='1'){
                     this.deviceTypeArray = res.data;
                    if(res.data.length==0){
                        this.form.equipTypeName = '';
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
            if(this.form.PN){
                for(let i=0;i<this.PNArray.length;i++){
                    if(this.PNArray[i].partPn == this.form.PN){
                        this.form.PN = this.PNArray[i].equipTypeName;
                        row.partPn = this.PNArray[i].partPn;
                        row.partsTypeId = this.PNArray[i].partsTypeId;
                        row.partsTypeName = this.PNArray[i].partsTypeName;
                        row.decrible = this.PNArray[i].partDescribe;
                    }
                }
            }
        },
        querySearchPN(queryString, cb) {
            console.log("PN",this.form.PN);
            fetch.get("?action=/secondline/queryPnAuto&key="+this.form.PN,'').then(res=>{
                 console.log("PN",res);
                 if(res.STATUSCODE=='1'){
                     this.PNArray = res.data;
                    if(res.data.length==0){
                        this.form.PN = '';
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
        getCaseDemand(){
            console.log(this.caseId);
            fetch.get("?action=/secondline/queryCaseDemand&CASE_ID="+this.caseId).then(res=>{
                console.log(res);
                if(res.STATUSCODE=="1"){
                    this.tableData = res.data;
                    for(let i=0;i<res.data.length;i++){
                        this.tableData[i].rowNum = i+1;
                    }
                    if(res.data.length!=0){
                        this.flag = true;
                    }
                }
            })
        },
        handleSelectionChange(val) {
            console.log("val",val);
            this.multipleSelection = val;
        },
        addRow(){
            console.log(this.caseId);
            fetch.get("?action=/secondline/initCaseDemand&CASE_ID="+this.caseId,'').then(res=>{
                console.log("initCaseDemand",res);
                let factoryId = res.data[0].factoryId;
                let factoryNm = res.data[0].factoryNm;
                let equipTypeId = res.data[0].equipTypeId;
                let equipTypeName = res.data[0].equipTypeName;
                let modelId = res.data[0].modelId;
                let modelName = res.data[0].modelName;
                let rowNum = this.tableData.length;
                var list = {
                    rowNum:rowNum+1,
                    demandDetailId:'',
                    demandMainCode:"",
                    partsTypeId:"",
                    partsTypeName:"",
                    modelId:modelId,
                    modelName:modelName,
                    factoryNm:factoryNm,
                    factoryId:factoryId,  
                    equipTypeId:equipTypeId,              
                    equipTypeName:equipTypeName,
                    partPn:"",
                    wm:'',
                    commonPn:'',
                    num:'',
                    backupNum:'',
                    decrible:'',
                    interfaceType:'',
                    rackReq:'',
                    softwareReq:'',
                    versionReq:'',
                    specialReq:'',
                    supplyType:"",
                    supplyTypeName:'',
                    outstockPurchaseReason:''
                }
                this.tableData.push(list);
                if(this.tableData.length!=0){
                    this.flag = true
                }
            })
            // console.log(this.tableData);
        },
        deleteRow(){
            let vm= this;
            for (let i = 0; i < this.multipleSelection.length; i++) {
                let val = this.multipleSelection
                // 获取选中行的索引的方法
                // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
                val.forEach((val, index) => {
                    vm.tableData.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            // i 为选中的索引
                            this.tableData.splice(i, 1);
                        }
                    })
                })
            }
            this.$refs.multipleTable.clearSelection();
            for(let j=0;j<vm.tableData.length;j++){
                vm.tableData[j].rowNum = j+1;
            }
            console.log(this.tableData);
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
                    console.log(vm.tableData);
                    let main = {};
                    let ADD_FLAG = 0;
                    main.caseId = vm.caseId;
                    let detailsArr = new Array();
                    for(let i=0;i<vm.tableData.length;i++){
                        let detailsObj = {};
                        if(vm.tableData[i].demandDetailId==""){
                            ADD_FLAG = 1;
                        }
                        if(!vm.tableData[i].num){
                            vm.$message({
                                message:'请输入数量',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].supplyType){
                            vm.$message({
                                message:'请输入供货方式',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        detailsObj.demandMainId = vm.tableData[i].demandMainId;
                        detailsObj.demandDetailId = vm.tableData[i].demandDetailId;
                        detailsObj.modelName = vm.tableData[i].modelName;
                        detailsObj.factoryId = vm.tableData[i].factoryId;
                        detailsObj.equipTypeId = vm.tableData[i].equipTypeId;
                        detailsObj.partPn = vm.tableData[i].partPn;
                        detailsObj.partsTypeId = vm.tableData[i].partsTypeId;
                        detailsObj.commonPn = vm.tableData[i].commonPn;
                        detailsObj.num = vm.tableData[i].num;
                        detailsObj.backupNum = vm.tableData[i].backupNum;
                        detailsObj.decrible = vm.tableData[i].decrible;
                        detailsObj.interfaceType = vm.tableData[i].interfaceType;
                        detailsObj.rackReq = vm.tableData[i].rackReq;
                        detailsObj.softwareReq = vm.tableData[i].softwareReq;
                        detailsObj.versionReq = vm.tableData[i].versionReq;
                        detailsObj.specialReq = vm.tableData[i].specialReq;
                        detailsObj.supplyType = vm.tableData[i].supplyType;
                        detailsObj.outstockPurchaseReason = vm.tableData[i].outstockPurchaseReason;
                        detailsArr.push(detailsObj);
                    }
                    var data = new URLSearchParams;
                    data.append('main',JSON.stringify(main));
                    data.append('details',JSON.stringify(detailsArr));
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
                            vm.getCaseDemand();
                            // vm.tableData = res.data;
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
.eventPartRequireContent{width: 100%;  margin-top: 0.05rem;overflow: scroll}
.eventPartRequireContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.eventPartRequireContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: relative; bottom: 0;}
/* .eventPartRequireContent >>> .el-input__inner{border: none; color: #333333;}
.eventPartRequireContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.eventPartRequireContent >>> .el-input.is-disabled .el-input__inner{background: #ffffff} */
</style>