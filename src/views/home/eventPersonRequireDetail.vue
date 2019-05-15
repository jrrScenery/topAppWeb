<template>
    <div class="eventPersonRequireDetailView">
        <header-last :title="eventPersonRequireDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="eventPersonRequireDetailContent">
            <el-form :model="formData" label-width="1.5rem" ref="formData">
                <el-form-item label="事件编号：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.caseNo" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="工单编号：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.workNo" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="负责人：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.workManager" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="厂商：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                            v-model="formData.workinfoDetail.factoryNm" 
                            :value="formData.workinfoDetail.factoryNm"
                            :fetch-suggestions="querySearchFN"
                            placeholder="请输入厂商" 
                            :trigger-on-focus="false"
                            @select="getFactoryNmName">
                        </el-autocomplete>
                    </el-col>    
                </el-form-item>
                <el-form-item label="技术方向：">
                    <el-col :span="20">
                        <el-autocomplete class="el-input"
                            v-model="formData.workinfoDetail.equipTypeName" 
                            :value="formData.workinfoDetail.equipTypeName"
                            :fetch-suggestions="querySearchTD"
                            placeholder="请输入技术方向" 
                            :trigger-on-focus="false"
                            @select="getTechDirection">
                        </el-autocomplete>   
                    </el-col>
                </el-form-item>
                <el-form-item label="型号组：">
                    <el-col :span="20">
                        <el-select v-model="formData.workinfoDetail.modelgroupName" filterable placeholder="请选择工作类型">
                            <el-option v-for="item in groupNameArr" :label="item.modelgroupName" :value="item.modelgroupId" :key="item.modelgroupId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="标准任务项：">
                    <el-col :span="20">
                        <el-select v-model="formData.workinfoDetail.abilityId" filterable placeholder="请选择标准任务项">
                            <el-option v-for="item in abilitiesArr" :label="item.abilityContent" :value="item.abilityId" :key="item.abilityId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="工作类型">
                    <el-col :span="20">
                        <el-select v-model="formData.workinfoDetail.workTypeId" filterable placeholder="请选择工作类型">
                            <el-option v-for="item in workTypeArr" :label="item.name" :value="item.value" :key="item.sortNo">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="工作内容要求：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.workRequire"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="标准工作量：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.standardHours" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="调整工作量：">
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.expectWorkHours" @input="changeDate()"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="路途工作量：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.wayWorkload" @input="changeDate()"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="到场SLA截止时间：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.workinfoDetail.expectStart" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="要求到场时间" >
                    <el-col :span="20">
                        <el-date-picker
                            v-model="formData.workinfoDetail.requireArriveTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            style="width:100%"
                            @input="changeDate()">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="预计结束时间" >
                    <el-col :span="20">
                        <div class="block">
                            <el-date-picker
                                v-model="formData.workinfoDetail.expectEnd"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width:100%">
                            </el-date-picker>
                        </div>
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
    name:"eventPersonRequireDetail",
    components:{
        headerLast
    },
    data(){
        return{
            eventPersonRequireDetailTit:"编辑人员需求",
            formData:{
                workinfoDetail:{
                    abilityContent:'',
                    expectEnd:''
                }
            },
            factoryNameArr:[],
            equipTypeArr:[],
            groupNameArr:[],
            abilitiesArr:[],
            workTypeArr:[],
            caseId:this.$route.query.caseId,
            workId:this.$route.query.workId,
        }
    },
    created(){
        if(this.workId){
            this.getWorkinfoList();           
        }else{
            this.getWorkTask();
        }
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
            fetch.get("?action=/secondline/queryWorkinfoList&CASE_ID="+this.caseId+"&WORK_ID="+this.workId).then(res=>{
                console.log("queryWorkinfoList",res);
                if(res.STATUSCODE=="1"){
                    this.formData.workinfoDetail = res.data[0];
                    // if(this.formData.workinfoDetail.expectEnd == null){
                    //     this.formData.workinfoDetail.expectEnd = res.taskinfo.requireArriveTime;
                    // }
                    this.getModelName();
                    this.getAbilityContent();
                }
            })
        },  
        getWorkTask(){
            fetch.get("?action=/secondline/queryWorkTask&CASE_ID="+this.caseId).then(res=>{
                console.log("queryWorkTask",res);
                if(res.STATUSCODE=="1"){
                    this.formData.workinfoDetail = res.taskinfo;
                    this.formData.workinfoDetail.factoryNm = res.taskinfo.factorySn;   
                    this.formData.workinfoDetail.workRequire = '';  
                    this.getModelName();
                    this.getAbilityContent();
                    this.changeDate();
                }
            })
        },
        getFactoryNmName(){
            if(this.formData.workinfoDetail.factoryNm){
                for(let i=0;i<this.factoryNameArr.length;i++){
                    if(this.factoryNameArr[i].factoryNm == this.formData.workinfoDetail.factoryNm){
                        this.formData.workinfoDetail.factoryId = this.factoryNameArr[i].factoryId;
                        this.formData.workinfoDetail.factoryNm = this.factoryNameArr[i].factoryNm;
                    }
                }
            }
        },
        querySearchFN(queryString, cb){
            fetch.get("?action=/secondline/queryFactory&key="+this.formData.workinfoDetail.factoryNm,'').then(res=>{
                 console.log("queryFactory",res);
                 if(res.STATUSCODE=='1'){
                     this.factoryNameArr = res.data;
                    if(res.data.length==0){
                        this.formData.workinfoDetail.factoryNm = '';
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
        getTechDirection(){
            if(this.formData.workinfoDetail.equipTypeName){
                for(let i=0;i<this.equipTypeArr.length;i++){
                    if(this.equipTypeArr[i].equipTypeName == this.formData.workinfoDetail.equipTypeName){
                        this.formData.workinfoDetail.equipTypeId = this.equipTypeArr[i].equipTypeId;
                        this.formData.workinfoDetail.equipTypeName = this.equipTypeArr[i].equipTypeName;
                    }
                }
            }
        },
        querySearchTD(queryString, cb){
            let param = new URLSearchParams;
            param.append("key",this.formData.workinfoDetail.equipTypeName)
            fetch.post("?action=/secondline/queryEquipType",param).then(res=>{
                 console.log("queryEquipType",res);
                 if(res.STATUSCODE=='1'){
                     this.equipTypeArr = res.data;
                    if(res.data.length==0){
                        this.formData.workinfoDetail.equipTypeName = '';
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
        getModelName(){
            fetch.get("?action=/secondline/queryModelGroup&equipTypeId="+this.formData.workinfoDetail.equipTypeId+"&factoryId="+this.formData.workinfoDetail.factoryId).then(res=>{
                console.log("queryModelGroup",res);
                if(res.STATUSCODE=='1'){
                    this.groupNameArr = res.data;
                    if(res.data.length==0){
                        this.formData.workinfoDetail.modelgroupName = '';
                    }else{
                        for(let i=0;i<this.groupNameArr.length;i++){
                            if(this.groupNameArr[i].modelgroupName == this.formData.workinfoDetail.modelgroupName){
                                this.formData.workinfoDetail.modelgroupId = this.groupNameArr[i].modelgroupId;
                                this.formData.workinfoDetail.modelgroupName = this.groupNameArr[i].modelgroupName;                       
                            }
                        }
                    }
                }
            })
        },
        getAbilityContent(){
            let abilityContent = '';
            if(this.formData.workinfoDetail.abilityContent){
                abilityContent = this.formData.workinfoDetail.abilityContent;
            }
            let param = "&equipTypeId="+this.formData.workinfoDetail.equipTypeId+"&factoryId="+this.formData.workinfoDetail.factoryId+"&modelgroupId="+this.formData.workinfoDetail.modelgroupId+"&ablityName="+abilityContent
            console.log("param",param);
            fetch.get("?action=/secondline/queryAbilities"+param).then(res=>{
                console.log("queryAbilities",res);
                if(res.STATUSCODE=='1'){
                    this.abilitiesArr = res.data;
                    if(res.data.length==0){
                        this.formData.workinfoDetail.abilityContent = '';
                    }else{
                        for(let i=0;i<this.abilitiesArr.length;i++){
                            if(this.abilitiesArr[i].abilityId == this.formData.workinfoDetail.abilityId){
                                this.formData.workinfoDetail.abilityId = this.abilitiesArr[i].abilityId;
                                this.formData.workinfoDetail.abilityContent = this.abilitiesArr[i].abilityContent;
                                this.formData.workinfoDetail.standardHours = this.abilitiesArr[i].abilityTime;
                                this.formData.workinfoDetail.difficultyLevel = this.abilitiesArr[i].difficultyLevel;
                                this.formData.workinfoDetail.difficultyRatio = this.abilitiesArr[i].difficultyratio;
                            }
                        }
                    }
                }
            })
        },
        createStateFilter(queryString) {
            return (modelName) => {
                return (modelName.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        changeDate(){
            let vm= this;
            let requireArriveTime = this.formData.workinfoDetail.requireArriveTime;
            if(!requireArriveTime){
                requireArriveTime = this.formData.workinfoDetail.expectStart
            }
            let expectWorkHours = this.formData.workinfoDetail.expectWorkHours;
            let wayWorkload = this.formData.workinfoDetail.wayWorkload;
            if(!expectWorkHours){
                expectWorkHours = 0;
            }
            if(!wayWorkload){
                wayWorkload = 0
            }
            let expectEnd = new Date(requireArriveTime).getTime()+expectWorkHours*60*60*1000+wayWorkload*60*60*1000*0.5;
            let year = new Date(expectEnd).getFullYear();
            let month = new Date(expectEnd).getMonth()+1;
            if(month>=1&&month<=9){
                month = "0"+month
            }
            let date = new Date(expectEnd).getDate();
            if(date<=9){
                date = "0"+date
            }
            let hours = new Date(expectEnd).getHours();
            if(hours<=9){
                hours="0"+hours
            }
            let min = new Date(expectEnd).getMinutes()
            if(min<=9){
                min="0"+min
            }
            let sec = new Date(expectEnd).getSeconds()
            if(sec<=9){
                sec="0"+sec
            }
            vm.formData.workinfoDetail.expectEnd = year +"-"+month+"-"+date+" "+hours+":"+min+":"+sec;
            console.log("requireArriveTime",vm.formData.workinfoDetail.requireArriveTime);
            console.log("000000",vm.formData.workinfoDetail.expectEnd);
        },
        submitForm (formName) {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            console.log("ppppppppp",vm.formData.workinfoDetail);
            this.$refs[formName].validate((valid) => {
                if (valid) {                   
                        if(!vm.formData.workinfoDetail.factoryNm){
                            vm.$message({
                                message:'请输入厂商',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.equipTypeName){
                            vm.$message({
                                message:'请输入技术方向',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.modelgroupName){
                            vm.$message({
                                message:'请输入型号组',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.abilityId){
                            vm.$message({
                                message:'请输入标准任务项',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.workTypeId){
                            vm.$message({
                                message:'请输入工作类型',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.workRequire){
                            vm.$message({
                                message:'请输入工作内容要求',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.formData.workinfoDetail.expectWorkHours){
                            vm.$message({
                                message:'请输入调整工作量',
                                type: 'warning',
                                center: true,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        let dataObj = {};
                        dataObj.workId = vm.formData.workinfoDetail.workId;
                        dataObj.taskId = vm.formData.workinfoDetail.taskId;
                        dataObj.factoryId = vm.formData.workinfoDetail.factoryId;
                        dataObj.workType = vm.formData.workinfoDetail.workTypeId;
                        dataObj.standardHours = vm.formData.workinfoDetail.standardHours;
                        dataObj.expectStart = vm.formData.workinfoDetail.expectStart;
                        dataObj.areaId = vm.formData.workinfoDetail.areaId;
                        // data.areaName = vm.tableData[i].areaName;
                        dataObj.equipTypeId = vm.formData.workinfoDetail.equipTypeId;
                        dataObj.expectWorkHours = vm.formData.workinfoDetail.expectWorkHours;
                        dataObj.requireArriveTime = vm.formData.workinfoDetail.requireArriveTime;
                        dataObj.modelgroupId = vm.formData.workinfoDetail.modelgroupId;
                        dataObj.difficultyLevel = vm.formData.workinfoDetail.difficultyLevel;
                        dataObj.difficultyRatio = vm.formData.workinfoDetail.difficultyRatio;
                        dataObj.expectTravelHours = vm.formData.workinfoDetail.wayWorkload;
                        dataObj.expectEnd = vm.formData.workinfoDetail.expectEnd;
                        dataObj.abilityId = vm.formData.workinfoDetail.abilityId;
                        dataObj.effectiveWorkEquivalent = vm.formData.workinfoDetail.effectiveWorkEquivalent;//空的
                        // data.supportMode = vm.tableData[i].supportMode;//先不传
                        // data.workernm = vm.tableData[i].workernm;//先不传
                        // data.workerId = vm.tableData[i].workerId;
                        dataObj.workRequire = vm.formData.workinfoDetail.workRequire;

                    var data = new URLSearchParams;
                        data.append('workInfo',JSON.stringify(dataObj));
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
                            // vm.getWorkinfoList();
                            let nowcaseid = vm.caseId;
                            setTimeout(function(){vm.$router.push({ name: 'eventPersonRequireList',query:{caseId:nowcaseid}})},1000);
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
    }
}
</script>
<style scoped>
.eventPersonRequireDetailView{height:100%;overflow: scroll;}
.eventPersonRequireDetailContent{width: 100%; margin-top: 0.05rem;bottom: 0.45rem; color: #999999; background: #ffffff;}
.eventPersonRequireDetailContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.eventPersonRequireDetailContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.eventPersonRequireDetailContent >>> .el-input__inner{border: 0.01rem solid #e5e5e5; color: #333333;}
.eventPersonRequireDetailContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.eventPersonRequireDetailContent >>> .el-form-item:nth-child(2n+1){color: #999999;background: #ffffff;}
.eventPersonRequireDetailContent >>> .el-form-item:nth-child(2n){color: #999999;background: #f7f7f7;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>


