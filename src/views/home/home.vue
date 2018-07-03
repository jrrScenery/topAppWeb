<!--首页-->
<template>
  <div class="homeView">
    <div class="swiper">
      <el-carousel trigger="click" arrow="never" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in 4" :key="item" style="background: black">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">

      <div class="event">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_1.png" alt="">
            {{eventTitle}}
          </div>
          <router-link :to="{name:'eventList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="caseData"
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in eventTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'health'">
                  <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #e9c430;"></span>
                  <!-- <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #be330d;"></span> -->
                </template>
                <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="program">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_2.png" alt="">
            <router-link :to="{name:'programList'}">
            {{programTitle}}
            </router-link>
          </div>
          <div class="titleRight">{{more}}</div>
        </div>
        <el-table
          :data="projData"
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in programTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'programName'">
                  <div style="display: flex;">
                    <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                    <span class="table_name">{{ scope.row.programName }}</span>
                  </div>
                </template>
                <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="opinion">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_3.png" alt="">
            <router-link :to="{name:'eventEvaluation'}">
              {{opinionTitle}}
            </router-link>
          </div>
          <div class="titleRight">{{more}}</div>
        </div>
        <div class="opinionTab">
          <el-tabs v-model="activeName" type="card">
            <template v-for="item in opinionTab">
              <el-tab-pane :label="item.label" :name="item.name">
                  <el-table
                    :data="item.data"
                    style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
                    <template v-for="item in item.table">
                      <el-table-column
                        :fixed="item.fixed"
                        :key="item.id"
                        :prop="item.prop"
                        :label="item.label"
                        :min-width="item.width">
                        <template slot-scope="scope">
                          <template v-if="item.prop == 'programName'">
                            <div style="display: flex;">
                              <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                              <span class="table_name">{{ scope.row.programName }}</span>
                            </div>
                          </template>
                          <span v-else class="table_name">{{scope.row[item.prop]}}</span>
                        </template>
                      </el-table-column>
                    </template>
                </el-table>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import global_ from '../../components/Global'//引用模块进来

export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      eventTitle: '需要关注的事件',
      programTitle: '需要关注的项目',
      opinionTitle: '意见和投诉',
      more: '更多>',
      caseData: [],
      eventTable:[
        {
          prop: 'CASEHEALTH',
          label: '健康度',
          fixed: true,
          width: '16%'
        },
        {
          prop: 'CASEID',
          label: '事件编号',
          fixed: true,
          width: '28%'
        },
        {
          prop: 'ITEM',
          label: '告警项',
          fixed: true,
          width: '28%'
        },
        {
          prop: 'CUSTOM',
          label: '客户名称',
          fixed: true,
          width: '28%'
        }
      ],
      projData:[],
      programTable:[
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '38%'
        },
        {
          prop: 'START_DATE',
          label: '开始时间',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'END_DATE',
          label: '结束时间',
          fixed: true,
          width: '30%'
        }
      ],
      opinionTab:[
        {
          name: 'first',
          label: 'Case评价',
          table:[
            {
              prop: 'PROJECT_NAME',
              label: '项目名称',
              fixed: true,
              width: '43%'
            },
            {
              prop: 'CASE_CD',
              label: '事件编号',
              fixed: true,
              width: '30%'
            },
            {
              prop: 'TOTAL_SCORE',
              label: '评价分值',
              fixed: true,
              width: '25%'
            }
          ],
          data:[]
        },
        {
          name: 'second',
          label: '项目满意度',
          table:[
            {
              prop: 'PROJECT_NAME',
              label: '项目名称',
              fixed: true,
              width: '43%'
            },
            {
              prop: 'CASE_CD',
              label: '评价状态',
              fixed: true,
              width: '20%'
            },
            {
              prop: 'TOTAL_SCORE',
              label: '评价分值',
              fixed: true,
              width: '20%'
            },
            {
              prop: 'EVALUATE_FROM_NAME',
              label: '评价人',
              fixed: true,
              width: '30%'
            },
            {
              prop: 'EVALUATE_TIME',
              label: '实际评价时间',
              fixed: true,
              width: '30%'
            }
          ],
          data:[]
        },
        {
          name: 'third',
          label: '意见投诉',
          table:[
            {
              prop: 'TASK_CODE',
              label: '任务编号',
              fixed: true,
              width: '43%'
            },
            {
              prop: 'CASE_CD',
              label: '意见类型',
              fixed: true,
              width: '30%'
            },
            {
              prop: 'TASK_FROM',
              label: '意见来源',
              fixed: true,
              width: '25%'
            },
            {
              prop: 'COMPLAINT_COMMENT',
              label: '意见内容',
              fixed: true,
              width: '40%'
            },
            {
              prop: 'CREATE_ON',
              label: '创建时间',
              fixed: true,
              width: '25%'
            }
          ],
          data:[]
        }
      ],
      activeName: 'first',
    }
  },

  methods:{

  },
  created:function(){

    this.$axios.get(global_.proxyServer+"?action=GetFocusCase&EMPID=1012856&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
      this.caseData = res.data.data;
    });

    this.$axios.get(global_.proxyServer+"?action=GetFocusProject&EMPID=1012856&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
      this.projData = res.data.data;
    });

    this.$axios.get(global_.proxyServer+"?action=GetCaseEvaluate&EMPID=1012856&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
      this.opinionTab[0].data = res.data.data;
    });

    this.$axios.get(global_.proxyServer+"?action=GetProjectEvaluate&EMPID=1012856&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
      this.opinionTab[1].data = res.data.data;
    });

    this.$axios.get(global_.proxyServer+"?action=GetComplaintsList&EMPID=1012856&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
      this.opinionTab[2].data = res.data.data;
    });


  }
}
</script>

<style scoped>
  .homeView{width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  .content{margin: 0 0.14rem; display: block;}
  .content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem; font-size: 0.14rem; color: #2698d6;}
  .content .title .titleRight{font-size: 0.13rem; color: #999999;}
  .content .title img{width: 0.18rem; height: 0.18rem; vertical-align: text-bottom; margin-right: 0.08rem;}
  .content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  .content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  .content >>> .el-table td>.cell{text-align: center; color: #666666; padding: 0}
  .content >>> .el-table th>.cell{text-align: center; color: #333333; padding: 0;}
  .table_name{display: block; width: 100%; height: 0.3rem; line-height: 0.3rem; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
  .opinionTab >>> .el-tabs__item.is-active{color: #2698d6; background: #ffffff; border: 1px solid #e1e1e1; border-radius: 0.2rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header{border: none; margin-bottom: 0.1rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{display: flex; justify-content: space-around; border: none; width: 100%;}
  .opinionTab >>> .el-tabs__item{border: none; color: #999999; height: 0.24rem; line-height: 0.24rem;}
</style>
