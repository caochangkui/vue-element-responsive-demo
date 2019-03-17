<template>
  <div class="header">
    <div class="logo" :class="{'is-active':isActive}">
      <img src="@/assets/logo.png" alt="" height="30px">
      VueEleDemo
    </div>
    <div class="navbar">
      <div class="btn" :class="{'is-active':isActive}" @click="handleMenu">
        <span :class="menuBtn"></span>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{this.$store.getters.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      menuBtn: 'el-icon-newfont-caidan'
    }
  },
  computed: {
    // 如果左侧菜单打开，则旋转btn180度
    isActive () {
      return !this.$store.getters.sidebar.opened
    }
  },
  methods: {
    ...mapMutations({
      bindLogout: 'BIND_LOGOUT',
    }),
    handleMenu () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$confirm('是否退出账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bindLogout()
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .header
    width 100%
    height 50px
    display flex
    background #36a9e1
    .logo
      width 200px
      height 50px
      background #1e8fc6
      color #fff
      text-indent 15px
      font-size 18px
      line-height 50px
      font-weight 600
      transition .4s ease
      &.is-active
        width 64px
      img
        padding 0 5px 5px 0
    .navbar
      flex 1
      display flex
      align-items center
      justify-content space-between
      padding 0 10px
      color #fff
      .btn
        height 50px
        line-height 50px;
        cursor pointer
        transition .4s ease
        &.is-active
          transform: rotateY(180deg)
        span
          font-size 28px
          line-height 50px
          transition 0.5s
          color #ffffff
          font-weight 400
      .el-dropdown-link
        color #fff
        font-weight bold
        cursor pointer

  @media all and (max-width: 768px) {
    .header .logo.is-active {
      width: 0;
      overflow: hidden;
    }
  }
</style>
