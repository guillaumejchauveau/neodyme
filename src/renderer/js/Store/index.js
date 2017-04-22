import VueX from 'vuex'
import Settings from './Settings'
import View from './View'

const Store  = new VueX.Store({
                                  modules: {
                                      settings: Settings,
                                      view: View
                                  }
                              })

export default Store
