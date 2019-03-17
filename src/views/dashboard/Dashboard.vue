<template>
  <div class="dashboard">
    <el-row :gutter="20" class="top-block">
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="grid-content bg-white">
          <div class="title">
            <p>折线图</p>
            <el-tooltip class="item" effect="dark" content="折线图" placement="top-end">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="content">
            <h2>示例</h2>
             <ve-line
              height="100px"
              :yAxis="{show: false}"
              :legend="{show: false}"
              :grid="{
                left: '0',
                right: '0',
                bottom: '0',
                top: '0',
                containLabel: false // grid 区域是否包含坐标轴的刻度标签。
              }"
              :data="callChartData"
              :settings="callChartSettings">
             </ve-line>
            <div class="radio topborder">
              <div>
                <p>周同比</p>
                <i class="el-icon-caret-top"></i>
                <span>15%</span>
              </div>
              <div>
                <p>日环比</p>
                <i class="el-icon-caret-bottom"></i>
                <span>9%</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="grid-content bg-white">
          <div class="title">
            <p>柱状图</p>
            <el-tooltip class="item" effect="dark" content="柱状图" placement="top-end">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="content">
            <h2>示例</h2>
            <ve-histogram
              height="100px"
              :yAxis="{show: false}"
              :legend="{show: false}"
              :grid="{
                left: '0',
                right: '0',
                bottom: '0',
                top: '0',
                containLabel: false // grid 区域是否包含坐标轴的刻度标签。
              }"
              :settings="clientChartSettings"
              :data="clientChartData">
            </ve-histogram>
            <div class="radio topborder">
              <div>
                <p>周同比</p>
                <i class="el-icon-caret-top"></i>
                <span>13%</span>
              </div>
              <div>
                <p>日环比</p>
                <i class="el-icon-caret-bottom"></i>
                <span>8%</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="grid-content bg-white">
          <div class="title">
            <p>进度条</p>
            <el-tooltip class="item" effect="dark" content="进度条" placement="top-end">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="content">
            <h2>86%</h2>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="86"></el-progress>
            <div class="radio topborder">
              <div>
                <p>周同比</p>
                <i class="el-icon-caret-top"></i>
                <span>8%</span>
              </div>
              <div>
                <p>日环比</p>
                <i class="el-icon-caret-bottom"></i>
                <span>5%</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="grid-content bg-white">
          <div class="title">
            <p>仪表盘</p>
            <br>
            <el-tooltip class="item" effect="dark" content="仪表盘" placement="top-end">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="content">
            <ve-gauge
            height="220px"
              :data="passChartData"
              :settings="passChartSettings"
            ></ve-gauge>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="realtime">
      <el-row :gutter="20">
        <el-col :sm="24" :md="24" :lg="24">
          <div class="invoke bg-white">
            <h2>折线图</h2>
            <div class="total">
              <div class="left">
                <p>今日访客</p>
                <span>102631</span>
              </div>
              <div class="right">
                <p>平均纪录</p>
                <span>666</span>
              </div>
            </div>
            <div class="chart">
              <ve-line
                :data="invokeChartData"
                height="300px"
                :settings="invokeChartSettings">
              </ve-line>
            </div>
          </div>
          <div class="invoke bg-white">
            <h2>堆叠面积图</h2>
            <div class="total">
              <div class="left">
                <p>今日访客</p>
                <span>2209</span>
              </div>
              <div class="right">
                <p>平均纪录</p>
                <span>666</span>
              </div>
            </div>
            <div class="chart">
              <ve-line
                :data="timeoutChartData"
                height="300px"
                :settings="timeoutChartSettings">
              </ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    this.callChartSettings = {
      scale: [true, true], // 设置成 true 后坐标刻度不会强制包含零刻度
      area: true
    }
    this.clientChartSettings = {
      scale: [true, true], // 设置成 true 后坐标刻度不会强制包含零刻度
    }
    this.invokeChartSettings = {
      dimension: ['时间'],
      scale: [true, true]
    }
    this.timeoutChartSettings = {
      dimension: ['时间'],
      scale: [true, true],
      area: true
    }
    this.passChartSettings = {
      dataType: {
        '占比': 'percent'
      },
      seriesMap: {
        '占比': {
          min: 0,
          max: 1,
          splitNumber: 5, // 仪表切分份数
          radius: "96%", // 仪表大小
          pointer : { //指针样式
              length: '45%'
          },
          axisLabel : { //文字样式（及“10”、“20”等文字样式）
            color : "red",
            distance : 0 //文字离表盘的距离
          },
          axisLine : {
              lineStyle: { // 属性lineStyle控制线条样式
                color: [ // 表盘颜色
                  [ 1,"#36a9e1" ] // 0%-100%处的颜色
                ],
                width: 20 // 表盘宽度
            }
          },
          detail: { // 当前刻度的样式
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff',
            shadowBlur: 5,
            offsetCenter: [0, '70%'],
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff',
              fontSize : 20
            }
          }
        }
      }
    }
    return {
      callChartData: {
        columns: ['日期', '访客'],
        rows: [
          { '日期': '2019-02-21', '访客': 116921 },
          { '日期': '2019-02-22', '访客': 122921 },
          { '日期': '2019-02-23', '访客': 133921 },
          { '日期': '2019-02-24', '访客': 122921 },
          { '日期': '2019-02-25', '访客': 116921 },
          { '日期': '2019-02-26', '访客': 144921 },
          { '日期': '2019-02-27', '访客': 133921 },
          { '日期': '2019-02-28', '访客': 144921 },
          { '日期': '2019-03-01', '访客': 129921 },
          { '日期': '2019-03-02', '访客': 121921 },
          { '日期': '2019-03-03', '访客': 134921 },
          { '日期': '2019-03-04', '访客': 124921 },
          { '日期': '2019-03-05', '访客': 129921 },
          { '日期': '2019-03-06', '访客': 135019 },
        ]
      },
      clientChartData: {
        columns: ['日期', '客户数'],
        rows: [
          { '日期': '2019-02-21', '客户数': 33 },
          { '日期': '2019-02-22', '客户数': 45 },
          { '日期': '2019-02-23', '客户数': 45 },
          { '日期': '2019-02-24', '客户数': 60 },
          { '日期': '2019-02-25', '客户数': 59 },
          { '日期': '2019-02-26', '客户数': 55 },
          { '日期': '2019-02-27', '客户数': 46 },
          { '日期': '2019-02-28', '客户数': 66 },
          { '日期': '2019-03-01', '客户数': 52 },
          { '日期': '2019-03-02', '客户数': 65 },
          { '日期': '2019-03-03', '客户数': 59 },
          { '日期': '2019-03-04', '客户数': 77 },
          { '日期': '2019-03-05', '客户数': 66 },
          { '日期': '2019-03-06', '客户数': 68 },
        ]
      },
      invokeChartData: {
        columns: ['时间', '商品零访客', '商品一访客', '商品二访客'],
        rows: [
          { '时间': '10:00', '商品零访客': 2800, '商品一访客': 1000, '商品二访客': 900 },
          { '时间': '11:00', '商品零访客': 2600, '商品一访客': 1200, '商品二访客': 1400 },
          { '时间': '12:00', '商品零访客': 2700, '商品一访客': 1600, '商品二访客': 1200 },
          { '时间': '13:00', '商品零访客': 3000, '商品一访客': 1100, '商品二访客': 1600 },
          { '时间': '14:00', '商品零访客': 3100, '商品一访客': 1700, '商品二访客': 1900 },
          { '时间': '15:00', '商品零访客': 2900, '商品一访客': 2000, '商品二访客': 1800 },
          { '时间': '16:00', '商品零访客': 3300, '商品一访客': 1500, '商品二访客': 2200 },
        ]
      },
      timeoutChartData: {
        columns: ['时间', '商品零访客', '商品一访客', '商品二访客'],
        rows: [
          { '时间': '10:00', '商品零访客': 19, '商品一访客': 17, '商品二访客': 15 },
          { '时间': '11:00', '商品零访客': 21, '商品一访客': 19, '商品二访客': 18 },
          { '时间': '12:00', '商品零访客': 19, '商品一访客': 18, '商品二访客': 14 },
          { '时间': '13:00', '商品零访客': 20, '商品一访客': 14, '商品二访客': 16 },
          { '时间': '14:00', '商品零访客': 18, '商品一访客': 17, '商品二访客': 12 },
          { '时间': '15:00', '商品零访客': 19, '商品一访客': 15, '商品二访客': 15 },
          { '时间': '16:00', '商品零访客': 16, '商品一访客': 14, '商品二访客': 11 },
        ]
      },
      passChartData: {
        columns: ['type', 'value'],
        rows: [
          { type: '占比', value: 0.98 }
        ]
      }
    }
  }
}
</script>

