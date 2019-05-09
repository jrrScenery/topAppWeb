<template>
    <div class="eventPersonRequireView">
        <header-event-risk :title="eventPersonRequireTit"></header-event-risk>
        <div style="height: 0.45rem;"></div>
        <div class="eventPersonRequireContent">
            <el-form ref="form" label-width="1.2rem" :model="form">
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
                        label="工单编号"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.caseNo" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="负责人"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.workManager" disabled></el-input>
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
                        label="技术方向"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.equipTypeName" 
                                :value="scope.row.equipTypeName"
                                :fetch-suggestions="querySearchTD"
                                placeholder="请输入技术方向" 
                                :trigger-on-focus="false"
                                @select="getTechDirection(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="型号组"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.modelgroupName" 
                                :value="scope.row.modelgroupName"
                                :fetch-suggestions="querySearchMN"
                                placeholder="请输入型号组" 
                                :trigger-on-focus="false"
                                @select="getModelName(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标准任务项"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-autocomplete class="el-input"
                                v-model="form.abilityContent" 
                                :value="scope.row.abilityContent"
                                :fetch-suggestions="querySearchAC"
                                placeholder="请输入标准任务项" 
                                :trigger-on-focus="false"
                                @select="getAbilityContent(scope.row)">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="工作类型"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-select v-model="scope.row.workType" filterable placeholder="请选择工作类型">
                                <el-option v-for="item in workTypeArr" :label="item.name" :value="item.value" :key="item.sortNo">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="工作内容要求"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.workRequire"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标准工作量"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.standardHours" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="调整工作量"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.expectWorkHours"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="路途工作量"
                        width="100">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.wayWorkload"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="到场SLA截止时间"
                        width="130">
                        <template slot-scope="scope" v-if="flag">
                            <el-input v-model="scope.row.expectStart" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="要求到场时间"
                        width="180">
                        <template slot-scope="scope" v-if="flag">
                            <el-date-picker
                                v-model="scope.row.requireArriveTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width:98%">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('form')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerEventRisk from '../header/headerEventRisk'
