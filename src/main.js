import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import FastClick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
    
Vue.use(vueSwiper)

Vue.use(VuelazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

//定义总线
Vue.prototype.$bus = new Vue()

//解决移动端的300毫秒延迟
FastClick.attach(document.body);

//安装toast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
