<!--管理舱-->
<template>
  <div class="ManagerView">
    <ul class="ul_workBench" v-for="items in workBenchObj" :key="items.id">

        <template v-for="item in items.arr" >
          <li v-if="item.display" class="li_workBench" :key="item.id">
            <router-link :to="{name:item.href,params:item.params}" >
              <img  :src="item.imgSrc" alt=""  >
            </router-link>
            <span>{{item.text}}</span>
          </li>
          <li v-else class="li_workBench" :key="item.id" style="display:none">
            <router-link :to="{name:item.href,params:item.params}" >
              <img  :src="item.imgSrc" alt=""  >
            </router-link>
            <span>{{item.text}}</span>
          </li>
      </template>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'workBench',

  components: {
  },

  data () {
    return {
      workBenchObj: [
        {arr: [
          {imgSrc: require('@/assets/images/manage_1.png'), text: '项目管理', href: 'workBenchInfo',display:true},
          {imgSrc: require('@/assets/images/manage_2.png'), text: '事件管理', href: 'workBenchEventInfo',display:true},
          {imgSrc: require('@/assets/images/manage_3.png'), text: '人员管理', href: 'workBenchPeopleInfo',display:true},
          {imgSrc: require('@/assets/images/manage_4.png'), text: '备件管理', href: 'workBenchParts',display:true},
          {imgSrc: require('@/assets/images/manage_5.png'), text: '供应商管理', href: 'workBenchSupplier',display:true},
          {imgSrc: require('@/assets/images/manage_6.png'), text: 'PO管理', href: 'workBenchPOinfo',display:true},
          {imgSrc: require('@/assets/images/manage_7.png'), text: '质量管理', href: 'workBenchQualityControl',display:true},
        ]}
      ],
      pickerValue:null
    }
  },
  mounted () {
    let permissions = JSON.parse(localStorage.getItem("userPermission"));
    console.log("permissions",permissions);
    for(let i=0;i<permissions.length;i++){
      if(permissions[i].PRIVID=='workFlow_business_statistics'){
        this.workBenchObj[0].arr[0].display = true;
        this.workBenchObj[0].arr[1].display = true;
        this.workBenchObj[0].arr[2].display = true;
        this.workBenchObj[0].arr[3].display = true;
        this.workBenchObj[0].arr[4].display = true;
        this.workBenchObj[0].arr[5].display = true;
        this.workBenchObj[0].arr[6].display = true;
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .ManagerView{ width: 100%;}
  .ManagerView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;}
  .ManagerView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
  .ManagerView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center; font-size: 0.15rem;}
  .ManagerView .ul_workBench .li_workBench:nth-child(n+4){margin-top: 0.15rem;}
  .ManagerView img{ width: 0.3rem; height: 0.3rem; margin: auto;}
</style>