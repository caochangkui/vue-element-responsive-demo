<template>
  <transition name="slide" >
    <div class="scrolltotop" @click="backToTop" v-show="show">
      <i class="el-icon-arrow-up"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Scrolltotop",
  data() {
    return {
      show: false,
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop
    };
  },
  computed: {

  },
  mounted () {
    this.$nextTick(function () {
        window.addEventListener('scroll', this.bindScroll, true)
    })
  },
  destroyed() {
      window.addEventListener('scroll', this.bindScroll, true);
  },
  methods: {
    bindScroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop > 100 ? this.show = true : this.show = false
    },
    backToTop () {
      let timer = setInterval(() => {
        if (document.documentElement.scrollTop || document.body.scrollTop) {
          document.body.scrollTop -= 100;
          document.documentElement.scrollTop -= 100;
        } else {
          clearInterval(timer)
        }
      }, 0)
    }
  }
}
</script>

<style scoped lang="stylus">
  .scrolltotop
    height 0.9rem
    width 0.9rem
    position fixed
    bottom 1.4rem
    right .8rem
    cursor pointer
    border-radius 50%
    background #409EFF
    display flex
    align-items center
    justify-content center
    opacity .5
    transition 0.2s
    .el-icon-arrow-up
      font-size .6rem
      color #fff
    &:hover
      transform scale(1.1)
      opacity 1

</style>
