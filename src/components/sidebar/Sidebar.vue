<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeIndex"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard" >
        <i class="el-icon-service"></i>
        <span slot="title">Dashboard</span>
      </el-menu-item>
      <el-submenu index="/charts">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span slot="title">Charts</span>
        </template>
        <el-menu-item index="/charts/diagram">Diagram</el-menu-item>
        <el-menu-item index="/charts/slider">Slilder</el-menu-item>
      </el-submenu>
      <el-submenu index="/tables">
        <template slot="title">
          <i class="el-icon-location-outline"></i>
          <span slot="title">Tables</span>
        </template>
        <el-menu-item index="/tables/list">Example</el-menu-item>
      </el-submenu>
      <el-menu-item index="/setting" >
        <i class="el-icon-setting"></i>
        <span slot="title">Setting</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    activeIndex () {
      const thisRoutPath = this.$route.path
      if (this.$route.name === 'details') {
        return '/tables/details'
      }
      return thisRoutPath
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .sidebar {
    background-color: rgb(84, 92, 100);
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
    height: 100%;
  }

  .el-menu-vertical-demo {
    min-height: 100vh;
    height: 100%;
  }

  .el-menu-item.is-active,
  .el-submenu.is-active >>> .el-submenu__title {
    background: #484e5c !important;
  }

  .el-submenu .el-menu-item {
    padding-left: 60px !important;
    min-width: auto;
  }
  .el-submenu.is-active .el-menu-item {
    background: #484e5c !important;
  }
  .el-submenu.is-active .el-menu-item.is-active  {
    background: #3a4046 !important;
  }
  .el-submenu .el-menu-item:hover {
    padding-left: 60px !important;
    background: rgb(67, 74, 80) !important;
  }
  .el-menu-item i {
    padding-bottom: 4px;
  }

  .el-submenu__title i {
    padding-bottom: 4px;
  }

  @media all and (max-width: 768px) {
    .el-menu--collapse {
      width: 0;
      overflow: hidden;
    }
  }


</style>
