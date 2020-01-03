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
                        current-row-key=""
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
                                <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                    <div v-if="!isBigDateList[scope.$index]">
                                        <div v-if="addFlagList[scope.$index]">
                                            <el-select class="leaveTypeSelect" v-model="leaveTypeList[scope.$index]" placeholder="请选择" @change="selectChange(scope.$index, scope.row)">
                                                <el-option
                                                    v-for="(item,key) in leaveTypeArr"
                                                    :key="key"
                                                    :label="item[key]"
                                                    :value="key">
                                                </el-option>
                                            </el-select>
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
                                                    @change="timeSelectChange(scope.$index, scope.row,$event)">
                                                </el-time-select>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div v-if="scope.row.leaveType!==null">{{leaveTypeArr[leaveTypeList[scope.$index]][leaveTypeList[scope.$index]]}}</div>
                                            <div>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="scope.row.leaveType!==null">{{leaveTypeArr[leaveTypeList[scope.$index]][leaveTypeList[scope.$index]]}}</div>
                                    <div>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                </div>
                                <!-- <div v-if="!isBigDateList[scope.$index]">
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
                                            <div v-if="scope.row.leaveType!==null">{{leaveTypeArr[scope.row.leaveType][scope.row.leaveType]}}</div>
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
                                                    @change="timeSelectChange(scope.$index, scope.row,$event)">
                                                </el-time-select>
                                            </div>
                                        </div>
                                        <div v-else>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                    </div>
                                    <div v-else>{{scope.row.absBeginTime}}-{{scope.row.absEndTime}}</div>
                                    <el-button style="width:100%" type="text" v-if="caseFlag[scope.$index]" @click="selectCaseNo(scope.$index)">选择case地</el-button>
                                </div> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="说明"
                            min-width='25%'>
                            <template slot-scope="scope">
                                <div v-if="scope.row.processStatus==0||scope.row.processStatus==3">
                                    <div v-if="!isBigDateList[scope.$index]">
                                        <div v-if="leaveTypeList[scope.$index]==null"></div>
                                        <div v-else>
                                                <el-input type="textarea" v-model="scope.row.reason" @change="handleEdit(scope.$index, scope.row)"></el-input>
                                        </div>
                                        <!-- <div v-if="scope.row.processStatus==0||scope.row.processStatus==3"> -->
                                        <!-- <div v-if="addFlagList[scope.$index]">
                                            <el-input type="textarea" v-model="scope.row.reason" @change="handleEdit(scope.$index, scope.row)"></el-input>
                                        </div> -->
                                        <!-- </div>
                                        <div v-else>{{ scope.row.reason}}</div> -->
                                    </div>                     
                                </div>
                                <div v-else>{{ scope.row.reason}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            min-width='15%'
                            class='statusColumn'>
                            <template slot-scope="scope">
                                <div v-if="!isBigDateList[scope.$index]">
                                    <div v-if="scope.row.leaveType===null"></div>
                                    <div v-else>
                                        <span>{{ processStatus[scope.row.processStatus]}}</span>
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
                        <el-button @click="handleSubmit">提交</el-button>
                    </el-form-item>       
                </div>
                <div class="norecord" v-else>暂无考勤记录</div>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerAttenDetail from "../header/headerAttenDetail";
import fetch from '../../utils/ajax'
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
            pmendtime:'',
            tableData:[],
            leaveTypeArr:[{0:'请选择'},{1:'因公'},{2:'病假'},{3:'事假'},
                        {4:'年假'},{5:'婚假'},{6:'产假'},{7:'哺乳假'},
                        {8:'丧假'},{9:'产检假'},{10:'陪产假'},{11:'分包替岗'},
                        {12:'漏打卡'}],
            processStatus:[],//{0:"未提交"},{1:"审批中"},{2:"已审批"},{3:"修改"},{4:"关闭"}
            leaveTypeList:[],//各条记录选中请假类型值
            selectTimeList:[],//选择时间列表
            selectAbsBeginTime:[],//定义选择器选择的缺勤结束时间数组
            addFlagList:[],//增加按钮是否可用标识
            cancleFlagList:[],//定义取消按钮是否显示的数组
            isBigDateList:[],//是否大于当前日期
            isShowDeleteList:[],//是否显示删除按钮
            leavetypeIndex:[],//定义请假类型下标数组
            insertselectTime:'',
            insertSelectTime1:'',
            isSumit:true,
            isSearch:false,
            caseFlag:[],//控制case所在地
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
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            let leavetypeNullNum = 0;//记录请假类型是否全部空值
            let isAllSubmit = 0;//记录是否全部提交
            console.log("tableData",this.tableData);
            //判断请假类型是全部是“请选择”选项，若有则提示输入请假类型
            console.log("tableData",this.tableData);
            console.log("leaveTypeList",this.leaveTypeList);
            for(let i=0;i<this.tableData.length;i++){
                console.log("i:"+i+"-----"+this.tableData[i]);
                if(this.tableData[i].processStatus===0||this.tableData[i].processStatus===3){
                    if(this.tableData[i].leaveType!==0){
                        leavetypeNullNum++;
                    }
                }
                if(this.tableData[i].processStatus!==1&&this.tableData[i].processStatus!==2){
                    isAllSubmit++;
                }
            }
            if(leavetypeNullNum===0){
                loading.close();
                this.$message({
                    message:'请输入请假类型',
                    type: 'warning',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
                return false;
            }
            // else{
                //提交操作
                let dataArr = new Array();
                let num = 0;
                console.log("111111111111");
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].processStatus===0||this.tableData[i].processStatus===3){
                        console.log("selectTimeList",this.selectTimeList[i]);
                        console.log("absEndTime",this.tableData[i].absEndTime);
                        if(this.selectTimeList[i]<this.tableData[i].absEndTime&&this.selectTimeList[i]!=this.tableData[i].absEndTime&&this.addFlagList[i]){
                            loading.close();
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
                            if(this.leaveTypeList[i]!=null&&this.leaveTypeList[i+1]===0){
                                loading.close();
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
                    if(this.leaveTypeList[i]!==null&&this.leaveTypeList[i]!==0&&(this.tableData[i].processStatus===0||this.tableData[i].processStatus===3)){
                        let dataObj = {};
                        dataObj.addrId = this.tableData[i].addrId;
                        dataObj.groupId = this.tableData[i].groupId;
                        dataObj.prjId = this.tableData[i].prjId;
                        let processStatus1 = this.tableData[i].processStatus;
                        console.log("processStatus1",processStatus1);
                        dataObj.processStatus = processStatus1;
                        if(processStatus1===0||processStatus1===3){
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
                let dataInfo = {};
                dataInfo.dataInfo = JSON.stringify(dataArr);
                fetch.questionPost('?action=/attendance/submitAttendance',dataInfo).then(res=>{
                    console.log("res",res);
                    loading.close();
                    if(res.STATUSCODE=='1'){
                        this.$message({
                            message:'提交成功',
                            type: 'success',
                            center: true,
                            customClass: 'msgdefine'
                         });
                         this.getAttenInfo();
                    }
                })
            // }
            if(isAllSubmit===0){
                loading.close();
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
            var currentDate1 = new Date((year + "/" + month + "/" + date).replace(/\-/g, "\/"));
            this.processStatus = transfrom.getLeaveType().processStatus;
            let params ={wholeMonth:this.searchData.wholeMonth,month:this.searchData.month};
            if(this.isSearch){
                params.month = this.searchData.month;
                params.wholeMonth = this.searchData.wholeMonth;
            }
            let last = year+'-'+currentDate.getMonth();
            if(last===this.searchData.month){
                if(date!==1){
                    this.isSumit = false;
                }
            }
            fetch.get("?action=/attendance/queryAttendanceList",params).then(res=>{
                console.log("queryAttendanceList",res);
                if(res.STATUSCODE === '1'){
                    this.tableData = res.data;
                    for(let i=0;i<res.data.length;i++){
                        if(res.data[i].leaveType!=null){
                            let myabsencereserve = transfrom.getLeaveType().myabsencereserve[res.data[i].leaveType];
                            console.log("myabsencereserve",myabsencereserve);
                            this.leaveTypeList[i] = myabsencereserve;
                            // if(res.data[i].processStatus===3||res.data[i].processStatus===0){
                            //     this.leaveTypeList[i] = myabsencereserve;
                            // }else{
                            //     this.leaveTypeList[i] = res.data[i].leaveType;
                            // }
                        }else{
                            this.leaveTypeList[i] = null
                        }
                        console.log("leaveTypeList",this.leaveTypeList)
                        // this.leaveTypeList[i]=res.data[i].leaveType;
                        this.selectTimeList[i]=res.data[i].absEndTime;
                        this.selectAbsBeginTime[i] =  res.data[i].absBeginTime;
                        if(res.data[i].leaveType!==null){
                            this.addFlagList[i] = true;   
                        }else{
                            this.addFlagList[i] = false;
                        }
                        this.cancleFlagList[i] = false; 
                        if(this.searchData.wholeMonth==="0"){
                            let punchDate = new Date(res.data[i].punchDate.replace(/\-/g, "\/"))
                            if(punchDate.getTime()>=currentDate1.getTime()){
                                this.isBigDateList[i] = true;
                            }else{
                                this.isBigDateList[i] = false;
                            }
                        }else{
                            this.isBigDateList[i] = false;
                        }
                        this.isShowDeleteList[i] = false; 
                        this.caseFlag[i] = false; 
                        this.pmendtime = res.data[i].pmEndWorktime     
                    }
                    // console.log()
                }else{
                    this.$message({
                        message:res.MESSAGE,
                        type: 'error',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }
            })
            // this.tableData = transfrom.getDataTable(params.wholeMonth,params.MONTH);
        },
        selectChange(index, row){
            console.log("index:"+index);
            console.log("row:",row);//
            this.tableData[index].leaveType = this.leaveTypeList[index];
            if(this.tableData[index].leaveType===13){
                this.caseFlag[index] = true
            }else{
                this.caseFlag[index] = false
            }
        },
        timeSelectChange(index, row,event){
            console.log("row",row);
            console.log("event",event);//selectTimeList
            if(row.absBeginTime>=event){
                this.$message({
                    message:'结束时间应大于开始时间',
                    type: 'warning',
                    center: true,
                    duration:2000,
                    customClass: 'msgdefine'
                })
                // this.selectTimeList[index] = row.absEndTime
            }else{
                this.selectTimeList[index] = event
            }
            // this.tableData[index].absEndTime = this.selectTimeList[index];
            // if(this.selectAbsBeginTime[index] === this.selectTimeList[index]){
            //     this.$message({
            //         message:'结束时间应大于开始时间',
            //         type: 'warning',
            //         center: true,
            //         duration:2000,
            //         customClass: 'msgdefine'
            //     })
            // }else{
            //     this.tableData[index].absEndTime = this.selectTimeList[index];
            // }
        },
        selectCaseNo(index){

        },
        handleEdit(index, row){         
            this.reason = row.reason
        },
        handleAdd(index, row){ 
            console.log("selectTimeList",this.selectTimeList);   
            console.log("row",row);
            if(this.isBigDateList[index]){
                this.$set(this.isBigDateList,index,false);
                this.$set(this.isShowDeleteList,index,true);
                // this.$set(this.leaveTypeList,index,0);
                // this.tableData[index].leaveType = 0;
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
                }
                else if(currentAbsBeginTime==currentAbsEndTime){
                    this.$message({
                        message:'开始时间不能大于结束时间！',
                        type: 'warning',
                        center: true,
                        duration:2000,
                        customClass: 'msgdefine'
                    })
                }else if(this.selectTimeList[index] == this.tableData[index].beginTime){
                    this.$message({
                        message:'当前时间段已补满！',
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
                }
                else{//将新增记录添加至数组最后
                    let attenInfo = {};
                    attenInfo.punchDate = this.tableData[index].punchDate;
                    attenInfo.beginTime = this.tableData[index].beginTime;
                    attenInfo.endTime = this.tableData[index].endTime;
                    attenInfo.amStartWorktime = this.tableData[index].amStartWorktime;
                    attenInfo.pmEndWorktime = this.tableData[index].pmEndWorktime;
                    attenInfo.processStatus = this.tableData[index].processStatus;
                    attenInfo.absBeginTime = this.selectTimeList[index];
                    attenInfo.absEndTime = this.tableData[index].absEndTime;
                    attenInfo.leaveType = 0;
                    attenInfo.addrId = this.tableData[index].addrId;
                    attenInfo.groupId = this.tableData[index].groupId;
                    attenInfo.prjId = this.tableData[index].prjId;
                    attenInfo.isNew = 0;
                    this.selectAbsBeginTime.push(this.selectTimeList[index]);
                    this.selectTimeList.push(this.tableData[index].absEndTime);

                    this.leaveTypeList.push(0);
                    this.addFlagList.push(true);
                    this.cancleFlagList.push(false);
                    this.isBigDateList.push(false);
                    this.isShowDeleteList.push(false);
                    this.tableData.push(attenInfo);
    
                    //排序，将添加的数据放置到相应位置
                    //将最后插入的一条数据赋值给相应变量
                    let insert = this.tableData[this.tableData.length - 1];
                    this.insertselectTime = this.selectAbsBeginTime[this.selectAbsBeginTime.length - 1];
                    this.insertSelectTime1 = this.selectTimeList[this.selectTimeList.length-1];
                    let insertLeaveType = this.leaveTypeList[this.leaveTypeList.length-1];
                    let isBigDate = this.isBigDateList[this.isBigDateList.length-1];
                    for (var i = this.tableData.length - 1; i >= 0; i--) {
                        if (i > index + 1) {//插入位置之后,后移一位
                            this.selectAbsBeginTime[i] = this.selectAbsBeginTime[i-1];
                            this.selectTimeList[i] = this.selectTimeList[i-1];
                            this.leaveTypeList[i] = this.leaveTypeList[i-1];
                            this.addFlagList[i] = this.addFlagList[i-1];
                            this.cancleFlagList[i] = this.cancleFlagList[i-1];
                            this.isBigDateList[i] = this.isBigDateList[i-1];
                            this.isShowDeleteList[i] = this.isShowDeleteList[i-1];
                            this.tableData[i] = this.tableData[i - 1];
                        }else if (i == index + 1) {//插入位置
                            this.tableData[i] = insert;
                            console.log('000000000');
                            this.selectAbsBeginTime[i] = this.insertSelectTime;
                            this.selectTimeList[i] = this.insertSelectTime1;
                            this.leaveTypeList[i] = insertLeaveType;
                            this.isBigDateList[i] = isBigDate;
                            this.$set(this.addFlagList,i,true);
                            this.$set(this.cancleFlagList,i,true);
                            this.$set(this.isShowDeleteList,i,false);
                        }else{
                            if (i == index) {
                                this.tableData[i].absEndTime = this.insertselectTime;
                                this.selectTimeList[i] = this.insertselectTime;
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
                    console.log("addData",this.tableData);
                }
            }
        },
        handleCancel(index, row){
            console.log("index:",index);
            let selectAbsEndTime = this.selectTimeList[index];
            let punchDate = this.tableData[index].punchDate;
            let punch = new Date(punchDate.replace(/\-/g, "\/"));
            let punchDate1 = punchDate.replace(/\-/g, "\/");

            // let year = new Date().getFullYear();
            // let month = new Date().getMonth()+1;
            // let date = new Date().getDate();
            let current = new Date();
            let sameDateNum = 0;//打卡日期相同的记录条数
            for(let i=index+1;i<this.tableData.length;i++){
                console.log("aaaaaaaaaa");
                console.log(this.tableData[i].punchDate.replace(/\-/g, "\/"));
                console.log("punchDate1",punchDate1);
                if(this.tableData[i].punchDate.replace(/\-/g, "\/") == punchDate1){
                    sameDateNum++;
                }
            }
            console.log("sameDateNum:"+sameDateNum)
            //将当前条记录之后的记录依次前移
            for (var i = index; i < this.tableData.length; i++) {
                if (i == index) {//将当前记录选中的缺勤结束时间赋值给前一条的缺勤结束时间 
                    if(sameDateNum!==0){
                        this.selectTimeList[i-1] = selectAbsEndTime;
                        this.tableData[i-1].absEndTime = selectAbsEndTime;
                        console.log("addFlagList00000",this.addFlagList);
                    }else{
                        this.selectTimeList[i-1] = this.tableData[i].absEndTime;
                        this.tableData[i-1].absEndTime = this.tableData[i].absEndTime;
                        // this.addFlagList[i-1] = true;
                        this.$set(this.addFlagList,i-1,true)
                    }
                    if(punch.getTime()<current.getTime()){
                        this.$set(this.isShowDeleteList,i-1,false);
                    }
                }else{//将当前条记录之后的记录依次前移
                    var attenInfo1 = {};
                    attenInfo1 = this.tableData[i];
                    this.selectAbsBeginTime[i-1] = this.selectAbsBeginTime[i];
                    this.selectTimeList[i-1] = this.selectTimeList[i];
                    this.leaveTypeList[i-1] = this.leaveTypeList[i];
                    this.addFlagList[i-1] = this.addFlagList[i];
                    this.cancleFlagList[i-1] = this.cancleFlagList[i];
                    this.isBigDateList[i-1] = this.isBigDateList[i];
                    this.isShowDeleteList[i-1] = this.isShowDeleteList[i];
                    this.tableData[i-1] = attenInfo1;
                }
            }
            this.tableData.pop();
            this.selectAbsBeginTime.pop();
            this.selectTimeList.pop();
            this.leaveTypeList.pop();
            this.addFlagList.pop();
            this.cancleFlagList.pop();
            this.isBigDateList.pop();
            this.isShowDeleteList.pop();
            console.log("addFlagList",this.addFlagList);

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
                let selectTime = this.selectTimeList[index+addNum];
                this.$set(this.selectTimeList,index,selectTime);
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
               }else{//将当前条记录之后的记录一次前移
                    var attenInfo1 = {};
                        attenInfo1 = this.tableData[i];
                    this.selectAbsBeginTime[i - 1] = this.selectAbsBeginTime[i];
                    this.selectTimeList[i-1] = this.selectTimeList[i];
                    this.leaveTypeList[i-1] = this.leaveTypeList[i];
                    this.cancleFlagList[i-1] = this.cancleFlagList[i];
                    this.addFlagList[i-1] = this.addFlagList[i];
                    this.isBigDateList[i-1] = this.isBigDateList[i];
                    this.isShowDeleteList[i-1] = this.isShowDeleteList[i];
                    this.tableData[i-1] = attenInfo1;
               }
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
            this.leaveTypeList = [];
            this.selectTimeList = [];
            this.selectAbsBeginTime = [];
            this.addFlagList = [];
            this.cancleFlagList = [];
            this.isBigDateList = []
            this.isShowDeleteList = [];
            this.leavetypeIndex = [];
            this.insertselectTime = '';
            this.insertSelectTime1= '';
            this.isSumit = true;
            this.caseFlag = [];//控制case所在地
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
.makeUpAttContent>>>.norecord{text-align: center;margin-top: 0.3rem;color: #999999}
</style>