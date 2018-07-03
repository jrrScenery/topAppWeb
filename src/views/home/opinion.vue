<!--工作台-PO信息-->
<template>
  <div class="opinionView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in POinfoTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <el-table
              :data="item.tableData"
              style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
              <template v-if="item.label ==='Case评价'" v-for="info in opinionTableOne">
                <el-table-column
                  :fixed="info.fixed"
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width"
                  class="caseTable">
                  <template slot-scope="scope">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                  </template>
                </el-table-column>
              </template>
              <template v-if="item.label ==='项目满意度'" v-for="info in opinionTableTwo">
                <el-table-column
                  :fixed="info.fixed"
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width">
                  <template slot-scope="scope">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                  </template>
                </el-table-column>
              </template>
              <template v-if="item.label ==='意见投诉'" v-for="info in opinionTableThree">
                <el-table-column
                  :fixed="info.fixed"
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width">
                  <template slot-scope="scope">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
export default {
  name: 'opinion',

  components: {
    headerBase
  },

  data () {
    return {
      POinfoTab: [
        {
          name: 'first',
          label: 'Case评价',
          tableData: [
            {
              num: 'CS1805110047',
              type: '客户评价故障处理服务',
              score: '5',
              name: '2017中国电信总部IT'
            }, {
              num: 'CS1805110047',
              type: '客户评价故障处理服务',
              score: '5',
              name: '2017中国电信总部IT'
            }, {
              num: 'CS1805110047',
              type: '客户评价故障处理服务',
              score: '5',
              name: '2017中国电信总部IT'
            }
          ]
        },
        {
          name: 'second',
          label: '项目满意度',
          tableData: [
            {
              name: '金税三期身份认证售后服务',
              score: '10',
              people: '梁卓明',
              time: '2018-04-26  20:04'
            }, {
              name: '金税三期身份认证售后服务',
              score: '10',
              people: '梁卓明',
              time: '2018-04-26  20:04'
            }, {
              name: '金税三期身份认证售后服务',
              score: '10',
              people: '梁卓明',
              time: '2018-04-26  20:04'
            }
          ]
        },
        {
          name: 'third',
          label: '意见投诉',
          tableData: [
            {
              num: 'QQM021802280001',
              desc: '国家税务总局小型机构维保',
              time: '2018-04-26  20:04'
            }, {
              num: 'QQM021802280001',
              desc: '国家税务总局小型机构维保',
              time: '2018-04-26  20:04'
            }, {
              num: 'QQM021802280001',
              desc: '国家税务总局小型机构维保',
              time: '2018-04-26  20:04'
            }
          ]
        }
      ],
      activeName: 'first',
      opinionTableOne: [
        {
          prop: 'num',
          label: '事件编号',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'type',
          label: '评价类型',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'score',
          label: '评价分值',
          fixed: true,
          width: '10%'
        },
        {
          prop: 'name',
          label: '项目名称',
          fixed: true,
          width: '30%'
        }
      ],
      opinionTableTwo: [
        {
          prop: 'name',
          label: '项目名称',
          fixed: true,
          width: '35%'
        },
        {
          prop: 'score',
          label: '评价分值',
          fixed: true,
          width: '10%'
        },
        {
          prop: 'people',
          label: '评价人',
          fixed: true,
          width: '15%'
        },
        {
          prop: 'time',
          label: '实际评价时间',
          fixed: true,
          width: '40%'
        }
      ],
      opinionTableThree: [
        {
          prop: 'num',
          label: '任务编号',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'desc',
          label: '意见内容',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'time',
          label: '创建时间',
          fixed: true,
          width: '40%'
        }
      ]
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .opinionView{width: 100%;}
  .content{margin-top: 0.05rem; text-align: center; color: #666666; background: #ffffff; font-size: 0.13rem;}
  .content >>> .el-table th{text-align: center; padding: 0; line-height: 0.4rem; color: #333333; background: #f7f7f7}
  .content >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .content >>> .el-table td{padding: 0;}
  .content >>> .el-table .cell{padding: 0; font-size: 0.13rem;}
  .content >>> .el-table .cell .table_name{display: block; width: 100%; height: 0.35rem; line-height: 0.35rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .content >>> .el-tabs__header{margin: 0;}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .content >>> .el-tabs__active-bar{background: #2698d6}
</style>
