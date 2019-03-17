<template>
  <div class="notFind">
    <img src="../assets/images/404.jpg" alt="" >
      <el-button type="primary" round @click="backHome">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFind',
  methods: {
    backHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus">
  .notFind
    display flex
    align-items center
    flex-direction column
    max-width 600px
    margin 50px auto
    img
      max-width 80%
      margin-bottom 50px
</style>
