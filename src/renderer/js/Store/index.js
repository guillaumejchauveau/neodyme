/**
 * @file Definit le Store de l'application VueJS.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import vuex from 'vuex'
/**
 * Module contenant les parametres de l'application.
 */
import Settings from './Settings'

const Store = new vuex.Store({
  modules: {
    settings: Settings
  }
})

export default Store
