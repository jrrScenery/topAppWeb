<template>
  <div class="wikiHelpView">
    <header-last :title="wikiHelpTit"></header-last>
    <div style="height:0.45rem"></div>
    <div class="treeView">
        <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">           
        </el-tree>
    </div>
  </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from '../../utils/ajax'
import global_ from '../../components/Global'
// import pdf from 'vue-pdf'
export default {
    name:'wikiHelp',
    components:{
        headerLast
    },
    data(){
        return{
            wikiHelpTit:"wiki帮助",
            data: [{
                label: '交付宝操作手册',
                children: [{
                    label: '交付宝操作手册.doc',
                    href:"../../assets/word/test.docx"
                }]
            }, {
                label: '交付宝问题整理',
                children: [{
                    label: '交付宝常见问题解决方案.doc',
                    href:"https://wxjfb.dcits.com/test.doc"
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created(){
        this.$axios.get(global_.Server+"/api/wiki").then(res=>{
            console.log("wiki",res);
            this.data[0].label = res.data[0].fileName;
            this.data[0].children[0].label = res.data[0].fileName;
            this.data[0].children[0].href = res.data[0].url
        })
    },
    methods:{
        handleNodeClick(data) {
            console.log("111",data);   
        }
    }
}
</script>
<style scoped>
.wikiHelpView{width: 100%;height:100%;background: #ffffff}
.treeView{background: #ffffff}
.treeView >>>.el-tree-node .el-tree-node__content{height: 0.5rem}
/* .treeView >>>.el-tree .el-tree-node:nth-child(2n+1){background: #f7f7f7} */
</style>