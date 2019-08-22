<template>
    <div class="makeUpAttView">
        <header-last :title="makeUpAttTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="makeUpAttContent">
            <div class="attentionDiv">注：以下为全天未打卡或打卡一次，需进行补考勤</div>
            <el-table
                :data="tableData"
                style="height: 100%">             
                <el-table-column
                    label="日期"
                    width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="说明">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status=='已提交'">{{ scope.row.reason }}</span>
                        <!-- <el-input size="small" v-model="scope.row.reason" v-if="scope.row.status=='已提交'" disabled></el-input> -->
                        <el-input size="small" v-model="scope.row.reason" @change="handleEdit(scope.$index, scope.row)" v-else></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="补考勤">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleSubmit(scope.$index, scope.row)" v-if="scope.row.status=='未提交'">提交</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
export default {
    name:'makeUpAttendence',
    components:{
        headerLast
    },
    data(){
        return{
            makeUpAttTit:'补考勤',
            tableData:[
                {
                    date:'2019-8-16 09:00-18:00',
                    reason:'',
                    status:'未提交',
                },
                {
                    date:'2019-8-15 09:00-18:00',
                    reason:'因公外出',
                    status:'已提交',
                }
            ],
            pickerOptions:{
                start:'09:00',
                step: '00:15',
                end:'18:00'
            }
        }
    },
    methods:{
        handleEdit(index, row){
            console.log("index",index);
            console.log("row",row);
            this.reason = row.reason
        },
        handleSubmit(index, row){
            console.log(index, row);
        }
    }
}
</script>
<style scoped>
.makeUpAttView{width:100%;height:100%;}
.makeUpAttContent{font-size: 0.13rem}
.makeUpAttContent .attentionDiv{padding: 0.1rem;color: red}
.makeUpAttContent .el-table>>>.el-table-column:nth-child(1){width:35%}
.makeUpAttContent .el-table>>>.el-table-column:nth-child(2){width:15%}
.makeUpAttContent .el-table>>>.el-table-column:nth-child(3){width:10%}
.makeUpAttContent .el-table>>>.el-table-column:nth-child(4){width:25%}
.makeUpAttContent .el-table>>> .el-table-column:nth-child(5){width:15%}
</style>