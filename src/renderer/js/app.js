/**
 * @file Point d'entree du navigateur.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import Vue from 'vue'
import VueX from 'vuex'

import Ripple from './MDC/Ripple'

require('../css/app.scss')
require('../css/fonts.scss')

Vue.use(VueX)
Vue.directive('ripple', Ripple)

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  render: h => h(require('./App'))
})
