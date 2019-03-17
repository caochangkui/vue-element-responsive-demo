<template>
  <div class="table-and-ring">
    <el-row :gutter="10">
      <el-col :xs="24" :md="12">
        <div class="grid-content bg-white">
          <h4>{{tableTitle}}</h4>
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="id"
              label="排名"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="产品名"
              width="">
            </el-table-column>
            <el-table-column
              align="center"
              prop="amount"
              label="调用量"
              width="">
            </el-table-column>
            <el-table-column
              align="center"
              prop="increase"
              label="周涨幅">
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="grid-content bg-white">
          <h4>{{ringTitle}}</h4>
          <ve-ring :data="chartData" height="320px" :settings="chartSettings"></ve-ring>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    tableTitle: {
      type: String,
      default: () => ''
    },
    ringTitle: {
      type: String,
      default: () => ''
    },
    tableData: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    chartSettings: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // this.chartSettings = {
    //   dimension: '产品',
    //   metrics: '销售额',
    //   offsetY: 180
    // }
    return {
      // chartData: {
      //   columns: ['产品', '销售额'],
      //   rows: [
      //     { '产品': 'Y0301', '销售额': 1393 },
      //     { '产品': 'Y0302', '销售额': 3530 },
      //     { '产品': 'Y0101', '销售额': 2923 },
      //     { '产品': 'Y0303', '销售额': 1723 },
      //     { '产品': 'Y0304', '销售额': 3792 },
      //   ]
      // },
      // chartSettings: {
      //   dimension: '产品',
      //   metrics: '销售额',
      //   offsetY: 180
      // }
    }
  },
  methods: {}
};
</script>

<style lang="stylus">
  .table-and-ring
    margin-bottom 16px
    .grid-content
      padding 10px
      h4
        font-size .32rem
        font-weight bold
        padding-bottom .32rem

</style>
