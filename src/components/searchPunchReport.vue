<template>
    <div class="searchpunchReportView">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="区域">
                <el-select v-model="form.area" placeholder="请选择区域" @change="changeArea" clearable>
                    <el-option v-for="item in areaArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.DICTID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目组">
                <el-select v-model="form.projectGroup" placeholder="请选择项目组" clearable>
                    <el-option v-for="item in projectGroupArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.DICTID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="form.prjName" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名">
                <el-input v-model="form.staffName" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="ITCode">
                <el-input v-model="form.itcode" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" style="width: 80%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
            <el-form-item class="submitBtn">
                <el-button @click="onCancle">取消</el-button>
                <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import fetch from '../utils/ajax'
export default {
    props:['queryData'],
    data(){
        return{
            form:{
                area:'',
                projectGroup:'',
                date:'',
                prjName:'',
                staffName:'',
                itcode:''
            },
            areaArr:[],
            projectGroupArr:[]
        }
    },
    created(){
        this.queryArea();
        this.form.area = this.queryData.area;
        if(this.form.area){
            this.changeArea();
        }
        this.form.projectGroup = this.queryData.projectGroup;
        this.form.date = this.queryData.date;
        this.form.prjName = this.queryData.prjName;
        this.form.staffName = this.queryData.staffName;
        this.form.itcode = this.queryData.itcode;
    },
    methods:{
        queryArea(){
            console.log("area",this.form.area);
            fetch.get("?action=/attendance/queryArea&parentArea="+this.form.area).then(res=>{
                console.log("queryArea",res);
                if(res.STATUSCODE=='1'){
                    this.areaArr = res.data;
                }
            })           
        },
        changeArea(){
            fetch.get("?action=/attendance/queryArea&parentArea="+this.form.area).then(res=>{
                console.log("projectGroupArr",res);
                if(res.STATUSCODE=='1'){
                    this.projectGroupArr = res.data;
                }
            })
        },
        onCancle(){
            let data = {
                popBg:false
            }
            this.$emit('change',data);
        },
        onSearch(){
            let form = this.form;
            let data = {
                popBg:false
            }
            if(form.staffName!=""||form.itcode!=''){
                this.$router.push({name:'attenHistory',query:{staffName:form.staffName,dateStr:form.date}})
            }else{
                this.$emit('search',form);
                this.$emit('change',data);
            }
        },
        noKeyword () {
            document.activeElement.blur();
        }
    }
}
</script>
<style scoped>
.searchpunchReportView{background: #ffffff; padding: 0.15rem 0.2rem 0.15rem; position: relative;}
  .searchpunchReportView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchpunchReportView >>> .el-select{width: 90%;}
  .searchpunchReportView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchpunchReportView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchpunchReportView >>> .bInput .el-input__inner{width: 90%;}
  .searchpunchReportView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchpunchReportView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchpunchReportView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchpunchReportView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchpunchReportView >>> .submitBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchpunchReportView >>> .submitBtn .el-button:hover{background: #ffffff;}
  .searchpunchReportView >>> .submitBtn .searchBtnCell:hover{background: #2698d6;}
  .searchpunchReportView >>> .submitBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchpunchReportView >>> .submitBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>