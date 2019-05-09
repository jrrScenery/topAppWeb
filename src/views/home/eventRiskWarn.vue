<template>
    <div class="eventRiskWarnView">
        <header-event-risk :title="eventRiskWarnTit"></header-event-risk>
        <div style="height: 0.45rem;"></div>
        <div class="eventRiskWarnContent">
            <el-form ref="form" :model="form">               
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    row-key="id"                    
                    @selection-change="handleSelectionChange">               
                        <el-table-column type="selection" min-width="20%" v-if="flag"></el-table-column>
                        <el-table-column
                            label="分类"
                            min-width="30%">
                            <template slot-scope="scope" v-if="flag">
                                <!-- <el-form-item> -->
                                    <el-select v-model="scope.row.riskType" placeholder="请选择">
                                        <el-option v-for="item in riskType" :label="item.name" :value="item.value" :key="item.name"></el-option>
                                    </el-select>
                                <!-- </el-form-item> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="风险说明和处理方法"
                            min-width="50%">
                            <template slot-scope="scope" v-if="flag">
                                <!-- <el-form-item> -->
                                    <el-input type="text" v-model="scope.row.riskRemark"></el-input>
                                <!-- </el-form-item> -->
                            </template>
                        </el-table-column>            
                </el-table>
                <!-- <div style="height:0.2rem"></div> -->
                <el-form-item class="riskSubmitBtn">
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
    name: 'eventRiskWarn',
    components:{
        headerEventRisk
    },
    // provide(){
    //     return{
    //         addRow:this.addRow,
    //         deleteRow:this.deleteRow
    //     }
    // },
    data () {
        return {
            eventRiskWarnTit:"风险提示",
            form:{
                riskRemark:'',
            },
            tableData:[],
            riskType:[],
            multipleSelection:[],
            caseId:this.$route.query.caseId,
            flag:false
        }
    },
    created(){
        this.getCaseRiskLisk();
        this.getRiskType();
    },

    methods:{
        getCaseRiskLisk(){
            fetch.get("?action=/secondline/queryCaseRisk&CASE_ID="+this.caseId).then(res=>{
                console.log("queryCaseRisk",res);
                if(res.STATUSCODE=='1'){
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
        getRiskType(){
            fetch.get("?action=getDict&type=NT_CASE_RISK_TYPE","").then(res=>{
                // console.log(res);
                if(res.STATUSCODE=='0'){
                    this.riskType = res.data;
                }
                // console.log("riskType",this.riskType)
            });
        },
        handleSelectionChange(val) {
            console.log("val",val);
            this.multipleSelection = val;
        },
        addRow(){
            let rowNum = this.tableData.length;
            var list = {
                rowNum:rowNum+1,
                num:'',
                riskType: '',
                riskRemark: '',
                versionCd:'',
            }
            this.tableData.push(list);
            if(this.tableData.length!=0){
                this.flag = true
            }           
            console.log("tableData",this.tableData)
        },
        deleteRow(){
            for (let i = 0; i < this.multipleSelection.length; i++) {
                let val = this.multipleSelection
                // 获取选中行的索引的方法
                // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
                val.forEach((val, index) => {
                    this.tableData.forEach((v, i) => {
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
                // 删除完数据之后清除勾选框
            // this.$refs.tableData.clearSelection()
        },
        submitForm(form){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(vm.tableData);
                    let detailsArr = new Array();
                    for(let i = 0;i<vm.tableData.length;i++){
                        if(!vm.tableData[i].riskType){
                            vm.$message({
                                message:'请输入分类',
                                type: 'warning',
                                center: true,
                                duration:1000,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        if(!vm.tableData[i].riskRemark){
                            vm.$message({
                                message:'请输入风险说明和处理办法',
                                type: 'warning',
                                center: true,
                                duration:1000,
                                customClass:'msgdefine'
                            });
                            loading.close();
                            return;
                        }
                        let param = {};
                        param.riskRemark = vm.tableData[i].riskRemark;
                        param.riskType = vm.tableData[i].riskType;
                        param.num = vm.tableData[i].num;
                        param.caseId = vm.caseId;
                        param.versionCd = vm.tableData[i].versionCd;
                        detailsArr.push(param);
                    }
                    var data = new URLSearchParams;
                    data.append('data',JSON.stringify(detailsArr));
                    fetch.post("?action=/secondline/saveCaseRisk",data).then(res=>{
                        console.log("saveCaseRisk",res);
                        loading.close();
                        if(res.STATUSCODE=='1'){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                duration:1000,
                                customClass: 'msgdefine'
                            });
                            vm.getCaseRiskLisk();
                        }
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
.eventRiskWarnContent{width: 100%;  margin-top: 0.05rem;overflow: scroll}
.eventRiskWarnContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.eventRiskWarnContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.riskSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.riskSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: relative; bottom: 0;}
/* .eventRiskWarnContent >>> .el-select-dropdown__item.selected{color: #2698d6;}
.eventRiskWarnContent >>> .el-select-dropdown__item span{color: #2698d6!important;}
.eventRiskWarnContent >>> .bInput .el-input__inner{width: 80%;}
.eventRiskWarnContent >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
.eventRiskWarnContent >>> .el-input__inner{padding: 0 0.05rem}
.eventRiskWarnContent >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
.riskSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.riskSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;} */
</style>


