<template>
  <div class="helpDetailView">
    <header-last :title="helpDetailTit"></header-last>
    <div style="height:0.45rem"></div>
    <div class="pdf" v-show="fileType === 'pdf'">
      <p class="arrow">
        <el-button @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</el-button>
        {{currentPage}} / {{pageCount}}
        <el-button
          @click="changePdfPage(1)"
          class="turn"
          :class="{grey: currentPage==pageCount}"
        >下一页</el-button>
      </p>
      <pdf
        :src="src"
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"
      ></pdf>
    </div>
  </div>
</template>
<script>
import headerLast from "../header/headerLast"
import pdf from "vue-pdf"
export default {
  name: "helpDetail",
  components: {
    headerLast,
    pdf
  },
  data() {
    return {
      helpDetailTit: "详情",
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      src: this.$route.params.value, // pdf文件地址
    }
  },
  created() {
    this.src = pdf.createLoadingTask(this.src)
  },
  methods: {
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    }
  }
}
</script>
<style scoped>
.helpDetailView {
  width: 100%;
  overflow: scroll;
  position: relative;
  font-size: 0.12rem;
  margin: 0.05rem 0;
}
.helpDetailView >>> .el-tree-node__content {
  height: 0.4rem;
}
.helpDetailView >>> .el-tree-node__label {
  font-size: 0.16rem;
}
</style>