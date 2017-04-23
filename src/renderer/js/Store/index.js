/**
 * @file Definit le Store de l'application VueJS.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'
/**
 * Module contenant les parametres de l'application.
 */
import Settings from './Settings'
/**
 * Module contenant l'etat de la partie Liste de lecture.
 */
import Playlist from './Playlist'
/**
* Module contenant l'etat de la configuration de la View.
*/
import Panel from './Panel'

const Store = new VueX.Store({
                                 modules: {
                                     settings: Settings,
                                     playlist: Playlist,
                                     panel: Panel
                                 }
                             })

export default Store
