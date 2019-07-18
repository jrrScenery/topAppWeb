export default class Location {
    static getLocation(success,loading) {
        if (navigator.geolocation) {
            let options = {
                enableHighAccuracy: true,
                maximumAge: 60*1000
            };
            navigator.geolocation.getCurrentPosition(           
                (res) => {
                    loading.close();
                    console.log("success:",res);
                    let location = {};
                    location.longitude = res.coords.longitude;
                    location.latitude = res.coords.latitude;
                    success(location);
                },
                (err) => {
                    loading.close();
                    // callback.error(res);
                    switch(err.code) { 
                        case err.PERMISSION_DENIED: 
                          this.$message({
                            message:'定位失败,用户拒绝请求地理定位',
                            type: 'error',
                            center: true,
                            duration:3000,
                            customClass: 'msgdefine'
                          })
                          break; 
                        case err.POSITION_UNAVAILABLE: 
                          this.$message({
                            message:'定位失败,位置信息是不可用',
                            type: 'error',
                            center: true,
                            duration:3000,
                            customClass: 'msgdefine'
                          })
                          break; 
                        case err.TIMEOUT: 
                          this.$message({
                            message:'定位失败,请求获取用户位置超时',
                            type: 'error',
                            center: true,
                            duration:3000,
                            customClass: 'msgdefine'
                          })
                          break; 
                        case err.UNKNOWN_ERROR: 
                          this.$message({
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
}

   