<style lang="stylus">
.dashboard
  width 100%
  .el-row.top-block
    height 5rem
    .el-col
      height 100%
      margin-bottom 14px
      .grid-content
        height 100%
        box-sizing border-box
        border-radius 4px
        padding .32rem
        color #555
        position relative
        .title
          height .6rem
          font-size 14px
          display flex
          align-items center
          justify-content space-between
        .content
          height 4rem
          display flex
          flex-direction column
          justify-content space-between
          h2
            font-size .4rem
            color #333
            padding .3rem 0
          .radio
            display flex
            align-items center
            justify-content space-between
            &.topborder
              border-top 1px solid #ddd
              height .7rem
            div
              display flex
              align-items center
              justify-content space-between
              p
                padding-right 4px
              .el-icon-caret-top
                color #52c41a
              .el-icon-caret-bottom
                color #F5222D
          .income
            height .7rem
            line-height .7rem
            border-top 1px solid #ddd
            color #444
  .realtime
    width 100%
    .invoke
      margin-bottom 20px
      h2
        font-size 18px
        font-weight bold
        padding 10px 20px
        border-bottom 1px solid #eee
      .total
        padding 10px 10PX 20px 10PX
        display flex
        align-items center
        justify-content space-around
        div
          p
            color #555
            padding 14px 0
          span
            font-size .5rem
            font-weight bold
    .right-dash
      .grid-content
        height 100%
        box-sizing border-box
        border-radius 4px
        padding .32rem
        color #555
        margin-bottom 14px
        position relative
        .title
          height .6rem
          font-size 16px
          color #444
          display flex
          align-items center
          justify-content space-between
        .content
          height 4rem
          display flex
          flex-direction column
          justify-content space-between
          h2
            font-size .3rem
            color #333
            padding .3rem 0
          .radio
            display flex
            align-items center
            justify-content space-between
            &.topborder
              border-top 1px solid #ddd
              height .7rem
            div
              display flex
              align-items center
              justify-content space-between
              p
                padding-right 4px
              .el-icon-caret-top
                color #52c41a
              .el-icon-caret-bottom
                color #F5222D
        .content2
          height 4rem
          width: 100%
          .inner
            height 180px
            width 180px
            margin auto

</style>
