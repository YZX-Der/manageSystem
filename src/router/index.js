import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Login/Login')
const Register = () => import('@/views/register/Register')
const Main = () => import('@/views/Main')
const Home = () => import('@/views/Home/Home')
const UserManage = () => import('@/views/UserManage/UserManage')
const MallManage = () => import('@/views/MallManage/MallManage')
const PageOne = () => import('@/views/Other/PageOne')
const PageTwo = () => import('@/views/Other/PageTwo')

Vue.use(VueRouter)

// 完整路由代码
const routes = [
    {
      path: '',
      redirect: '/login',
      meta: {
        title: '登录'
      }
    },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
    {
      path: '/main',
      component: Main,
      redirect: '/home',
      meta: {
        requireAuth:true,
        title: '首页'
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: UserManage,
          meta: {
            title: '用户'
          }
        },
        {
          path: '/mall',
          name: 'mall',
          component: MallManage,
          meta: {
            title: '商城'
          }
        },
        {
          path: '/page1',
          name: 'page1',
          component: PageOne,
          meta: {
            title: '11'
          }
        },
        {
          path: '/page2',
          name: 'page2',
          component: PageTwo,
          meta: {
            title: '22'
          }
        },
      ]
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
