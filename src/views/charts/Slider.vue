<template>
  <div class="slider">
    <div class="products">
      <h4>各产品访客</h4>
      <div class="slider">
        <swiper :options="productSwiperOption">
          <swiper-slide
            v-for="(item, index) in sliderProducts"
            :key="index"
            :class="{'active': productIsActive === index}"
            @click.native="selectProducts(index)"
          >
            <div class="text">
              <h5>{{item.code}}</h5>
              <p>访客占比</p>
              <span>{{item.radio}}%</span>
            </div>
            <div class="circle">
              <el-progress type="circle" :stroke-width="8" :width="70"  :percentage="item.radio"></el-progress>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="charts">
        <h5>{{productInvokeCode}}各公司访客</h5>
        <ve-line
          :data="productChartData"
          :settings="productChartSettings"
          ref="products"
        >
        </ve-line>
      </div>
    </div>
    <TableAndRing
      :tableTitle='hotProducts.tableTitle'
      :ringTitle='hotProducts.ringTitle'
      :tableData='hotProducts.tableData'
      :chartData='hotProducts.chartData'
      :chartSettings='hotProducts.chartSettings'
    >
    </TableAndRing>
    <TableAndRing
      :tableTitle='bigCustomer.tableTitle'
      :ringTitle='bigCustomer.ringTitle'
      :tableData='bigCustomer.tableData'
      :chartData='bigCustomer.chartData'
      :chartSettings='bigCustomer.chartSettings'
    >
    </TableAndRing>
  </div>
</template>

<script>
import TableAndRing from '@/components/slider/TableAndRing'

