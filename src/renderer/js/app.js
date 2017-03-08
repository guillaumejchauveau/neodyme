require('../css/app.scss')
require('../css/fonts.scss')

import Vue from 'vue'
import App from './App'

new Vue({
    el        : '#app',
    render    : h => h(App),
    components: {
        App
    }
})

const ViewConfig = require('./View/ViewConfig');
