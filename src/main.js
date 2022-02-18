import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入 vue-router
import store from './store'    //引入 vuex

// 全局配置
import '@/assets/scss/reset.scss' //全局样式
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式
import http from '@/api/config'  //axios
import './mock'   // mockjs

// 第三方包
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
      if (to.meta.title){
        document.title = to.meta.title
        if (to.meta.requireAuth) {
          if (store.state.user.username) {
            next()
          } else {
            next({
              path: 'login',
              query: {redirect: to.fullPath}
            })
          }
        } else {
          next()
        }
      }
      next()
    }
)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
