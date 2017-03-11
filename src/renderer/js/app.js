require('../css/app.scss')
require('../css/fonts.scss')

import Vue from 'vue'
import App from './App'

import VCS from './View/ViewConfigSystem'

new Vue({
    el        : '#app',
    render    : h => h(App),
    components: {
      App
    }
})
