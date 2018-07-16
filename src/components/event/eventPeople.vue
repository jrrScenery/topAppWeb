<!--人员地图-->
<template>
  <div class="eventPeopleView" id="content">
    <div class="searchBox">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.eventNum" placeholder="请输入事件编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>转到</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.orderNum" placeholder="请输入派单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>转到</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.place" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="peopleAllMap"></div>
    <div class="peopleinfo" :class="{infoon: infoon}">
      <div class="infoh" @click="infoon=!infoon">参与工程师信息</div>
      <ul class="ulpeoinfo">
        <li v-for="item in workerData" :key="item.WORK_ID">
          <div class="imgbox">
            <img src="" alt="">
            <i>{{item.RESOURCE_TYPE}}</i>
          </div>
          <div class="txtbox">
            <p class="orderid">{{item.WORK_CD}}</p>
            <p class="pname">
              <span class="name">{{item.WORKER_NAME}}</span>
              <span class="tel">{{item.PHONE}}</span>
              <span class="workerstatus">{{item.BUSY_STATUS}}</span>
            </p>
            <p class="addr">{{item.ADDRESS}}</p>
            <p class="time">预计开始时间：{{item.BEGIN_TIME}}</p>
            <p class="desc">
              {{item.WORK_REQUIRE}}
            </p>
            <span class="workstatus">{{item.WORK_STATUS}}</span>
          </div>
          
        </li>
        
      </ul>
    </div>
  </div>
  
</template>



<script>
import global_ from '../../components/Global'
import BMap from 'BMap'
export default {
  name: 'eventPeople',

  components: {

  },
  data () {
    return {
      form: {
        eventNum: '',
        orderNum: '',
        place: ''
      },
      infoon: false,
      detaildata:{},
      workerData:[]
    }
  },

  mounted () {
    this.loadpoint();
  },
  methods: {
    loadpoint(){
      this.$axios.get(global_.proxyServer+"?action=GetMapEngineer&EMPID="+global_.empId,{params:{CASE_ID:+this.$route.query.caseId}}).then(res=>{
        if("0"== res.data.STATUSCODE){
          this.detailData = res.data.detailData;
          var workerArr = res.data.workerData;
          this.workerData = workerArr.filter(function(item){
            return  1==item.LOCATION_TYPE ;
          });


          if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            let winHeight = document.documentElement.clientHeight
            let mapHeight = document.getElementById('peopleAllMap')
            let contentHeight = document.getElementById('content')
            mapHeight.style.height = winHeight - 200 + 'px'
            contentHeight.style.height = winHeight - 150 + 'px'
            //console.log(mapHeight.style.height)
          }
          let map = new BMap.Map('peopleAllMap')
          let cpoint = new BMap.Point(this.detailData.longitude, this.detailData.latitude)
          map.centerAndZoom(cpoint, 12)

          addMarker(cpoint,require("../../assets/images/maperror.png"));

          this.workerData.forEach(element => {
            console.log(element.LONGITUDE);
            var point = new BMap.Point(element.LONGITUDE, element.LATITUDE);
            addMarker(point,require("../../assets/images/mapworker.png"));
          });


          function addMarker(point, imgurl,index){  // 创建图标对象   
              var myIcon = new BMap.Icon(imgurl, new BMap.Size(23, 25), {    
                  anchor: new BMap.Size(10, 25),    
                  imageOffset: new BMap.Size(0,0)     
              });      
              var marker = new BMap.Marker(point, {icon: myIcon});    
              marker.addEventListener("click",function(e){
                console.log(e);
                map.zoomTo(map.getZoom() + 1);    
              })
              map.addOverlay(marker);    
          }    

        }
        
      });
    }
  }
}
</script>

<style scoped>
  
  .eventPeopleView{padding: 0 0.15rem;}
  .searchBox{width: 100%; height: 0.5rem; background: #175a91}
  .searchBox >>> .el-form-item{margin: 0 -0.01rem; display: inline-block}
  .searchBox >>> .el-form-item:nth-child(2n){width: 10%}
  .searchBox >>> .el-form-item:nth-child(2n+1){width: 22%;}
  .searchBox >>> .el-input{line-height: 0.5rem}
  .searchBox >>> .el-input__inner{padding: 0; background: #376fa0; height: 0.3rem; line-height: 0.3rem}
  .searchBox >>> .el-button{padding: 0; background: #169ad6}
  #peopleAllMap{}

  .peopleinfo{ position: absolute; left: 0;right: 0; top: 100%; transform: translate(0,-0.3rem); background: #fff; transition: all 0.3s;}
  .infoon{ transform: translate(0,-2rem);}
  .peopleinfo .infoh{ line-height: 0.3rem; text-align: center;}
  .ulpeoinfo{ }
  .ulpeoinfo li{ display: flex;}
  .ulpeoinfo li .imgbox{ width: 0.5rem; height: 0.5rem;}
  .ulpeoinfo li .imgbox img{ width: 0.5rem; display: block;}
  .ulpeoinfo li .imgbox i{}
  .ulpeoinfo li .txtbox{ flex-grow: 1; position: relative;}
  .ulpeoinfo li .txtbox p{}
  .ulpeoinfo li .txtbox .workstatus{ position: absolute; right: 0.1rem; top: 0.06rem;}
</style>
