// import AMap from 'AMap'
export default class Location {
    static getLocation(that,success,loading) {
        if (navigator.geolocation) {
            let options = {
                enableHighAccuracy: true,
                maximumAge: 60*1000,
                timeout: 10000,
            };
            navigator.geolocation.getCurrentPosition(           
                (res) => {
                    loading.close();
                    console.log("success:",res);
                    let location = {};
                    location.longitude = res.coords.longitude;
                    location.latitude = res.coords.latitude;
                    location.type = "GPS";
                    success(location);
                },
                (err) => {
                    // loading.close();
                    switch(err.code) { 
                        case err.PERMISSION_DENIED: 
                        loading.close();
                        that.$message({
                            message:'定位失败,用户拒绝请求地理定位',
                            type: 'error',
                            center: true,
                            duration:3000,
                            customClass: 'msgdefine'
                        })
                          break; 
                        case err.POSITION_UNAVAILABLE: 
                        // this.getLngLatLocation(that,success,loading);
                        loading.close();
                        that.$confirm('GPS定位失败,位置信息是不可用,是否使用高德定位?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            center:true,
                            type: 'warning'
                          }).then(() => {
                              console.log("1111111111");
                            this.getGgLocation(that,success,loading);
                          }).catch(() => {
                            console.log("2222222222");
                            that.$message({
                              type: 'info',
                              message: '您已取消高德定位，请检查GPS定位权限是否打开'
                            });          
                          });
                        // that.$message({
                        //     message:'定位失败,位置信息是不可用',
                        //     type: 'error',
                        //     center: true,
                        //     duration:3000,
                        //     customClass: 'msgdefine'
                        //   })
                          break; 
                        case err.TIMEOUT: 
                        // this.getLngLatLocation(that,success,loading);
                        loading.close();
                        that.$confirm(`GPS定位失败,请求获取用户位置超时,
                                       是否使用高德定位?`, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center:true
                          }).then(() => {
                            this.getGgLocation(that,success,loading);
                          }).catch(() => {
                            that.$message({
                              type: 'info',
                              message: '您已取消高德定位，请检查GPS定位权限是否打开'
                            });          
                        });
                        // that.$message({
                        //     message:'定位失败,请求获取用户位置超时',
                        //     type: 'error',
                        //     center: true,
                        //     duration:3000,
                        //     customClass: 'msgdefine'
                        //   })
                          break; 
                        case err.UNKNOWN_ERROR: 
                        loading.close();
                        that.$message({
                            message:'定位失败,定位系统失效',
                            type: 'error',
                            center: true,
                            duration:3000,
                            customClass: 'msgdefine'
                        })
                          break; 
                    } 
                },
                options
            );
        } else {
            loading.close();
            console.log("Geo location not supported.");
            callback.error("Geo location not supported.");
        }
    }
    static getGgLocation(that,success,loading){
        const self = this;
        const loading2 = that.$loading({
            lock: true,
            text: '正在通过高德获取位置信息...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.3)'
        });
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);
            function onComplete(data) {
                loading.close();
                loading2.close();
                // data是具体的定位信息
                console.log('定位成功信息：', data);
                let location = {};
                    location.longitude = data.position.lng;
                    location.latitude = data.position.lat;
                    location.type = "gd";
                    success(location);
            }

            function onError(data) {
                loading2.close();
                // loading.close();
                // 定位出错
                // that.$message({
                //     message:"定位出错:"+data.message,
                //     type: 'error',
                //     center: true,
                //     duration:3000,
                //     customClass: 'msgdefine'
                // })
                // console.log('定位失败错误：', data);
                // 调用ip定位
                self.getLngLatLocation();
            }
        })
    }
    static getLngLatLocation(that,success,loading){
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
                loading.close();
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    console.log('通过ip获取当前城市：', result);
                    if(result.info == 'OK'){
                        let location = {};
                        location.longitude = result.rectangle.split(';')[0].split(',')[0];
                        location.latitude = result.rectangle.split(';')[0].split(',')[1];
                        console.log("location",location);
                        success(location);
                    }
                }else{
                    that.$message({
                        message:"ip定位失败",
                        type: 'error',
                        center: true,
                        duration:3000,
                        customClass: 'msgdefine'
                    })
                }
            })
        })
    }
}



   