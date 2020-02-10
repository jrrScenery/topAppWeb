<template>
<div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <el-button type="text" class="headerRight" @click.stop="popBg=!popBg">{{headerRight}}</el-button>
    </header>
    <template v-if="popBg">
        <div class="popBg">
            <template>
                <search-punch-report @change="updatePopBg" @search="searchData" :queryData="queryData"></search-punch-report>
            </template>
        </div>
    </template>
</div>
</template>
<script>
import searchPunchReport from "@/components/searchPunchReport"
import FastClick from 'fastclick'
export default {
    name: 'headerAttenDetail',
    components:{
        searchPunchReport
    },
    data () {
        return {
            headerRight: '查询',
            popBg: false,
        }
    },
    props:['title','queryData','searchType'],
    mounted(){
        FastClick.attach(document.body)
    },
    methods:{
        // popBgChange(){
        //     alert("00000000000");
        //     this.popBg=!this.popBg
        // },
        updatePopBg (data) {
            this.popBg = data.popBg
        },
        searchData (data) {
            this.$emit('searchPro', data)
        },
        back: function (event) {
            this.$router.back(-1)
        }
    }
}
</script>
<style scoped>
header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
h2{display: flex; background: #2698d6;font-size: 0.16rem;}
.headerLeft,.headerRight{top: 0;display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; 
                            height: 0.45rem; font-size: 0.14rem;color: #ffffff;cursor:pointer;-webkit-tap-highlight-color:transparent;}
/* .headerRight{} */
.headerLeft i{font-size: 0.2rem;}
.popBg{background: rgba(0,0,0,0.5); position: fixed; top: 0.45rem; bottom: 0; left: 0; right: 0; z-index: 999; padding: 0 0.25rem;}
</style>