export default {
  name: 'Slider',
  components: {
    TableAndRing
  },
  data () {
    this.productChartSettings = {
      dimension: ['时间'],
      scale: [true, true],
      area: true
    }
    this.formChartSettings = {
      dimension: ['时间'],
      scale: [true, true],
      area: true
    }
    return {
      activeName: 'invoke',
      dateValue: '',
      // 限制只能选择当前之前的时间
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      productChartData: {
        columns: ['时间', '北京', '上海', '青岛'],
        rows: [
          { '时间': '2019-03-01', '北京': 75700, '上海': 4311, '青岛': 1000 },
          { '时间': '2019-03-02', '北京': 72936, '上海': 6650, '青岛': 1307 },
          { '时间': '2019-03-03', '北京': 76636, '上海': 7085, '青岛': 1707 },
          { '时间': '2019-03-04', '北京': 66536, '上海': 6085, '青岛': 2105 },
          { '时间': '2019-03-05', '北京': 77516, '上海': 5105, '青岛': 1505 },
          { '时间': '2019-03-06', '北京': 80536, '上海': 8015, '青岛': 1750 },
        ]
      },
      formChartData: {
        columns: ['时间', '毛衣', '床单', '枕头', 'Y0906'],
        rows: [
          { '时间': '2019-03-01', '毛衣': 56000, '床单': 22000, '枕头': 8888, 'Y0906': 666 },
          { '时间': '2019-03-02', '毛衣': 44000, '床单': 24000, '枕头': 5888, 'Y0906': 766 },
          { '时间': '2019-03-03', '毛衣': 51000, '床单': 21000, '枕头': 6888, 'Y0906': 1166 },
          { '时间': '2019-03-04', '毛衣': 59000, '床单': 27000, '枕头': 8888, 'Y0906': 966 },
          { '时间': '2019-03-05', '毛衣': 66000, '床单': 12000, '枕头': 6888, 'Y0906': 1266 },
          { '时间': '2019-03-06', '毛衣': 52000, '床单': 29000, '枕头': 7888, 'Y0906': 1066 },
        ]
      },
      // swiper轮播图
      productSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      formSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      productIsActive: 0,
      productInvokeCode: '毛衣',
      formIsActive: 0,
      formInvokeName: '北京',
      sliderProducts: [
        {
          code: '毛衣',
          radio: 63
        },
        {
          code: '床单',
          radio: 15
        },
        {
          code: '枕头',
          radio: 2
        },
        {
          code: '窗帘',
          radio: 1
        }
      ],
      sliderForms: [
        {
          code: '北京',
          radio: 72
        },
        {
          code: '上海',
          radio: 12
        },
        {
          code: '上海淇毓',
          radio: 9
        },
        {
          code: '北京济南',
          radio: 6
        }
      ],
      // 热门产品和各产品关注占比
      hotProducts: {
        tableTitle: '热门产品',
        ringTitle: '各产品关注占比',
        tableData: [{
          id: 1,
          name: '毛衣',
          amount: '82093',
          increase: '128%'
        }, {
          id: 2,
          name: '羽绒服',
          amount: '77093',
          increase: '33%'
        }, {
          id: 3,
          name: '枕头',
          amount: '66752',
          increase: '25%'
        }, {
          id: 4,
          name: '短袖',
          amount: '57890',
          increase: '55%'
        }, {
          id: 5,
          name: '手套',
          amount: '5567',
          increase: '67%'
        }],
        chartData: {
          columns: ['产品', '关注'],
          rows: [
            { '产品': '毛衣', '关注': 1393 },
            { '产品': '羽绒服', '关注': 3530 },
            { '产品': '枕头', '关注': 2923 },
            { '产品': '短袖', '关注': 1723 },
            { '产品': '手套', '关注': 3792 },
          ]
        },
        chartSettings: {
          dimension: '产品',
          metrics: '关注',
          offsetY: 180
        }
      },
      // 大客户和各客户关注占比
      bigCustomer: {
        tableTitle: '大客户',
        ringTitle: '各客户关注占比',
        tableData: [{
          id: 1,
          name: '北京',
          amount: '82093',
          increase: '183%'
        }, {
          id: 2,
          name: '济南',
          amount: '77093',
          increase: '33%'
        }, {
          id: 3,
          name: '苏州',
          amount: '66752',
          increase: '25%'
        }, {
          id: 4,
          name: '大连',
          amount: '57890',
          increase: '55%'
        }, {
          id: 5,
          name: '西安',
          amount: '5567',
          increase: '67%'
        }],
        chartData: {
          columns: ['公司', '关注'],
          rows: [
            { '产品': '北京', '关注': 10093 },
            { '产品': '济南', '关注': 5530 },
            { '产品': '苏州', '关注': 2923 },
            { '产品': '大连', '关注': 1723 },
            { '产品': '西安', '关注': 992 },
          ]
        },
        chartSettings: {
          dimension: '产品',
          metrics: '关注',
          offsetY: 180
        }
      }
    }
  },
  watch: {
    // 切换tab时更新charts
    activeName (v) {
      this.$nextTick(() => {
        this.$refs[`${v}`].echarts.resize()
      })
    }
  },
  methods: {
    handleTab (tab) {
      console.log(tab.name);
    },
    selectProducts (index) {
      console.log(index)
      this.productIsActive = index
      if (index === 0) {
        this.productInvokeCode = '毛衣'
        this.productChartData = {
          columns: ['时间', '北京', '上海', '青岛'],
          rows: [
            { '时间': '2019-03-01', '北京': 75700, '上海': 4311, '青岛': 1000 },
            { '时间': '2019-03-02', '北京': 72936, '上海': 6650, '青岛': 1307 },
            { '时间': '2019-03-03', '北京': 76636, '上海': 7085, '青岛': 1707 },
            { '时间': '2019-03-04', '北京': 66536, '上海': 6085, '青岛': 2105 },
            { '时间': '2019-03-05', '北京': 77516, '上海': 5105, '青岛': 1505 },
            { '时间': '2019-03-06', '北京': 80536, '上海': 8015, '青岛': 1750 },
          ]
        }
      } else if (index === 1) {
        this.productInvokeCode = '床单'
        this.productChartData = {
          columns: ['时间', '北京', '上海', '青岛'],
          rows: [
            { '时间': '2019-03-01', '北京': 15700, '上海': 800, '青岛': 200 },
            { '时间': '2019-03-02', '北京': 11936, '上海': 650, '青岛': 307 },
            { '时间': '2019-03-03', '北京': 12636, '上海': 785, '青岛': 197 },
            { '时间': '2019-03-04', '北京': 14536, '上海': 885, '青岛': 215 },
            { '时间': '2019-03-05', '北京': 15516, '上海': 705, '青岛': 155 },
            { '时间': '2019-03-06', '北京': 16536, '上海': 805, '青岛': 250 },
          ]
        }
      } else if (index === 2) {
        this.productInvokeCode = '枕头'
        this.productChartData = {
          columns: ['时间', '北京', '上海', '青岛'],
          rows: [
            { '时间': '2019-03-01', '北京': 650, '上海': 300, '青岛': 300 },
            { '时间': '2019-03-02', '北京': 736, '上海': 250, '青岛': 307 },
            { '时间': '2019-03-03', '北京': 636, '上海': 285, '青岛': 297 },
            { '时间': '2019-03-04', '北京': 536, '上海': 285, '青岛': 215 },
            { '时间': '2019-03-05', '北京': 516, '上海': 205, '青岛': 255 },
            { '时间': '2019-03-06', '北京': 636, '上海': 305, '青岛': 350 },
          ]
        }
      } else if (index === 3) {
        this.productInvokeCode = '窗帘'
        this.productChartData = {
          columns: ['时间', '北京', '上海', '青岛'],
          rows: [
            { '时间': '2019-03-01', '北京': 157, '上海': 100, '青岛': 300 },
            { '时间': '2019-03-02', '北京': 136, '上海': 150, '青岛': 307 },
            { '时间': '2019-03-03', '北京': 166, '上海': 115, '青岛': 297 },
            { '时间': '2019-03-04', '北京': 156, '上海': 125, '青岛': 215 },
            { '时间': '2019-03-05', '北京': 156, '上海': 105, '青岛': 555 },
            { '时间': '2019-03-06', '北京': 136, '上海': 135, '青岛': 250 },
          ]
        }
      }

    },
    selectForms (index) {
      console.log(index)
      this.formIsActive = index
      if (index === 0) {
        this.formInvokeName = '北京'
        this.formChartData = {
          columns: ['时间', '毛衣', '床单', '枕头', 'Y0906'],
          rows: [
            { '时间': '2019-03-01', '毛衣': 56000, '床单': 22000, '枕头': 8888, 'Y0906': 666 },
            { '时间': '2019-03-02', '毛衣': 44000, '床单': 24000, '枕头': 5888, 'Y0906': 766 },
            { '时间': '2019-03-03', '毛衣': 51000, '床单': 21000, '枕头': 6888, 'Y0906': 1166 },
            { '时间': '2019-03-04', '毛衣': 59000, '床单': 27000, '枕头': 8888, 'Y0906': 966 },
            { '时间': '2019-03-05', '毛衣': 66000, '床单': 12000, '枕头': 6888, 'Y0906': 1266 },
            { '时间': '2019-03-06', '毛衣': 52000, '床单': 29000, '枕头': 7888, 'Y0906': 1066 },
          ]
        }
      } else if (index === 1) {
        this.formInvokeName = '上海'
        this.formChartData = {
          columns: ['时间', '毛衣', '床单', '枕头', 'Y0906'],
          rows: [
            { '时间': '2019-03-01', '毛衣': 12000, '床单': 7000, '枕头': 300, 'Y0906': 500 },
            { '时间': '2019-03-02', '毛衣': 14000, '床单': 6000, '枕头': 388, 'Y0906': 666 },
            { '时间': '2019-03-03', '毛衣': 11000, '床单': 6600, '枕头': 338, 'Y0906': 466 },
            { '时间': '2019-03-04', '毛衣': 19000, '床单': 5500, '枕头': 298, 'Y0906': 566 },
            { '时间': '2019-03-05', '毛衣': 16000, '床单': 6900, '枕头': 388, 'Y0906': 466 },
            { '时间': '2019-03-06', '毛衣': 12000, '床单': 7900, '枕头': 488, 'Y0906': 666 },
          ]
        }
      }  else if (index === 2) {
        this.formInvokeName = '上海淇毓'
        this.formChartData = {
          columns: ['时间', '毛衣', '床单', '枕头', 'Y0906'],
          rows: [
            { '时间': '2019-03-01', '毛衣': 10000, '床单': 3000, '枕头': 2008, 'Y0906': 500 },
            { '时间': '2019-03-02', '毛衣': 14000, '床单': 4000, '枕头': 1588, 'Y0906': 466 },
            { '时间': '2019-03-03', '毛衣': 11000, '床单': 2700, '枕头': 1888, 'Y0906': 566 },
            { '时间': '2019-03-04', '毛衣': 12000, '床单': 2800, '枕头': 2288, 'Y0906': 565 },
            { '时间': '2019-03-05', '毛衣': 13000, '床单': 3300, '枕头': 2388, 'Y0906': 555 },
            { '时间': '2019-03-06', '毛衣': 14000, '床单': 3400, '枕头': 2288, 'Y0906': 666 },
          ]
        }
      } else if (index === 3) {
        this.formInvokeName = '北京济南'
        this.formChartData = {
          columns: ['时间', '毛衣', '床单', '枕头', 'Y0906'],
          rows: [
            { '时间': '2019-03-01', '毛衣': 9000, '床单': 2000, '枕头': 1000, 'Y0906': 333 },
            { '时间': '2019-03-02', '毛衣': 8000, '床单': 1800, '枕头': 1188, 'Y0906': 466 },
            { '时间': '2019-03-03', '毛衣': 9000, '床单': 2100, '枕头': 1118, 'Y0906': 466 },
            { '时间': '2019-03-04', '毛衣': 9900, '床单': 1800, '枕头': 888, 'Y0906': 555 },
            { '时间': '2019-03-05', '毛衣': 8800, '床单': 1900, '枕头': 999, 'Y0906': 444 },
            { '时间': '2019-03-06', '毛衣': 9900, '床单': 2000, '枕头': 990, 'Y0906': 666 },
          ]
        }
      }
    },
    bindSelectDate (e) {
      console.log(e)
      if (e === '今日') {
          this.invokeChartData = {
          columns: ['时间', '毛衣访客', '床单访客', '枕头访客'],
          rows: [
            { '时间': '10:00', '毛衣访客': 2800, '床单访客': 1000, '枕头访客': 900 },
            { '时间': '11:00', '毛衣访客': 2600, '床单访客': 1200, '枕头访客': 1400 },
            { '时间': '12:00', '毛衣访客': 2700, '床单访客': 1600, '枕头访客': 1200 },
            { '时间': '13:00', '毛衣访客': 3000, '床单访客': 1100, '枕头访客': 1600 },
            { '时间': '14:00', '毛衣访客': 3100, '床单访客': 1700, '枕头访客': 1900 },
            { '时间': '15:00', '毛衣访客': 2900, '床单访客': 2000, '枕头访客': 1800 },
            { '时间': '16:00', '毛衣访客': 3300, '床单访客': 1500, '枕头访客': 2200 },
          ]
        }
      } else if (e === '今日') {
          this.invokeChartData = {
          columns: ['时间', '毛衣访客', '床单访客', '枕头访客'],
          rows: [
            { '时间': '10:00', '毛衣访客': 2800, '床单访客': 1000, '枕头访客': 900 },
            { '时间': '11:00', '毛衣访客': 2600, '床单访客': 1200, '枕头访客': 1400 },
            { '时间': '12:00', '毛衣访客': 2700, '床单访客': 1600, '枕头访客': 1200 },
            { '时间': '13:00', '毛衣访客': 3000, '床单访客': 1100, '枕头访客': 1600 },
            { '时间': '14:00', '毛衣访客': 3100, '床单访客': 1700, '枕头访客': 1900 },
            { '时间': '15:00', '毛衣访客': 2900, '床单访客': 2000, '枕头访客': 1800 },
            { '时间': '16:00', '毛衣访客': 3300, '床单访客': 1500, '枕头访客': 2200 },
          ]
        }
      }

    }
  }
}
</script>

<style lang="stylus">
  .slider
    width 100%
    // max-width 1200px
    // margin auto
    .total
      height 440px
      width 100%
      background #fff
      padding 10px 12px
      margin-bottom 20px
      position relative
      box-sizing border-box
      .select-wrapper
        position absolute
        right 10px
        top 6px
        padding 0 .4rem
        z-index 9
        .el-button
          margin-right 6px
      .el-tabs__item
        font-size 16px
    .products
      min-height 400px
      background #fff
      padding 10px 16px
      margin-bottom 20px
      position relative
      h4
        font-size 18px
        font-weight bold
        padding 0 0 12px 0
      .slider
        height 100px
        padding-bottom 12px
        .swiper-container
          height 100px
          .swiper-slide
            background #d7f1e966
            border-radius 8px
            padding 10px
            box-sizing border-box
            display flex
            align-items center
            justify-content space-around
            cursor pointer
            &.active
              background #9df5da
            .text
              color #555
              font-size 16px
              p
                font-size 14px
                color #666
                padding 16px 0
              span
                font-size 20px
                font-weight bold
                color #333
      .charts
        h5
          font-weight bold



  @media (max-width: 920px)
    .select-wrapper
      display none

</style>
