<script>
// const Server='http://localhost:8081';
//const Server='http://47.104.200.60/api/proxy';
//const Server='http://47.104.236.209:8084';
// const Server='http://139.129.207.35:8081/topAppWebProxy'
// const Server='http://192.168.0.100:8081'
// const Server='http://111.203.122.61:8081/topAppServer'
const Server='https://wxjfb.dcits.com/topAppWebProxy'
const proxyServer=Server+'/api/proxy';
let empId = "";
let userInfo = [];
let userPermission = [];
let userRole = [];

export default
{
  Server,
  proxyServer,
  empId,
  userInfo,
  userPermission,
  userRole
}
</script>
