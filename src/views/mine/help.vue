<template>
  <div class="helpView">
    <header-last :title="helpTit"></header-last>
    <div style="height:0.45rem"></div>
    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      ref="tree"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
import global_ from '../../components/Global'
export default {
  name: "help",
  components: {
    headerLast
  },
  data() {
    return {
      helpTit: "帮助",
      filterText: "",
      true: "true",
      data: [],
      defaultProps: {
        children: "files",
        label: "fileName"
      }
    };
  },
  created() {
    this.getWiki();
  },
  methods: {
    getWiki(){
      this.$axios.get(global_.Server+"/api/wiki", {}).then(res => {
        console.log("getWiki",res);
        this.data = res.data
      })
    },
    handleNodeClick(value, data, node) {
      console.log("value",value);
      console.log("data",data);
      if (value.files == undefined) {
        console.log("可以跳转");
        console.log("value的url内容是："+value.url);
        this.$router.push({name: 'helpDetail', params: {value: value.url}})
      } else {
        console.log("bu 可以跳转");
      }
    },
  }
};
</script>
<style scoped>
.helpView {
  width: 100%;
  overflow: scroll;
  position: relative;
  font-size: 0.12rem;
  margin: 0.05rem 0;
}
.helpView >>> .el-tree-node__content {
  height: 0.4rem;
}
.helpView >>> .el-tree-node__label {
  font-size: 0.16rem;
}
</style>