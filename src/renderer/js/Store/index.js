/**
 * @file Definit le Store de l'application VueJS.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'
/**
 * Module des parametres de l'application.
 */
import Settings from './Settings'
/**
 * Module de la Liste de lecture.
 */
import Playlist from './Playlist'

const Store = new VueX.Store({
  modules: {
    settings: Settings,
    playlist: Playlist
  }
})

export default Store

/**
* Module contenant l'etat de la configuration de la View.
*/
import Panel from './Panel'
                                     panel: Panel