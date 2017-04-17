/**
 * @file Point d'entree du navigateur.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import Vue from 'vue'
import vuex from 'vuex'

import Ripple from './MDC/Ripple'

require('../css/index.scss')
require('../css/fonts.scss')

Vue.use(vuex)
Vue.directive('ripple', Ripple)

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  render: h => h(require('./App/index.vue'))
})
