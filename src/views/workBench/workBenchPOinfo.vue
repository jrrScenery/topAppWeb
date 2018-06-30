<!--工作台-PO信息-->
<template>
  <div class="workBenchPOinfoView">
    <header-base></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in POinfoTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <el-table
              :data="item.tableData"
              style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
              <template v-for="info in POinfotable">
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
  name: 'workBenchPOinfo',

  components: {
    headerBase
  },

  data () {
    return {
      POinfoTab: [
        {
          name: 'first',
          label: '人员',
          tableData: [
            {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }, {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }, {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }
          ]
        },
        {
          name: 'second',
          label: '备件',
          tableData: [
            {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }, {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }, {
              time: '2017-11',
              totalMoney: '538772',
              money: '15700'
            }
          ]
        }
      ],
      activeName: 'first',
      POinfotable: [
        {
          prop: 'time',
          label: '年月',
          fixed: true,
          width: '34%'
        },
        {
          prop: 'totalMoney',
          label: '总金额',
          fixed: true,
          width: '33%'
        },
        {
          prop: 'money',
          label: '已支付金额',
          fixed: true,
          width: '33%'
        }
      ]
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .workBenchPOinfoView{width: 100%;}
  .content{margin-top: 0.05rem; text-align: center; color: #666666; background: #ffffff;}
  .content >>> .el-table th{text-align: center; color: #333333; background: #f7f7f7}
  .content >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .content >>> .el-tabs__header{margin: 0;}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__nav .el-tabs__item{width: 50%}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #e0002a}
  .content >>> .el-tabs__active-bar{background: #e0002a}
</style>
