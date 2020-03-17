// import AMap from 'AMap'
export default class Location {
    static getLocation(success) {
        console.log("pppppppppppp");
        if (navigator.geolocation) {
            let options = {
                enableHighAccuracy: true,
                maximumAge: 60*1000,
                timeout: 10000,
            };
            navigator.geolocation.getCurrentPosition(           
                (res) => {
                    console.log("success:",res);
                    let location = {};
                    location.longitude = res.coords.longitude;
                    location.latitude = res.coords.latitude;
                    location.type = "GPS";
                    success(location);
                },
                (err) => {
                    console.log("fali:获取位置失败！"+err);
                    switch(err.code) { 
                        case err.PERMISSION_DENIED: 
                          break; 
                        case err.POSITION_UNAVAILABLE: 
                          break; 
                        case err.TIMEOUT: 
                          break; 
                        case err.UNKNOWN_ERROR: 
                          break; 
                    } 
                },
                options
            );
        } else {
            console.log("Geo location not supported.");
            callback.error("Geo location not supported.");
        }
    }
}



   