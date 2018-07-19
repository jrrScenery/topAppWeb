<!--设备清单-->
<template>
  <div class="proMachineView">
    <div class="proMachineTop">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.firm" placeholder="请输入厂商"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.typeNum" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.serialNum" placeholder="请输入序列号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="proMachineBtm">
      <el-table
              :data="tableData"
              style="width: 100%">
        <template v-for="item in proMachineObj">
          <el-table-column
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.lable"
                  :min-width="item.width">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
  import global_ from '../../components/Global'
  import fetch from '../../utils/ajax'

  export default {
    name: 'proMachine',
    props:{
      promachinepage: Number
    },
    components: {

    },
    data () {
      return {
        form: {
          firm: '',
          typeNum: '',
          serialNum: ''
        },
        tableData: [
          {FACTORY_NM: 'HP', type: 'DL380G6', serial: 'CNG944S1VT', startTime: '2017-01-01', endTime: '2017-01-01'}
        ],
        proMachineObj: [
          {prop: 'FACTORY_NM', lable: '厂商', width: '15%'},
          {prop: 'MODEL_NAME', lable: '型号', width: '15%'},
          {prop: 'SN', lable: '序列号', width: '22%'},
          {prop: 'SERVICE_BEGIN', lable: '开始时间', width: '24%'},
          {prop: 'SERVICE_END', lable: '结束时间', width: '24%'}
        ],
        projectId:this.$route.query.projectId,
        pageSize:5,
        busy: false,
        loadall: false
      }
    },
    created () {
//      fetch.get("?action=GetProjectDeviceList&PROJECT_ID="+this.projectId).then(res=>{
//        this.tableData = res.data;
//    });
    },
    methods: {
      onSubmit () {
        fetch.get("?action=GetProjectDeviceList&PROJECT_ID="+this.projectId+"&FACTORY_NAME="+this.form.firm+"&MODEL_NAME="+this.form.typeNum+"&SN="+this.form.serialNum,{}).then(res=>{
          this.tableData = res.data;
        });
      },
      loadmachine(flag){

        this.$axios.get(global_.proxyServer+"?action=GetProjectDeviceList&EMPID="+global_.empId,{params:{PROJECT_ID:this.projectId,PAGE_NUM:this.promachinepage,PAGE_TOTAL:this.pageSize}}).then(res=>{
          //console.log(this.eventListArr);
          if(flag){
            this.tableData = this.tableData.concat(res.data.data);
          }else{
            this.tableData = res.data.data;
          }
          console.log(res.data);
          if(0 == res.data.data.length || res.data.length<this.pageSize ){
            this.busy = true;
            this.loadall = true;
          }
          else{
            this.busy = false;
            this.page++
          }

        });
      }
    },
    watch:{
      promachinepage(curVal,oldVal){
        console.log(curVal+"||"+oldVal);
        this.loadmachine(this.promachinepage>1);
      }
    }
  }
</script>

<style scoped>
  .proMachineView{}
  .proMachineTop{padding: 0.05rem 0.15rem;}
  .proMachineTop >>> .el-form--inline .el-form-item{margin: -0.01rem; width: 28%;}
  .proMachineTop >>> .el-form--inline .el-form-item:last-child{width: 14%;}
  .proMachineTop >>> .el-form--inline .el-form-item .el-input__inner{height: 0.25rem!important; padding: 0 0.05rem; font-size: 0.13rem;}
  .proMachineTop >>> .el-form--inline .el-form-item .el-input__inner::placeholder{font-size: 0.13rem;}
  .proMachineTop >>> .el-button{padding: 0 0.05rem; height: 0.25rem; background: #2698d6; color: #ffffff; font-size: 0.13rem;}
  .proMachineBtm >>> th{padding: 0; background: #f5f5f9}
  .proMachineBtm >>> td{padding: 0;}
  .proMachineBtm >>> .cell{padding: 0 0.05rem; text-align: center; height: 0.3rem; line-height: 0.3rem; font-size: 0.13rem;}
  .proMachineBtm >>> td .cell{overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
</style>
