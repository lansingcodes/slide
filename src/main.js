// VUE
import Vue from 'vue'
import VueResource from 'vue-resource'

// COMPONENTS
import App from './App'

// CONFIG
Vue.config.debug = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
