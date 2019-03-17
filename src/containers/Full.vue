<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <Siderbar></Siderbar>
      <el-container>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
    <Scrolltotop></Scrolltotop>
  </el-container>
</template>

<script>
import Header from '../components/header/Header'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import Footer from '../components/footer/Footer'
import Siderbar from '../components/sidebar/Sidebar'
import Scrolltotop from '../components/scrolltotop/Scrolltotop'
import ResizeMixin from '@/utils/resizeHandler'


export default {
  name: 'Full',
  components: {
    Header,
    Breadcrumb,
    Footer,
    Siderbar,
    Scrolltotop
  },
  mixins: [ResizeMixin],
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
  @media (max-width: 920px)
    .el-main
      padding 0

  .el-header, .el-footer {
    color: #333;
    height: 50px !important;
    padding: 0;
  }

  .el-main {
    background-color: #f5f5f5;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
