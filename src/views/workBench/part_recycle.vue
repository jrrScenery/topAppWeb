<template>
  <div class="workBenchPartRecycle">
    <header-last :title="workBenchPartRecycleTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div>
        <el-form label-width="100px" label-position="left">
            <p>基本信息</p>
            <el-form-item label="回收申请人：">
                <el-input v-model="main.empname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申请时间:">
                <el-col :span="24" v-model="currentdate" >
                <!-- <el-input v-model="currentdate"></el-input> -->
                <el-date-picker type="datetime" placeholder="请选择可回收时间" style="width: 100%;"  v-model="currentdate"></el-date-picker>
                </el-col>
                 <!-- <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="currentdate" style="width: 100%;"></el-time-picker>
                 </el-col> -->
            </el-form-item>
            <el-form-item label="回收联系人：">
                <el-input v-model="main.customerLinkman"></el-input>
            </el-form-item>
            <el-form-item label="手机:">
                <el-input v-model="main.customerTel"></el-input>
            </el-form-item>
            <el-form-item label="回收地点:">
                <el-input v-model="main.customerAddress"></el-input>
            </el-form-item>
            <el-form-item label="客户交接地址:">
                <el-input v-model="main.customerAddress"></el-input>
            </el-form-item>
            <el-form-item label="可回收时间:">
                <el-col :span="24" v-model="currentdate" >
                <!-- <el-input v-model="currentdate"></el-input> -->
                <el-date-picker type="datetime" placeholder="请选择可回收时间" style="width: 100%;"  v-model="currentdate"></el-date-picker>
                </el-col>
                 <!-- <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="currentdate" style="width: 100%;"></el-time-picker>
                 </el-col> -->
            </el-form-item>
            <el-form-item label="回收单要求:" >
                <el-input type="textarea" placeholder="选填，请填写回收单要求" :rows="3" v-model="remark"></el-input>
            </el-form-item>
                <p>温馨提示：通过第三方物流陆运方式发货，运费到付。推荐顺丰物流 客服电话 <a @click="sendCall" v-bind:href="'tel:95338'"  style="font-size: 0.13em; color: #2698d6;">95338</a>。</p>
                <p>回收安排信息</p>
            <el-form-item label="回收件收货人:">
                <el-input v-model="recycleInfo.recyclePerson" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回收件收货人联系方式:" label-width="40%">
                <el-input v-model="recycleInfo.recycleContact" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回收件收货地址:">
                <el-input v-model="recycleInfo.recycleAddr" :rows="0.5" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="物流公司:">
                <el-select v-model="transportCompany">
                    <el-option v-for="item in supplier"  :key="item.key" :label="item.supplierName"  :value="item.supplierId">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="物流单号:">
                <el-input placeholder="请填写物流单号:" v-model="recycleInfo.transportCode"></el-input>
            </el-form-item>
            <el-form-item label="回收物流类型">
                <el-select v-model="recycleInfo.sendType">
                    <el-option  :key="1" label="第三方物流"  :value="1">
                    </el-option>
                    <el-option  :key="5" label="供应商回收自取"  :value="5">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="回寄说明:">
                <el-input type="textarea" placeholder="请填写回寄说明" :rows="3" v-model="recycleInfo.remark"></el-input>
            </el-form-item>
            </el-form>
            <el-button type="primary" @click="dialogVisible=true">我要寄件</el-button>
                <el-button type="primary" @click="onSubmit2(2)" >暂存</el-button>
                <el-button type="primary" @click="onSubmit2(1)">提交</el-button>
                <el-button type="primary" >关闭</el-button>
            </div>
            <div>
    <el-dialog :visible.sync="dialogVisible" width="80%">
        <el-form class="form1" style="color:#333333" label-width="80px">
            <p>发件人信息</p>
          <el-form-item label="发货人">
            <el-input class="input1" v-model="main.empname" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item label="发货人手机">
            <el-input v-model="main.recyclePhone"></el-input>
          </el-form-item>
        <el-form-item label="发货城市">
            <el-input class="input1" v-model="main.customerAddress" style="font-size:6px width:20px"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="main.customerAddress"></el-input>
          </el-form-item>
        <p>收货人信息</p>
          <el-form-item label="收货人">
            <el-input class="input1" v-model="recycleInfo.recyclePerson" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item label="收货人手机">
            <el-input v-model="recycleInfo.recycleContact"></el-input>
          </el-form-item>
        <el-form-item label="收货人城市">
            <el-input class="input1" v-model="recycleInfo.recycleCity" style="font-size:6px width:20px"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="recycleInfo.recycleAddr"></el-input>
          </el-form-item>
        </el-form>
        <div style="algin-text:center">
          <el-button type="primary" @click="dialogVisible = false" >取消</el-button>
          <el-button type="primary" @click="onSubmit1" >顺丰下单</el-button>
        </div>
    </el-dialog>
    </div>
 </div>