import fetch from '../../utils/ajax'
export default {
    name: 'eventPersonRequire',
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
            eventPersonRequireTit:'人员需求',
            form:{
                factoryId:"",
                factoryNm:'',
                equipTypeId:"",
                equipTypeName:'',
                modelgroupId:'',
                modelgroupName:'',
                abilityId:'',
                abilityContent:""
            },
            tableData:[],
            multipleSelection:[],
            factoryNameArr:[],
            equipTypeArr:[],
            workTypeArr:[],
            groupNameArr:[],
            abilitiesArr:[],
            flag:false,
            caseId:this.$route.query.caseId
        }
    },
    created(){
        this.getWorkinfoList();
        this.getWorkType();
    },
    methods:{       
        getWorkType(){
            fetch.get("?action=getDict&type=NT_WORK_TYPE","").then(res=>{
                console.log(res.data);
                this.workTypeArr = res.data;
            });
        },
        getWorkinfoList(){
            fetch.get("?action=/secondline/queryWorkinfoList&CASE_ID="+this.caseId).then(res=>{
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
        getFactoryNmName(row){
            console.log(row);
            console.log("factoryNm",this.form.factoryNm);
            console.log("factoryNameArr",this.factoryNameArr);
            if(this.form.factoryNm){
                for(let i=0;i<this.factoryNameArr.length;i++){
                    if(this.factoryNameArr[i].factoryNm == this.form.factoryNm){
                        this.form.factoryId = this.factoryNameArr[i].factoryId;
                        this.form.factoryNm = this.factoryNameArr[i].factoryNm;
                        row.factoryNm = this.factoryNameArr[i].factoryNm;
                        row.factoryId = this.factoryNameArr[i].factoryId;
                    }
                }
            }
        },

        querySearchFN(queryString, cb){
            console.log("factoryNm",this.form.factoryNm);
            fetch.get("?action=/secondline/queryFactory&key="+this.form.factoryNm,'').then(res=>{
                 console.log("queryFactory",res);
                 if(res.STATUSCODE=='1'){
                     this.factoryNameArr = res.data;
                    if(res.data.length==0){
                        this.form.factoryNm = '';
                    }
                    let factoryNameArr = [];
                    for(let i=0;i<res.data.length;i++){
                    factoryNameArr.push({'factoryId':res.data[i].factoryId,'factoryNm':res.data[i].factoryNm,'value':res.data[i].factoryNm})
                    }
                    let results = queryString ? factoryNameArr.filter(this.createStateFilter(queryString)) : factoryNameArr;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                 }               
            })
        },

        getTechDirection(row){
            console.log(row);
            console.log("equipTypeName",this.form.equipTypeName);
            if(this.form.equipTypeName){
                for(let i=0;i<this.equipTypeArr.length;i++){
                    if(this.equipTypeArr[i].equipTypeName == this.form.equipTypeName){
                        this.form.equipTypeId = this.equipTypeArr[i].equipTypeId;
                        this.form.equipTypeName = this.equipTypeArr[i].equipTypeName;
                        row.equipTypeName = this.equipTypeArr[i].equipTypeName;
                        row.equipTypeId = this.equipTypeArr[i].equipTypeId;
                    }
                }
            }
        },
        querySearchTD(queryString, cb){
            console.log("equipTypeName",this.form.equipTypeName);
            let param = new URLSearchParams;
            param.append("key",this.form.equipTypeName)
            fetch.post("?action=/secondline/queryEquipType",param).then(res=>{
                 console.log("queryEquipType",res);
                 if(res.STATUSCODE=='1'){
                     this.equipTypeArr = res.data;
                    if(res.data.length==0){
                        this.form.equipTypeName = '';
                    }
                    let equipTypeArr = [];
                    for(let i=0;i<res.data.length;i++){
                    equipTypeArr.push({'equipTypeId':res.data[i].equipTypeId,'equipTypeName':res.data[i].equipTypeName,'value':res.data[i].equipTypeName})
                    }
                    let results = queryString ? equipTypeArr.filter(this.createStateFilter(queryString)) : equipTypeArr;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                 }               
            })
        },

        getModelName(row){
            console.log("modelgroupName",this.form.modelgroupName);
            if(this.form.modelgroupName){
                for(let i=0;i<this.groupNameArr.length;i++){
                    if(this.groupNameArr[i].modelgroupName == this.form.modelgroupName){
                        this.form.modelgroupId = this.groupNameArr[i].modelgroupId;
                        this.form.modelgroupName = this.groupNameArr[i].modelgroupName;
                        row.modelgroupName = this.groupNameArr[i].modelgroupName;
                        row.modelgroupId = this.groupNameArr[i].modelgroupId;
                    }
                }
            }
        },

        querySearchMN(queryString, cb){
            console.log("equipTypeId:",this.form.equipTypeId);
            console.log("factoryId:",this.form.factoryId);
            fetch.get("?action=/secondline/queryModelGroup&equipTypeId="+this.form.equipTypeId+"&factoryId="+this.form.factoryId).then(res=>{
                console.log("queryModelGroup",res);
                if(res.STATUSCODE=='1'){
                    this.groupNameArr = res.data;
                    if(res.data.length==0){
                        this.form.modelgroupName = '';
                    }
                    let groupNameArr = [];
                    for(let i=0;i<res.data.length;i++){
                    groupNameArr.push({'modelgroupId':res.data[i].modelgroupId,'modelgroupName':res.data[i].modelgroupName,'value':res.data[i].modelgroupName})
                    }
                    let results = queryString ? groupNameArr.filter(this.createStateFilter(queryString)) : groupNameArr;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 1000 * Math.random());
                }
            })
        },

        getAbilityContent(row){
            if(this.form.abilityContent){
                for(let i=0;i<this.abilitiesArr.length;i++){
                    if(this.abilitiesArr[i].abilityContent == this.form.abilityContent){
                        this.form.abilityId = this.abilitiesArr[i].abilityId;
                        this.form.abilityContent = this.abilitiesArr[i].abilityContent;
                        row.abilityId = this.abilitiesArr[i].abilityId;
                        row.abilityContent = this.abilitiesArr[i].abilityContent;
                        row.standardHours = this.abilitiesArr[i].abilityTime;
                        row.difficultyLevel = this.abilitiesArr[i].difficultyLevel;
                        row.difficultyRatio = this.abilitiesArr[i].difficultyratio;
                    }
                }
            }
        },

        querySearchAC(queryString, cb){
            let param = "&equipTypeId="+this.form.equipTypeId+"&factoryId="+this.form.factoryId+"&modelgroupId="+this.form.modelgroupId+"&ablityName="+this.form.abilityContent
            console.log(param);
           fetch.get("?action=/secondline/queryAbilities"+param).then(res=>{
                console.log("queryAbilities",res);
                if(res.STATUSCODE=='1'){
                    this.abilitiesArr = res.data;
                    if(res.data.length==0){
                        this.form.abilityContent = '';
                    }
                    let abilitiesArr = [];
                    for(let i=0;i<res.data.length;i++){
                    abilitiesArr.push({'modelgroupId':res.data[i].modelgroupId,'factoryId':res.data[i].factoryId,'equipTypeId':res.data[i].equipTypeId,
                        "abilityId":res.data[i].abilityId,"abilityContent":res.data[i].abilityContent,'value':res.data[i].abilityContent})
                    }
                    let results = queryString ? abilitiesArr.filter(this.createStateFilter(queryString)) : abilitiesArr;
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
                    let dataArr = new Array();
                    console.log("tableData",vm.tableData);
                    for(let i=0;i<vm.tableData.length;i++){                       
                        if(!vm.tableData[i].factoryNm){
                            vm.$message({
                                message:'请输入厂商',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].equipTypeName){
                            vm.$message({
                                message:'请输入技术方向',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].modelgroupName){
                            vm.$message({
                                message:'请输入型号组',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].abilityContent){
                            vm.$message({
                                message:'请输入标准任务项',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].workType){
                            vm.$message({
                                message:'请输入工作类型',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].workRequire){
                            vm.$message({
                                message:'请输入工作内容要求',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].expectWorkHours){
                            vm.$message({
                                message:'请输入调整工作量',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        let data = {};
                        data.workId = vm.tableData[i].workId;
                        data.taskId = vm.tableData[i].taskId;
                        data.factoryId = vm.tableData[i].factoryId;
                        data.workType = vm.tableData[i].workType;
                        data.standardHours = vm.tableData[i].standardHours;
                        data.expectStart = vm.tableData[i].expectStart;
                        data.areaId = vm.tableData[i].areaId;
                        // data.areaName = vm.tableData[i].areaName;
                        data.equipTypeId = vm.tableData[i].equipTypeId;
                        data.expectWorkHours = vm.tableData[i].expectWorkHours;
                        data.requireArriveTime = vm.tableData[i].requireArriveTime;
                        data.modelgroupId = vm.tableData[i].modelgroupId;
                        data.difficultyLevel = vm.tableData[i].difficultyLevel;
                        data.difficultyRatio = vm.tableData[i].difficultyRatio;
                        data.expectTravelHours = vm.tableData[i].wayWorkload;
                        // data.expectEnd = vm.tableData[i].expectEnd;
                        data.abilityId = vm.tableData[i].abilityId;
                        data.effectiveWorkEquivalent = vm.tableData[i].effectiveWorkEquivalent;//空的
                        // data.supportMode = vm.tableData[i].supportMode;//先不传
                        // data.workernm = vm.tableData[i].workernm;//先不传
                        // data.workerId = vm.tableData[i].workerId;
                        data.workRequire = vm.tableData[i].workRequire;
                        dataArr.push(data);
                    }
                    var data = new URLSearchParams;
                        data.append('data',JSON.stringify(dataArr));
                        data.append('CASE_ID',vm.caseId);
                        console.log(data);
                    fetch.post("?action=/secondline/saveTaskWork",data).then(res=>{
                        console.log("saveTaskWork",res);
                        loading.close();
                        if(res.STATUSCODE=='1'){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                duration:1000,
                                customClass: 'msgdefine'
                            });
                            vm.getWorkinfoList();
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
        },

        handleSelectionChange(val) {
            console.log("val",val);
            this.multipleSelection = val;
        },
        addRow(){
            // let factoryNm = "";
            // let equipTypeName = "";
            // let modelgroupName = "";
            fetch.get("?action=/secondline/queryWorkTask&CASE_ID="+this.caseId,'').then(res=>{
                let factoryNm = res.taskinfo.factorySn
                let equipTypeId = res.taskinfo.equipTypeId;
                let equipTypeName = res.taskinfo.equipTypeName;
                let modelgroupName = res.taskinfo.modelgroupName
                let modelgroupId = res.taskinfo.modelgroupId
                console.log("queryWorkTask",res);
                let rowNum = this.tableData.length;
                var list = {
                rowNum:rowNum+1,
                caseNo:"",
                taskId:res.taskinfo.taskId,
                areaId:res.taskinfo.areaId,
                workId:"",
                workManager:'',
                factoryId:res.taskinfo.factoryId,
                factoryNm:factoryNm,
                equipTypeId:equipTypeId,
                equipTypeName:equipTypeName,
                modelgroupId:modelgroupId,
                modelgroupName:modelgroupName,
                abilityContent:'',
                difficultyLevel:'',   
                difficultyRatio:'',            
                workType:'',
                workRequire:'',
                standardHours:'',
                expectWorkHours:'',
                wayWorkload:'',
                expectStart:res.taskinfo.expectStart,
                requireArriveTime:'',
                effectiveWorkEquivalent:''
                }
                this.tableData.push(list);
                if(this.tableData.length!=0){
                    this.flag = true
                }
            })
            console.log(this.tableData);
        },
        deleteRow(){
            let vm= this;
            console.log("deleteRow",this.multipleSelection);
            console.log("deleteRow",this.tableData);
            for (let i = 0; i < this.multipleSelection.length; i++) {
                let val = this.multipleSelection
                // 获取选中行的索引的方法
                // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
                val.forEach((val, index) => {
                    vm.tableData.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            // i 为选中的索引
                            this.tableData.splice(i, 1)
                        }
                    })
                })
            }
            this.$refs.multipleTable.clearSelection();
            for(let j=0;j<vm.tableData.length;j++){
                vm.tableData[j].rowNum = j+1;
            }
        },
    }
}
</script>


<style scoped>
.eventPersonRequireContent{width: 100%;  margin-top: 0.05rem;overflow: scroll}
.eventPersonRequireContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.eventPersonRequireContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
/* .eventPersonRequireContent >>> .el-autocomplete{width:2rem} */
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: relative; bottom: 0;}
</style>

