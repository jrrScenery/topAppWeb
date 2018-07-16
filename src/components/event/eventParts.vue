<!--备件地图-->
<template>
  <div class="eventPartsView" id="content">
    <div class="searchBox">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.eventNum" placeholder="请输入事件编号"></el-input>
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
    <div id="allmap"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'eventParts',

  components: {

  },

  data () {
    return {
      form: {
        eventNum: '',
        place: ''
      }
    }
  },

  mounted () {
    this.ready()
  },

  methods: {
    ready () {
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        let winHeight = document.documentElement.clientHeight
        let mapHeight = document.getElementById('allmap')
        let contentHeight = document.getElementById('content')
        mapHeight.style.height = winHeight - 200 + 'px'
        contentHeight.style.height = winHeight - 150 + 'px'
        //console.log(mapHeight.style.height)
      }
      let map = new BMap.Map('allmap')
      let point = new BMap.Point(116.400244, 39.92556)
      map.centerAndZoom(point, 12)
      let marker = new BMap.Marker(point)
      map.addOverlay(marker)
      marker.addEventListener('click', getAttr)
      function getAttr () {
        let p = marker.getPosition()
        alert('marker的位置是' + p.lng + ',' + p.lat)
      }
    }
  }
}
</script>

<style scoped>
  .eventPartsView{padding: 0 0.15rem}
  .searchBox{width: 100%; height: 0.5rem; background: #175a91}
  .searchBox >>> .el-form-item{margin: 0 -0.01rem; display: inline-block}
  .searchBox >>> .el-form-item:nth-child(2n){width: 15%}
  .searchBox >>> .el-form-item:nth-child(2n+1){width: 33%;}
  .searchBox >>> .el-input__inner{padding: 0;}
  .searchBox >>> .el-button{padding: 0;}
  #allmap{}
</style>