</template>
<script>
// import eventBaseInfo from '../../components/event/eventBaseInfo'
// import eventProgress from '../../components/event/eventProgress'
// import eventPeople from '../../components/event/eventPeople'
import eventParts from "../../components/event/eventParts";
import HeaderLast from "../header/headerLast";
import fetch from "../../utils/ajax";

export default {
  components: {
    HeaderLast
  },
  data() {
    return {
      workBenchPartRecycleTit: "备件回收",
      activeName: "first",
      transportCompany: "",
      transportCode: "",
      transportCompanytype: "",
      remark: "",
      dialogVisible:false,
      //   form:{
      main: {
        empname: "",
        applyOn: "",
        customerLinkman: "",
        customerTel: "",
        customerAddress: "",
        recyclePhone:"",
        ifSave:"",
      },
      parts: [],
      recycleInfo: {
        recyclePerson: "",
        recycleContact: "",
        recycleCity:"",
        recycleAddr: "",
        sendType:"",
        remark: ""
      },
      supplier: {},
      // date:"",
      currentdate: ""

      // applicant:"张三",
      // apTime:"2018-08-15 09:50:24",
      // contactor:"张三",
      // apPhone:"11111111",
      // region:"北京市朝阳区",
      // haAddress:"北京市朝阳区办公楼",
      // reTime:"2018-08-20",
      // require:"没有要求",
      // receiver:"李四",
      // rePhone:"444444444444",
      // reAdress:"北京市东城区",
      // delivery:"顺丰",
      // cardNum:"SF8888665",
      // goBack:"是",
      // description:"这是回寄说明",
      //   },
    };
  },

  created: function() {
    this.currentdate = new Date();

    this.parts = this.$route.params.parts;
    fetch.get("?action=/parts/getPartsCanRecycle&CASE_ID=124769").then(res => {
      console.log(res);
      //   let remain=;
      //   let rr=res.;
      this.main = res.main[0];
      this.recycleInfo = res.recycleInfo[0];
      this.supplier = res.supplier;
      console.log("111111111")
      console.log(this.parts);
      console.log(this.main);
      console.log(this.recycleInfo);
    });
  },
  methods: {
      onSubmit1(){
        let kd={};
        kd.OrderCode=new Date().getTime();
        var sender = {};
        sender.Name=main.empname;
        sender.Mobile=main.recyclePhone;
        sender.CityName=main.customerAddress;
        sender.Address=main.customerAddress;
        kd.Sender=sender;
        var receiver ={};
        receiver.Name=recycleInfo.recyclePerson;
        receiver.Mobile=recycleInfo.recycleContact;
        receiver.CityName=recycleInfo.recycleCity;
        receiver.Address=recycleInfo.recycleAddr;
        kd.Receiver=receiver
        var commodity=new Array();
        var c={};
        commodity.push(c);
        kd.Commodity=commodity;
      },
    onSubmit2(type) {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      var details=new Array();
      details=vm.parts;
      for(var i=0;i<details.length;i++){
        if(details[i].recycleMId==null||details[i].recycleMId==""){
          this.main.ifSave=1;
          break;
        }
      }
      let postData=new URLSearchParams;
      postData.append('main',JSON.stringify(vm.main)),
      postData.append('details',JSON.stringify(vm.parts));
      postData.append('recycleInfo',JSON.stringify(vm.recycleInfo));

      // let params="&main="+this.main+"&parts="+this.parts+"&recycleInfo"+this.recycleInfo;
      // console.log(params);
      if(type==1){
      fetch.post("?action=/parts/insertRecycleApply&CASE_ID=124769"+postData).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                this.dialogVisible0=false;
                this.dialogVisible1=false;
                location.reload;
                
              }else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
              }
              console.log(res);
      });
      }
      if(type==2){
        fetch.post("?action=/parts/submitPartsRecycle&CASE_ID=124769"+postData).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                this.dialogVisible0=false;
                this.dialogVisible1=false;
                location.reload;
                
              }else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
              }
              console.log(res);
        });
      }
    }
  }
};
</script>
<style>
.el-form {
  margin: 0.1rem 0.2rem 0.2rem 0.2rem;
}
.el-form .el-form-item {
  margin: 0.04rem 0 0 0rem;
}
.el-form .el-form-item label {
  font-size: 10px;
}
.el-form .el-form-item .el-input {
  border: none;
}
.el-form p {
  font-size: 10px;
  font-weight: bold;
  display: block;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
}
.el-button {
  margin: 0.1rem 0.2rem 0.2rem 0.2rem;
  padding: 0.08rem 0.1rem;
  color: #ffffff;
  background: #2698d6;
}
.el-dialog .el-roe .el-col .el-input{font-size: 6px}
</style>
