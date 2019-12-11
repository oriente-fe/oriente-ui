import Vue from 'vue'
import App from './App.vue'

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/railscasts.css'

hljs.registerLanguage('javascript', javascript)

import OrienteUI from '~/packages/index'

Vue.directive('hljs', el => {
  let blocks = el.querySelectorAll('pre')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

Vue.use(OrienteUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
