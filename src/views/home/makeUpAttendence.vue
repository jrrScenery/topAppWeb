<template>
    <div class="makeUpAttView">
        <header-atten-detail :title="makeUpAttTit" :searchType='searchType' :queryData="searchData" @searchNotice='searchNotice'></header-atten-detail>
        <div style="height:0.45rem"></div>
        <div class="makeUpAttContent">
            <el-form>
                <div v-if="tableData.length!=0">
                    <el-table
                        :data="tableData"
                        border
                        style="height: 100%;font-size:0.12rem">
                        <el-table-column
                            label="打卡时间"
                            min-width="25%">
                            <template slot-scope="scope">
                                <div>{{ scope.row.punchDate }}</div>
                                <div>{{ scope.row.beginTime }}-{{scope.row.endTime}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="请假"
                            min-width="30%">
                            <template slot-scope="scope">
                                <div v-if="!isBigDateList[scope.$index]">
                                    <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                        <div v-if="addFlagList[scope.$index]">
                                            <el-select class="leaveTypeSelect" v-model="leaveTypeList[scope.$index]" placeholder="请选择" @change="selectChange(scope.$index, scope.row)">
                                                <el-option
                                                    v-for="(item,key) in leaveTypeArr"
                                                    :key="key"
                                                    :label="item[key]"
                                                    :value="key">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div v-else>
                                            <div v-if="scope.row.leaveType!==''">{{leaveTypeArr[scope.row.leaveType][scope.row.leaveType]}}</div>
                                        </div>
                                    </div>
                                    <div v-else>{{leaveTypeArr[scope.row.leaveType][scope.row.leaveType]}}</div>
                                    <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                        <div v-if="addFlagList[scope.$index]">
                                            <div>{{scope.row.absBeginTime}}-</div>
                                            <div>
                                                <el-time-select
                                                    v-model="selectTimeList[scope.$index]"
                                                    :picker-options="{
                                                        start: pickerOptions.start,
                                                        step: '00:15',
                                                        end: pickerOptions.end
                                                    }"
                                                    size='small'
                                                    class="timePicker"
                                                    @change="timeSelectChange(scope.$index, scope.row)">
                                                </el-time-select>
                                            </div>
                                        </div>
                                        <div v-else>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                    </div>
                                    <div v-else>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="说明"
                            min-width='25%'>
                            <template slot-scope="scope">
                                <div v-if="!isBigDateList[scope.$index]">
                                    <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                        <div v-if="addFlagList[scope.$index]">
                                            <el-input type="textarea" v-model="scope.row.reason" @change="handleEdit(scope.$index, scope.row)"></el-input>
                                        </div>
                                    </div>
                                    <div v-else>{{ scope.row.reason}}</div>
                                </div>
                                <!-- <el-input size="small" v-model="scope.row.reason" v-if="scope.row.status=='已提交'" disabled></el-input> -->                        
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            min-width='15%'
                            class='statusColumn'>
                            <template slot-scope="scope">
                                <div v-if="!isBigDateList[scope.$index]">
                                    <div v-if="scope.row.leaveType!==''">
                                        <span>{{ processStatus[scope.row.processStatus][scope.row.processStatus] }}</span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width='15%'>
                            <template slot-scope="scope">
                                <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                    <div v-if="addFlagList[scope.$index]">
                                        <el-button                        
                                        type="text" 
                                        size="small"
                                        @click="handleAdd(scope.$index, scope.row)" >新增</el-button>
                                    </div>
                                    <div v-if="cancleFlagList[scope.$index]">
                                        <el-button                        
                                        type="text" 
                                        size="small"
                                        @click="handleCancel(scope.$index, scope.row)" >取消</el-button>
                                    </div>
                                    <div v-if="isShowDeleteList[scope.$index]">
                                        <el-button                        
                                        type="text" 
                                        size="small"
                                        @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item class="submitBtn" v-if="isSumit">
                        <el-button @click="handleSubmit()">提交</el-button>
                    </el-form-item>       
                </div>
                <div v-else>暂无缺勤记录</div>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerAttenDetail from "../header/headerAttenDetail";
