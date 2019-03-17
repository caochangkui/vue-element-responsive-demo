<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in list" :key="item.path + item.name">
          <router-link :to="item">{{ item.meta.breadcrumb }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    list () {
      return this.$route.matched
    }
  },
  created () {
    console.log(this.$route)
  },
}
</script>

<style scoped lang="stylus">
  .breadcrumb
    line-height 40px
    // background #fff
    border-radius 4px
    margin-bottom 10px
    .el-breadcrumb
      line-height  2
      padding-left 4px
</style>
