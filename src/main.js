// VUE
import Vue from 'vue'
import VueResource from 'vue-resource'

// COMPONENTS
import App from './app'

// CONFIG
Vue.config.debug = !!window.location.port
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
