<template>
    <div class="searchMakeAttenView">
        <el-form ref="form" :model="form" label-width="65px">
            <el-form-item label="查询类型" style="position: relative" label-width="0.8rem">
                <template>
                    <div style="position: absolute; top: 0.25rem; left: -0.65rem; color: #999999; font-size: 0.1rem"></div>
                    <el-radio-group v-model="form.wholeMonth" size="small">
                        <el-radio-button v-for="item in Type" :label="item.value" :key="item.id">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item label="查询月份" label-width="0.8rem">
                <el-select v-model="form.month" clearable placeholder="请选择">
                    <el-option
                        v-for="item in monthArr"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
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
    name:'searchMakeAttenView',
    components:{},
    props: ['queryData'],
    data(){
        return{
            form:{
                wholeMonth:'',
                month:''
            },
            Type: [{name:"全月",value:'0',id:0},{name:'缺勤',value:'1', id:1},],
            monthArr:[],
        }
    },
    created(){
        this.form.wholeMonth = this.queryData.wholeMonth;
        let date = new Date();
        let year = date.getFullYear();
        let currentMonth = date.getMonth()+1;
        let lastMonth = date.getMonth();
        if(date.getMonth()==0){
            year = year-1;
            lastMonth = 12
        }
        if(currentMonth<=9){
            currentMonth = "0"+currentMonth
        }
        this.form.month = date.getFullYear()+"-"+currentMonth;
        let current = date.getFullYear()+"-"+currentMonth;
        let last = year+"-"+lastMonth;
        this.monthArr = [{id:0,value:current},{id:0,value:last}]
    },
    methods:{
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
.searchMakeAttenView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
.searchMakeAttenView >>> .el-form-item{margin-bottom: 0.1rem;}
 .searchMakeAttenView >>> .el-select{width: 70%;} 
.searchMakeAttenView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
/* .searchMakeAttenView >>> .el-radio-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem;} */
/* .searchMakeAttenView >>> .el-radio-button.is-checked .el-radio-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;} */
.searchMakeAttenView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
.searchMakeAttenView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.searchMakeAttenView >>> .searchBtn .el-button:hover{background: #ffffff;}
.searchMakeAttenView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
.searchMakeAttenView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
.searchMakeAttenView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>