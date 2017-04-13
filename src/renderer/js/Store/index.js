import VueX from 'vuex'
import Settings from './Settings'

const Store = new VueX.Store({
  modules: {
    settings: Settings
  }
})

export default Store