import transfrom from "@/utils/dateTransform.js"
export default {
    name:'makeUpAttendence',
    components:{
        headerAttenDetail
    },
    data(){
        return{
            makeUpAttTit:'补考勤',
            searchType:'makeupAtten',
            pmendtime:'18:00',
            tableData:[],
            leaveTypeArr:[{0:'请选择'},{1:'因公'},{2:'病假'},{3:'事假'},
                        {4:'年假'},{5:'婚假'},{6:'产假'},{7:'哺乳假'},
                        {8:'丧假'},{9:'产检假'},{10:'陪产假'},{11:'分包替岗'},
                        {12:'漏打卡'}],
            processStatus:[{0:"未提交"},{1:"审批中"},{2:"已审批"},{3:"修改"},{4:"关闭"}],
            leaveTypeList:[],//各条记录选中请假类型值
            selectTimeList:[],//选择时间列表
            addFlagList:[],//增加按钮是否可用标识
            cancleFlagList:[],//定义取消按钮是否显示的数组
            isBigDateList:[],//是否大于当前日期
            isShowDeleteList:[],//是否显示删除按钮
            isSumit:true,
            isSearch:false,
            pickerOptions:{
                start:'09:00',
                step: '00:00',
                end:'18:00'
            },
            searchData:{
                wholeMonth:'1',//type=0代办查看全月，type=1代表查看缺勤
                month:''
            }
        }
    },
    created(){     
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        this.searchData.month = year+"-"+month;  
        this.getAttenInfo();
    },
    methods:{
        handleSubmit(){
            // const loading = this.$loading({
            //     lock: true,
            //     text: '提交中...',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(255, 255, 255, 0.3)'
            // });
            let vm= this;
            let leavetypeNullNum = 0;//记录请假类型是否全部空值
            let isAllSubmit = 0;//记录是否全部提交
            //判断请假类型是全部是“请选择”选项，若有则提示输入请假类型
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].leaveType!==0){
                    leavetypeNullNum++;
                }
                if(this.tableData[i].processStatus!=1&&this.tableData[i].processStatus!=3){
                    isAllSubmit++;
                }
            }
            if(leavetypeNullNum===0){
                this.$message({
                    message:'请输入请假类型',
                    type: 'warning',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
                return false;
            }else{
                //提交操作
                let dataArr = new Array();
                let num = 0;
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].processStatus===0||this.tableData[i].processStatus===3){
                        if(this.selectTimeList[i]!=this.tableData[i].absEndTime&&this.addFlagList[i]){
                            this.$message({
                                message:'当天考勤未补满',
                                type: 'warning',
                                center: true,
                                duration:2000,
                                customClass: 'msgdefine'
                            })
                            return false;
                        }
                        if(!this.addFlagList[i]){
                            if(this.leaveTypeList[i+1]===0){
                                this.$message({
                                    message:'请选择新增考勤时段考勤请假类型',
                                    type: 'warning',
                                    center: true,
                                    duration:2000,
                                    customClass: 'msgdefine'
                                })
                                return false;
                            }
                        }
                    }
                    if(this.leaveTypeList[i]!==''&&this.leaveTypeList[i]!==0&&(this.tableData[i].processStatus===0||this.tableData[i].processStatus===3)){
                        let dataObj = {};
                        dataObj.addrId = this.tableData[i].addrId;
                        dataObj.groupId = this.tableData[i].groupId;
                        dataObj.prjId = this.tableData[i].prjId;
                        let processStatus = this.tableData[i].processStatus;
                        dataObj.processStatus = processStatus;
                        if(processStatus===0||processStatus===3){
                            if(this.tableData[i].id!==''){
                                dataObj.id = this.tableData[i].id;
                            }
                            dataObj.punchDate = this.tableData[i].punchDate;
                            let myattence = transfrom.getLeaveType().myattence[this.leaveTypeList[i]];
                            dataObj.leaveType = parseInt(myattence);
                            dataObj.absBeginTime= this.tableData[i].absBeginTime;
                            dataObj.absEndTime= this.tableData[i].absEndTime;
                            dataObj.isNew = this.tableData[i].isNew;
                            if(!this.tableData[i].reason){
                                dataObj.reason = ""
                            }else{
                                dataObj.reason = this.tableData[i].reason;
                            }
                            dataArr[num++] = dataObj;
                        }
                    }
                }
                console.log("dataArr:",dataArr);
                let postData = new URLSearchParams;
                postData.append("empId",localStorage.getItem('empId'));
                postData.append("token",localStorage.getItem('token'));
                postData.append("data",JSON.stringify(dataArr))
                // fetch.post('?action=/').then(res=>{
                //     if(res.STATUSCODE=='1'){
                //         this.$message({
                //             message:'提交成功',
                //             type: 'success',
                //             center: true,
                //             customClass: 'msgdefine'
                //          });

                //     }
                // })
            }
            if(isAllSubmit===0){
                this.$message({
                    message:'已提交状态，不可重复提交',
                    type: 'warning',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
                return false;
            }
        },
        getAttenInfo(){
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth()+1;
            let date = currentDate.getDate();
            let params ={wholeMonth:this.searchData.wholeMonth,MONTH:this.searchData.month};
            if(this.isSearch){
                params.MONTH = this.searchData.month;
            }
            let last = year+'-'+currentDate.getMonth();
            if(last===this.searchData.month){
                if(date!==1){
                    this.isSumit = false;
                }
            }
            console.log("params",params);
            this.tableData = transfrom.getDataTable(params.wholeMonth,params.MONTH);
            for(let i=0;i<this.tableData.length;i++){
                this.leaveTypeList[i]=this.tableData[i].leaveType;
                this.selectTimeList[i]=this.tableData[i].absEndTime;
                if(this.tableData[i].leaveType!==""){
                    this.addFlagList[i] = true;   
                }else{
                    this.addFlagList[i] = false;
                }
                this.cancleFlagList[i] = false; 
                if(this.searchData.wholeMonth==="0"){
                    let punchDate = new Date(this.tableData[i].punchDate.replace(/\-/g, "\/"))
                    if(punchDate.getTime()>=currentDate.getTime()){
                        this.isBigDateList[i] = true;
                    }else{
                        this.isBigDateList[i] = false;
                    }
                }else{
                    this.isBigDateList[i] = false;
                }
                this.isShowDeleteList[i] = false;       
            }
        },
        selectChange(index, row){
            this.tableData[index].leaveType = this.leaveTypeList[index];
        },
        timeSelectChange(index, row){
            this.tableData[index].absEndTime = this.selectTimeList[index];
        },
        handleEdit(index, row){         
            this.reason = row.reason
        },
        handleAdd(index, row){
            if(this.isBigDateList[index]){
                this.$set(this.isBigDateList,index,false);
                this.$set(this.isShowDeleteList,index,true);
                this.$set(this.leaveTypeList,index,0);
                this.tableData[index].leaveType = 0;
                // this.isBigDateList[index] = false;
                // this.isShowDeleteList[index] = true;
            }else{
                let currentAbsBeginTime = this.tableData[index].absBeginTime;
                let currentAbsEndTime = this.tableData[index].absEndTime;
                if (this.tableData[index].leaveType === 0) {
                    this.$message({
                        message:'请输入请假类型',
                        type: 'warning',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }else if(currentAbsBeginTime==currentAbsEndTime){
                    this.$message({
                        message:'开始时间不能大于结束时间！',
                        type: 'warning',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }else if(this.selectTimeList[index]==this.pmendtime){
                    this.$message({
                        message:'当天考勤已补满！',
                        type: 'warning',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }else{//将新增记录添加至数组最后
                    let attenInfo = {};
                    attenInfo.punchDate = this.tableData[index].punchDate;
                    attenInfo.beginTime = this.tableData[index].beginTime;
                    attenInfo.endTime = this.tableData[index].endTime;
                    attenInfo.processStatus = this.tableData[index].processStatus;
                    attenInfo.processStatus = this.tableData[index].processStatus;
                    attenInfo.absBeginTime = this.tableData[index].absEndTime;
                    attenInfo.absEndTime = this.pmendtime;
                    attenInfo.leaveType = 0;
                    attenInfo.addrId = this.tableData[index].addrId;
                    attenInfo.groupId = this.tableData[index].groupId;
                    attenInfo.prjId = this.tableData[index].prjId;
                    attenInfo.isNew = 0;
                    this.selectTimeList.push(this.pmendtime);
                    this.leaveTypeList.push(0);
                    this.addFlagList[index]=false;
                    this.addFlagList.push(true);
                    this.cancleFlagList.push(false);
                    this.isBigDateList.push(false);
                    this.isShowDeleteList.push(false);
                    this.tableData.push(attenInfo);
    
                    //排序，将添加的数据放置到相应位置
                    //将最后插入的一条数据赋值给相应变量
                    let insert = this.tableData[this.tableData.length - 1];
                    let insertSelectTime = this.selectTimeList[this.selectTimeList.length-1];
                    let insertLeaveType = this.leaveTypeList[this.leaveTypeList.length-1];
                    let isBigDate = this.isBigDateList[this.isBigDateList.length-1];
                    for (var i = this.tableData.length - 1; i >= 0; i--) {
                        if (i > index + 1) {//插入位置之后,后移一位
                            this.selectTimeList[i] = this.selectTimeList[i-1];
                            this.leaveTypeList[i] = this.leaveTypeList[i-1];
                            this.addFlagList[i] = this.addFlagList[i-1];
                            this.cancleFlagList[i] = this.cancleFlagList[i-1];
                            this.isBigDateList[i] = this.isBigDateList[i-1];
                            this.isShowDeleteList[i] = this.isShowDeleteList[i-1];
                            this.tableData[i] = this.tableData[i - 1];
                        }else if (i == index + 1) {//插入位置
                            this.tableData[i] = insert;
                            this.selectTimeList[i] = insertSelectTime;
                            this.leaveTypeList[i] = insertLeaveType;
                            this.isBigDateList[i] = isBigDate;
                            this.$set(this.addFlagList,i,true);
                            this.$set(this.cancleFlagList,i,true);
                            this.$set(this.isShowDeleteList,i,false);
                            // this.addFlagList[i] = true;
                            // this.cancleFlagList[i] = true;
                            // this.isShowDeleteList[i] = false;
                        }else{
                            if (i == index) {
                                this.tableData[i].absEndTime = this.tableData[index+1].absBeginTime;
                                this.addFlagList[i] = false;
                                let nextPunchDate = (this.tableData[i].punchDate == this.tableData[i+1].punchDate);
                                if(i!=0){
                                    let beforePunchDate = (this.tableData[i].punchDate == this.tableData[i-1].punchDate);
                                    if (nextPunchDate && beforePunchDate){
                                        this.cancleFlagList[i] = true;
                                    }else{
                                        this.cancleFlagList[i] = false;
                                    }
                                }else{
                                    this.cancleFlagList[i] = false;
                                }
                            }
                        }
                    }
                }
            }
        },
        handleCancel(index, row){
            let selectAbsEndTime = this.selectTimeList[index];
            let punchDate = this.tableData[index].punchDate;
            // let currentDate = transfrom.formatDate(new Date());
            let punch = new Date(punchDate.replace(/\-/g, "\/"));
            let current = new Date();
            let sameDateNum = 0;
            for(i=index+1;i<this.tableData.length;i++){
                if(this.tableData[i].punchDate == punch){
                    sameDateNum++;
                }
            }
            //将当前条记录之后的记录依次前移
            for (var i = index; i < this.tableData.length; i++) {
                if (i == index) {//将当前记录选中的缺勤结束时间赋值给前一条的缺勤结束时间  
                    if(sameDateNum!==0){
                        this.selectTimeList[i-1] = selectAbsEndTime;
                        this.tableData[i-1].absEndTime = selectAbsEndTime;
                    }else{
                        this.selectTimeList[i-1] = this.tableData[i].absEndTime;
                        this.tableData[i-1].absEndTime = this.tableData[i].absEndTime;
                        // this.addFlagList[i-1] = true;
                        this.$set(this.addFlagList,i-1,true)
                    }
                    if(punch.getTime()<current.getTime()){
                        console.log("0000000000");
                        this.$set(this.isShowDeleteList,i-1,false);
                    }
                }else{//将当前条记录之后的记录依次前移
                    this.selectTimeList[i-1] = this.selectTimeList[i];
                    this.leaveTypeList[i-1] = this.leaveTypeList[i];
                    this.addFlagList[i-1] = this.addFlagList[i];
                    this.cancleFlagList[i-1] = this.cancleFlagList[i];
                    this.isBigDateList[i-1] = this.isBigDateList[i];
                    this.isShowDeleteList[i-1] = this.isShowDeleteList[i];
                    this.tableData[i-1] = this.tableData[i];
                }
            }
            this.tableData.pop();
            this.selectTimeList.pop();
            this.leaveTypeList.pop();
            this.addFlagList.pop();
            this.cancleFlagList.pop();
            this.isBigDateList.pop();
            this.isShowDeleteList.pop();
        },
        handleDelete(index,row){
            let self = this;
            let punchDate = this.tableData[index].punchDate;
            let addNum = 0;
            for(let i=index+1;i<this.tableData.length;i++){
                if(this.tableData[i].punchDate == punchDate){
                    addNum++;
                }
            }
            console.log("addNum",addNum);
            if(this.addFlagList[index]&&this.isShowDeleteList[index]){//条件:大于当天日期的记录;新增之后;删除操作
                this.$set(this.isBigDateList,index,true);
                this.$set(this.isShowDeleteList,index,false);
                this.$set(this.leaveTypeList,index,0);
                let selectTime = this.selectTimeList[index+addNum];
                this.$set(this.selectTimeList,index,selectTime);
                if(addNum===0){
                    selectTime = this.tableData[index].absEndTime;
                    this.$set(this.selectTimeList,index,selectTime);
                    // this.selectTimeList[index] = selectTime;
                    console.log("isBigDateList",this.isBigDateList);
                }else{
                    for(let i=0;i<addNum;i++){
                        self.deleteData(index,selectTime);
                    }
                }
            }else{
                this.$set(this.leaveTypeList,index,0);
                this.$set(this.isBigDateList,index,true);
                this.$set(this.isShowDeleteList,index,false);
                // this.leaveTypeList[index] = 0;
                // this.isBigDateList[index] = true;
                // this.isShowDeleteList[index] = false;
                let selectTime = this.selectTimeList[index+addNum];
                this.$set(this.selectTimeList,index,selectTime);
                // this.selectTimeList[index] = selectTime;
                for(let i=0;i<addNum;i++){
                    self.deleteData(index,selectTime);
                }
            }
        },
        deleteData(index,selectTime){
            console.log("aaaaaaaaa");
           //将当前条记录之后的记录依次前移
           for(let i=index+1;i<this.tableData.length;i++){
               if(i==index+1){//将当前记录选中的缺勤结束时间赋值给前一条的缺勤结束时间
                    this.selectTimeList[i-1] = this.tableData[i].absEndTime;
                    this.tableData[i-1].absEndTime = this.tableData[i].absEndTime;
                    this.$set(this.addFlagList,i-1,true);
                    this.$set(this.isShowDeleteList,i-1,false);
                    // this.addFlagList[i-1] = true;
                    // this.isShowDeleteList[i-1] = false;
               }else{//将当前条记录之后的记录一次前移
                    this.selectTimeList[i-1] = this.selectTimeList[i];
                    this.leaveTypeList[i-1] = this.leaveTypeList[i];
                    this.cancleFlagList[i-1] = this.cancleFlagList[i];
                    this.addFlagList[i-1] = this.addFlagList[i];
                    this.isBigDateList[i-1] = this.isShowDeleteList[i];
                    this.isShowDeleteList[i-1] = this.isShowDeleteList[i];
                    this.tableData[i-1] = this.tableData[i];
               }
            //    this.tableData[i-1] = this.tableData[i];
           }
            //前移后将最后一条记录删除
            this.tableData.pop();
            this.selectTimeList.pop();
            this.leaveTypeList.pop();
            this.cancleFlagList.pop();
            this.addFlagList.pop();
            this.isBigDateList.pop();
            this.isShowDeleteList.pop();

        },
        searchNotice (formData) {
            console.log("formData",formData);
            this.makeupAttenArr = [];
            this.isSearch = true;
            this.searchData = formData;
            this.getAttenInfo();
        },
    }
}
</script>
<style scoped>
.makeUpAttView{width:100%;height:100%;overflow: scroll;position: relative;}
.makeUpAttContent{font-size: 0.12rem;text-align: center;margin-bottom: 0.6rem}
.makeUpAttContent>>>.el-table--border::after, .el-table--group::after, .el-table::before{z-index: -1}
.makeUpAttContent >>> td{padding: 0rem;}
.makeUpAttContent >>>.leaveTypeSelect{width: 80%;margin: 0.01rem 0}
.makeUpAttContent >>>.leaveTypeSelect .el-input__icon{width:10px;height: 0.3rem;}
.makeUpAttContent >>>.leaveTypeSelect .el-input__inner{text-align: center;padding-left: 0.05rem;padding-right: 0.1rem; height: 0.3rem;}
.makeUpAttContent>>>.timePicker{width: 80%;}
.makeUpAttContent>>>.timePicker .el-input__inner{padding-left: 0.05rem;text-align: center;padding-right: 0}
.makeUpAttContent>>>.el-table .cell, .el-table th {padding: 0;text-align: center}
.makeUpAttContent>>>.el-textarea__inner{padding:0.05rem;height:100%;}

.makeUpAttView>>> .el-button{display: flex;align-items: center;justify-content: center}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>