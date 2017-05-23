/**
 * @file Point d'entree du navigateur.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import Vue from 'vue'
import vuex from 'vuex'

/**
 * Directive VueJS pour appliquer l'effet Ripple.
 */
import Ripple from '../components/MDC/Ripple'

require('../css/index.scss')
require('../css/fonts.scss')

Vue.use(vuex)
Vue.directive('ripple', Ripple)

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  render: createElement => createElement(require('../components/App'))
})
