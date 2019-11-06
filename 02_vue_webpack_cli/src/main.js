import Vue from 'vue'
import App from './App.vue' // export.default와 한 세트

new Vue({
  render: h => h(App)
}).$mount('#app')