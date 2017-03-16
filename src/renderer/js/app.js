require('../css/app.scss')
require('../css/fonts.scss')

import Vue from 'vue'
import App from './App'
import RippleDirective from './directives/Ripple'

import VCS from './View/ViewConfigSystem'

Vue.directive('ripple', RippleDirective)

const vm = new Vue({
    el        : '#app',
    render    : h => h(App),
    components: {
      App
    }
})
