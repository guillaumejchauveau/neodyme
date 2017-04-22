/**
 * @file Point d'entree du navigateur.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

require('../css/app.scss')
require('../css/fonts.scss')

import Vue from 'vue'
import VueX from 'vuex'

import RippleDirective from './directives/Ripple'

import App from './App'

import VCS from './View/ViewConfigSystem'


Vue.use(VueX)
Vue.directive('ripple', RippleDirective)

const vm = new Vue({
                       el    : '#app',
                       render: h => h(require('./App'))
                   })
