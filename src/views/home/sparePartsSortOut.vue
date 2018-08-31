<template>
    <div class="sparePartsSortOutSelectView">
        <header-base-eight :title="sparePartsSortOutTit"></header-base-eight>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <!-- <el-row style="margin-left: 0.15rem">
                <el-col :span="2"><div class="grid-content bg-purple-light">选择</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">已整理</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">来源</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">PN/FRU</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">备件类型</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">SN</div></el-col>
            </el-row>
            <div class="SelectListCell" v-for="item in sparePartsSortOutSelectArr" :key="item.id">
        
                <el-row>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light">
                            <div class="contentPopover">
                                <el-popover placement="bottom" width="335" trigger="click">
                                
                                    <el-button slot="reference" class="el-icon-edit-outline"></el-button>
                                    <div class="contentParts">
                                        <el-form label-width="1rem">
                                            <el-form-item label="备件来源">
                                                <el-radio-group v-model="item.partsSource" disabled>
                                                    <el-radio label="1">供货件</el-radio>
                                                    <el-radio label="2">换下件</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="PN/FRU">
                                                <el-input v-model="item.pnFru" placeholder="请输入PN/FRU" class="bInput"></el-input>
                                            </el-form-item>
                                            <el-form-item label="序列号">
                                                <el-input v-model="item.sn" placeholder="请输入序列号" class="bInput"></el-input>
                                            </el-form-item>
                                            <el-form-item label="备件类型">
                                                <el-select v-model="form.partsType" placeholder="请选择备件类型" clearable>
                                                    <el-option v-for="itemParts in partsTypeList" :label="itemParts.partsTypeName" :value="itemParts.partsTypeId" :key="itemParts.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="*是否有包装">
                                                <el-radio-group v-model="item.ifPackage">
                                                    <el-radio label="1">是</el-radio>
                                                    <el-radio label="0">否</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="*是否已带走">
                                                <el-radio-group v-model="item.ifTakeaway">
                                                    <el-radio label="1">是</el-radio>
                                                    <el-radio label="0">否</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="*使用情况">
                                                <el-radio-group v-model="item.useStatus">
                                                    <el-radio label="1">已使用件</el-radio>
                                                    <el-radio label="2">未使用件</el-radio>
                                                    <el-radio label="3">坏件</el-radio>
                                                    <el-radio label="4">DOA不可用</el-radio>
                                                    <el-radio label="5">未到场</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="*能否回收">
                                                <el-radio-group v-model="item.isRecycle">
                                                    <el-radio label="1">是</el-radio>
                                                    <el-radio label="0">否</el-radio>
                                                    <el-radio label="3">暂缓</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="回收件说明">
                                                <el-input placeholder="请输入回收件说明" v-model="item.useStatusRemark" class="bInput"></el-input>
                                            </el-form-item>
                                            <el-form-item class="submitBtn">
                                                <el-button type="primary" @click="onSubmit(item)">提交</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                
                                </el-popover>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="3"><div v-if="item.ifArrangeName" class="grid-content bg-purple">{{item.ifArrangeName}}</div><div v-else class="grid-content bg-purple">null</div></el-col>
                    <el-col :span="3"><div v-if="item.partsSourceName" class="grid-content bg-purple-light">{{item.partsSourceName}}</div><div v-else class="grid-content bg-purple-light">null</div></el-col>
                    <el-col :span="6"><div v-if="item.pnFru" class="grid-content bg-purple">{{item.pnFru}}</div><div v-else class="grid-content bg-purple">null</div></el-col>
                    <el-col :span="4"><div v-if="item.typeName" class="grid-content bg-purple-light">{{item.typeName}}</div><div v-else class="grid-content bg-purple-light">null</div></el-col>
                    <el-col :span="6"><div v-if="item.sn" class="grid-content bg-purple">{{item.sn}}</div><div v-else class="grid-content bg-purple">null</div></el-col>
                </el-row>
            </div> -->

            <div class="SelectListCell">
            <el-table :data="sparePartsSortOutSelectArr" style="width: 100%">
                <el-table-column prop="date" label="修改" width="10%">
                    <template slot-scope="scope">
                    <div class="contentPopover">
                        <el-popover placement="bottom" width="335" trigger="click">
                        
                            <el-button  slot="reference" class="el-icon-edit-outline"></el-button>
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
                                    <el-form-item label="序列号">
                                        <el-input v-model="scope.row.sn" placeholder="请输入序列号" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备件类型">
                                        <el-select v-model="form.partsType" placeholder="请选择备件类型" clearable>
                                            <el-option v-for="itemParts in partsTypeList" :label="itemParts.partsTypeName" :value="itemParts.partsTypeId" :key="itemParts.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="*是否有包装">
                                        <el-radio-group v-model="scope.row.ifPackage">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="*是否已带走">
                                        <el-radio-group v-model="scope.row.ifTakeaway">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="*使用情况">
                                        <!-- <el-radio-group v-model="scope.row.useStatus">
                                            <el-radio label="1">已使用件</el-radio>
                                            <el-radio label="2">未使用件</el-radio>
                                            <el-radio label="3">坏件</el-radio>
                                            <el-radio label="4">DOA不可用</el-radio>
                                            <el-radio label="5">未到场</el-radio>
                                        </el-radio-group> -->
                                        <el-select v-model="scope.row.useStatus" placeholder="选择使用情况" clearable>
                                            <el-option v-for="use in useStatusList" :label="use.useStatusName" :value="use.useStatusId" :key="use.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="*能否回收">
                                        <el-radio-group v-model="scope.row.isRecycle">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                            <el-radio label="3">暂缓</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="回收件说明">
                                        <el-input placeholder="请输入回收件说明" v-model="scope.row.useStatusRemark" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item class="submitBtn">
                                        <el-button type="primary" @click="onSubmit(scope.row)">提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
        
                        </el-popover>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="ifArrangeName" label="已整理" width="20%"></el-table-column>
                <el-table-column prop="partsSourceName" label="来源" width="20%"></el-table-column>
                <el-table-column prop="pnFru" label="PN/FRU" width="20%"></el-table-column>
                <el-table-column prop="typeName" label="备件类型" width="20%"></el-table-column>
                <el-table-column prop="sn" label="SN" width="10%"></el-table-column>
            </el-table>
            </div>

            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
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
            form: {
                partsSource: "2",
                partsId: "",
                pnFru: "",
                SN: "",
                ifPackage: "",
                ifTakeaway: "",
                useStatus: "3",
                isRecycle: "",
                useStatusRemark: "",
                partsType: "",
            },
            partsTypeList: [],
            sparePartsSortOutTit:"事件备件列表",
            caseId:this.$route.query.caseId,
            searchData:[],
            sparePartsSortOutSelectArr:[],
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
                {"useStatusName": "DOA不可用", "useStatusId": "4"},
                {"useStatusName": "未到场", "useStatusId": "5"},
                ],
        };
    },

    methods:{
        getSparePart(){
            fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId).then(res=>{
                console.log("SSSSS", res.DATA);
                this.sparePartsSortOutSelectArr = res.DATA;
                this.busy = false;
                this.loadall = true;

            });
            fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
                this.partsTypeList = res.DATA;
            });
        },
         
        onSubmit (formUpdateParts) {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            console.log("1111111111", formUpdateParts)
            // this.$refs.sparePartsSortOutSelectArr.validate((valid) => {
            //     if (valid) {
            let params = "&PARTS_SOURCE="+formUpdateParts.partsSource+"&PN_FRU="+formUpdateParts.pnFru+"&SN="+formUpdateParts.SN+"&TYPE="+formUpdateParts.partsType+"&USE_STATUS="+formUpdateParts.useStatus+"&USE_STATUS_REMARK="+formUpdateParts.useStatusRemark+"&IF_PACKAGE="+formUpdateParts.ifPackage+"&IF_TAKEAWAY="+formUpdateParts.ifTakeaway+"&IS_RECYCLE="+formUpdateParts.isRecycle+"&UPDATE_DATE="+this.getCurrentTime(1)[0];
            fetch.get("?action=/parts/updatePartsGathering"+params,"").then(res=>{
                console.log("VVVVVVVVV", res)
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    });

                        let nowcaseid = formUpdateParts.caseId;
                        console.log("ZAZAZAZAZA", nowcaseid);
                        setTimeout(function(){vm.$router.push({ name: "sparePartsSortOut",query:{caseId:nowcaseid}})},1000);
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                }
      
            });
                // } else {
                //     this.$message({
                //         message:"请正确填写",
                //         type: 'error',
                //         center: true,
                //         customClass: 'msgdefine'
                //     });
                //     return false
                // }
            // })
        },
        getSearParams (searchData) {

        },

        onPartsArrange(){
            console.log("ASSSSSSSSSSSSSSS")
        },

        loadMore(){
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getSparePart();
            }, 500);
        },

        standardDate(join,...num){
            let arr = [];
            num.forEach((item)=>{
                item.toString().length<2?arr.push('0'+item):arr.push(item);
            });
            return arr.join('-')
        },
        getFormerTime (n) {
            let nowYear = new Date().getFullYear() - 1, yearArr = []
            yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
            for(let i = 1;i<n;i++){
                yearArr.unshift(nowYear-i+'1231')
            }
            return yearArr
        },
        getCurrentTime (n) {
            let nowYear = new Date().getFullYear(), yearArr = []
            yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
            for(let i = 1;i<n;i++){
                yearArr.unshift(nowYear-i+'1231')
            }
            //console.log(yearArr)
            return yearArr
        }
    },
    created:function(){
    },
}
</script>


<style scoped>
.sparePartsSortOutSelectView{width: 100%}
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
/* .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left} */
.content:nth-child(2n+1){background: #fafafa}
.content >>> .el-col {border-radius: 4px;}
.content >>> .bg-purple-dark {background: #99a9bf;}
.content >>> .bg-purple {background: #d3dce6;}
.content >>> .bg-purple-light {background: #e5e9f2;}
.content >>> .grid-content {border-radius: 4px;min-height: 24px; text-align: center; line-height: 2}
.content >>> .row-bg {padding: 10px 0;background-color: #f9fafc;}

  /* .content{margin-top: 0.05rem;background: #ffffff;} */
.contentParts >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.contentParts >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
.contentParts >>> .el-input__inner{border: none; color: #333333; padding: 0px 0px}
.contentParts >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.contentParts >>> .el-input.is-disabled .el-input__inner{background: #ffffff}

.contentPopover >>> .el-button{padding: 0px 0px}
.contentPopover >>> .el-icon-edit-outline:before{color: green}

.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;}


</style>