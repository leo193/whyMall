import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
    
Vue.use(vueSwiper)

Vue.config.productionTip = false

//定义总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
