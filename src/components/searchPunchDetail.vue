<template>
    <div class="searchPunchView">
        <el-form ref="form" :model="form" label-width="65px">
            <el-form-item label="时间">
                <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" style="width: 80%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
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
    name:'searchPunchDetail',
    props: ['queryData'],
    data(){
        return{
            form:{
                date:this.GetDateStr(-1),
            }
        }
    },
    created(){
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
        },
        GetDateStr(AddDayCount){
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
            return y + "-" + m + "-" + d;
        },
    }
}
</script>
<style scoped>
.searchPunchView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
.searchPunchView >>> .el-form-item{margin-bottom: 0.1rem;}
.searchPunchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
.searchPunchView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
.searchPunchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.searchPunchView >>> .searchBtn .el-button:hover{background: #ffffff;}
.searchPunchView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
.searchPunchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
.searchPunchView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>