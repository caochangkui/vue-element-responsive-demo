import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Full from '@/containers/Full'
// 把下面的路由 作懒加载处理
const Login = () => import(/* webpackChunkName: "users" */ '@/views/users/Login.vue')
const Register = () => import(/* webpackChunkName: "users" */ '@/views/users/Register.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue')
const Diagram = () => import(/* webpackChunkName: "charts" */ '@/views/charts/Diagram.vue')
const Slider = () => import(/* webpackChunkName: "dashboard" */ '@/views/charts/Slider.vue')
const Tables = () => import(/* webpackChunkName: "tables" */ '@/views/tables/Tables.vue')
const List = () => import(/* webpackChunkName: "tables" */ '@/views/tables/list/List.vue')
const Details = () => import(/* webpackChunkName: "tables" */ '@/views/tables/details/Details.vue')
const Setting = () => import(/* webpackChunkName: "tables" */ '@/views/setting/Setting.vue')
const NotFind = () => import(/* webpackChunkName: "home" */ '@/views/404.vue')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Full',
      component: Full,
      meta: {
        breadcrumb: '首页',
        requireLogin: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            breadcrumb: 'dashboard',
            title: 'dashboard',
            requireLogin: true
          }
        },
        {
          path: '/charts/diagram',
          name: 'Diagram',
          component: Diagram,
          meta: {
            breadcrumb: '图表一',
            title: 'Diagram',
            requireLogin: true
          }
        },
        {
          path: '/charts/slider',
          name: 'Slider',
          component: Slider,
          meta: {
            breadcrumb: '图表二',
            title: 'Slider',
            requireLogin: true
          }
        },
        {
          path: '/tables',
          redirect: '/tables/list',
          name: 'Tables',
          component: Tables,
          meta: {
            breadcrumb: '表格',
            requireLogin: true
          },
          children: [
            {
              path: '/tables/list',
              name: 'List',
              component: List,
              meta: {
                title: 'list',
                breadcrumb: '列表',
                requireLogin: true
              }
            },
            {
              path: '/tables/details',
              name: 'Details',
              component: Details,
              meta: {
                title: 'details',
                breadcrumb: '详情',
                requireLogin: true
              }
            }
          ]
        },
        {
          path: '/setting',
          name: 'Setting',
          component: Setting,
          meta: {
            breadcrumb: '设置',
            requireLogin: true
          },
        }
      ]
    },
    {
      path: '*',
      name: 'NotFind',
      component: NotFind,
      meta: {
        title: '404'
      }
    }
  ]
})

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('BIND_LOGIN', localStorage.getItem('token'))
}

// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 路由发生变化修改页面title
    document.title = to.meta.title
  }
  if (to.meta.requireLogin) {
    if (store.getters.token) {
      if (Object.keys(from.query).length === 0) { // 判断路由来源是否有query，处理不是目的跳转的情况
        next()
      } else {
          let redirect = from.query.redirect // 如果来源路由有query
          if (to.path === redirect) { // 避免 next 无限循环
              next()
          } else {
              next({ path: redirect }) // 跳转到目的路由
          }
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
