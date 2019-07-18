export default{
    updateUserPermission(userPermission){      
        fetch.get("?action=getDict&type=GPS_UPDATE_INTERVAL",{}).then(res=>{
          console.log("getDict",res);
          this.interval = res.data[0].name;
          
          let ua = navigator.userAgent.toLowerCase();
          //let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断iPhone|iPad|iPod|iOS
          if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
            var info={action:"location",empId:localStorage.getItem('empId')}
            window.webkit.messageHandlers.ioshandle.postMessage({body: info});
          }else if(typeof(android)!="undefined"){
            var value = "{action:location,empId:"+localStorage.getItem('empId')+"}";
            console.log("value",value);
            android.getClient(value);
          }
          this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
        });
      }
}