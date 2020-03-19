import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css'
import echarts from 'echarts'
// import axios from 'axios'
import qs from 'qs'

// import Less from 'Less'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
// Vue.prototype.axios=axios;
Vue .prototype.qs=qs
// Vue.use(Less);


// 设置默认公共网址
// axios.defaults.baseURL="http://work.08321.org/sell"


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
