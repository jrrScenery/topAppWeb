<template>
    <div class='monthDetailView'>
        <div class="monthContent">
            <el-date-picker type="month" placeholder="请选择日期" v-model="date" style="width: 80%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            <ul class="ul_AttenView" @click="getMonthDetail">
                <li class="li_AttenView" v-for="item in monthDetailArr" :key="item.id" :data-id='item.attnIds'>
                    <template>
                        <span :data-id='item.attnIds'>{{item.leaveType}}</span>
                        <span style="text-align:right;padding-right:0.2rem" :data-id='item.attnIds'>{{item.personNum}}</span>
                        <i class="el-icon-arrow-right" :data-id='item.attnIds'></i>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'monthDetail',
    components:{
    },
    data(){
        return{
            monthDetailArr:[
                {
                    attnIds: "679824",
                    leaveType: "缺勤记录",
                    personNum: "1人"
                },{
                    attnIds: "661321,661322,664451,668447,672420,681611,681612,684886,684887,688927,688928,688929,693812,693813,698451,701718,705773,709936,714194,718776,718777,723049",
                    leaveType: "漏打卡",
                    personNum: "22人"
                }
            ],
            date:''
        }
    },
    created(){
        let current = new Date();
        this.date = current.getFullYear()+"-"+current.getMonth();
    },
    methods:{
        getMonthDetail:function(event){
            console.log(event);
            event = (event || window.event);
            let target = (event.target || event.srcElement);
            let id = target.getAttribute('data-id');
            this.$router.push({name:'monthTypeDetail',query:{attnIds:id}})
        },
        noKeyword () {
            document.activeElement.blur()
        },
    }
}
</script>
<style scoped>
.monthDetailView{width: 100%;height: 100%;overflow: scroll;position: relative;}
.monthContent{background: #ffffff;margin: 0.2rem;color: #999999;left: 0; top: 0.5rem; bottom: 0.45rem;}
.ul_AttenView .li_AttenView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
.ul_AttenView .li_AttenView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_AttenView .li_AttenView span{width: 100%; text-align: left; color: #262626;font-size:0.15rem}
</style>