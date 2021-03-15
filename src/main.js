import Vue from 'vue'
import App from './App.vue'
import QuantityCounter from './components/QuantityCounter.vue'
import PageContent from './components/PageContent.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
import Header from './components/Header.vue'
import BarChart from './components/charts/BarChart.vue'
import CallAPI from './components/charts/CallAPI.vue'

Vue.config.productionTip = false
Vue.component('quantityCounter', QuantityCounter)
Vue.component('pageContent', PageContent)
Vue.component('app-header', Header)
Vue.use(VueRouter)
Vue.component('BarChart', BarChart)
Vue.component('CallAPI', CallAPI)

const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'
})

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
