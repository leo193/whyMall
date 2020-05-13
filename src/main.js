import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
    
Vue.use(vueSwiper)

Vue.config.productionTip = false

//定义总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
