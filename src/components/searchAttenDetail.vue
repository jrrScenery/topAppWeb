<!--考勤详情查询条件-->
<template> 
    <div class="searchAttenDetailView">
        <el-form ref="form" :model="form" label-width="65px">
            <el-form-item label="时间">
                <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" style="width: 80%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="form.status" placeholder="请选择审批状态" multiple>
                    <el-option v-for="item in statusArr" :label="item.name" :value="item.value" :key="item.id"></el-option>
                </el-select>
                <!-- <el-input v-model="form.status" class="bInput"></el-input> -->
            </el-form-item>
            <el-form-item class="searchBtn">
                <el-button @click="onCancel">取消</el-button>
                <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'searchAttenDetail',
    props: ['searchData'],
    data () {
        return {
            form: {
                date: '',
                name: '',
                status:''
            },
            statusArr:[
                {name:'已同意',value:'A0'},
                {name:'已拒绝',value:'A1'},
                {name:'否',value:'A2'}
            ]
        }
    },
    methods: {
        onCancel () {
            console.log("sssssssss");
            let data = {
                popBg: false
            }
        this.$emit('change', data)
        },
        onSearch () {
            let form = this.form
            this.$emit('search', form)
            let data = {
                popBg: false
            }
            this.$emit('change', data)
        },
        noKeyword () {
            document.activeElement.blur()
        }
    }
}
</script>
<style scoped>
.searchAttenDetailView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
  .searchAttenDetailView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchAttenDetailView >>> .el-select{width: 80%;}
  .searchAttenDetailView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchAttenDetailView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchAttenDetailView >>> .bInput .el-input__inner{width: 80%;}
  .searchAttenDetailView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchAttenDetailView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchAttenDetailView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchAttenDetailView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchAttenDetailView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchAttenDetailView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchAttenDetailView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchAttenDetailView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchAttenDetailView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>