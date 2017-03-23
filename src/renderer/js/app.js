require('../css/app.scss')
require('../css/fonts.scss')

import Vue from 'vue'
import VueX from 'vuex'
import RippleDirective from './directives/Ripple'

Vue.use(VueX)
Vue.directive('ripple', RippleDirective)

const vm = new Vue({
                       el    : '#app',
                       render: h => h(require('./App'))
                   })
