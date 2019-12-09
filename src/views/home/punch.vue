<template>
    <div class="punchView">
        <header-last :title="punchTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="punchCard">
            <div class="locationLoading" v-if="differDistance=='null'">正在获取位置信息...</div>
            <div class="locationLoading" v-else>
                <div>您当前位置为:{{address}}</div>
                <div>您当前驻场位置为:{{zcAddress}}</div>
                <div></div>
            </div>

            <div class="buttonDiv">
                <el-button class="punchButton">打卡</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
import BMap from 'BMap'
import LocationSdk from "@/utils/wxUtils"
export default {
    name:'punch',
    components:{
        headerLast
    },
    data(){
        return{
            punchTit:'打卡',
            zcInfo:null,  //驻场为空信息
            address:'',
            differDistance:null,
            zcAddress:null
        }
    },
    created(){
        this.getLocation();
    },
    methods:{
        confirm(){
            this.warnVisible = true;
            this.$router.push({name: 'attendence',query: {}});
        },
        getLocation:function(){
            var self = this;
            const loading = this.$loading({
                lock: true,
                text: '正在获取位置信息...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            self.getZcLocationInfo();
            function success(res){
                var lat = res.latitude;//gps经纬度
                var lng = res.longitude;//gps经纬度
                setTimeout(function () {
                    self.gpsPoint = new BMap.Point(lng,lat);
                    var convertor = new BMap.Convertor();
                    var pointArr = [];
                        pointArr.push(self.gpsPoint);
                    convertor.translate(pointArr, 1,5, function (point) {  
                        self.latitude = point.points[0].lat;
                        self.longitude = point.points[0].lng;
                        self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  //转为百度地址
                        if(self.location.length==0){
                            self.$message({
                                message:'驻场地址为空,无法打卡',
                                type: 'error',
                                center: true,
                                duration:3000,
                                customClass: 'msgdefine'
                            }) 
                            // setTimeout(function(){self.$router.push({ name: 'home',query: { rancode: (new Date()).valueOf()}})},3000);
                        }else{
                            for(let i=0;i<self.location.length;i++){
                                if(self.location[i].LATITUDE!=null&&self.location[i].LONGITUDE!=null){
                                    self.getDistance(self.location[i]);
                                }
                            }
                        }           
                        var geoc = new BMap.Geocoder(); 
                        geoc.getLocation(self.pointA, function(rs){//逆地址解析出具体位置
                            console.log("rs:",rs);
                            if(rs.surroundingPois.length!=0){
                                self.address = rs.surroundingPois[0].address+rs.surroundingPois[0].title;             
                            }else{
                                self.address = rs.address+rs.business;  
                            }
                        })  
                    });
                },1000)
            }
            LocationSdk.getLocation(this,success,loading)
        },
        getZcLocationInfo:function(){
            fetch.get("?action=/system/getProAttendanceAddress",{}).then(res=>{
                console.log("getProAttendanceAddress:",res);
                if(res.STATUSCODE=='1'){
                    let location = res.data;
                    this.location = location;
                }else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        duration:1000,
                        customClass: 'msgdefine'
                    });
                }
            })
        },
        // 测量百度地图两个点间的距离
        getDistance:function (location) {
            let latitude = location.LATITUDE;
            let longitude = location.LONGITUDE;
            let addressId = location.ADDRESS_ID;
            var map = new BMap.Map('')
            var pointB = new BMap.Point(parseFloat(longitude), parseFloat(latitude))  // 店铺的经纬度
            var distance = (map.getDistance(this.pointA, pointB) / 1000).toFixed(2) // 保留小数点后两位
            if(this.differDistance!=null){
                if(distance<this.differDistance){
                    this.differDistance = distance;
                    this.addressId = addressId;
                    this.amStartTime = location.amStartTime;
                    this.pmEndTime = location.pmEndTime;
                }
            }else{
                this.differDistance = distance;
                this.addressId = addressId;
                this.distance = location.distance;
                this.amStartTime = location.amStartTime;
                this.pmEndTime = location.pmEndTime;
            }
        },
    }
}
</script>
<style scoped>
.punchView{width:100%;height: 100%;background: #ffffff}
.locationLoading{text-align: center;margin-top: 0.3rem}
.buttonDiv{text-align: center;margin: 0.5rem}
.punchButton{background: #2698d6;color: #ffffff;border-radius: 50%;width: 1.5rem;height: 1.5rem;}
.dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>