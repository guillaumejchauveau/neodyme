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

import View from './View'

const Store = new VueX.Store({
                                 modules: {
                                     settings: Settings,
                                     playlist: Playlist,
                                     view: View
                                 }
                             })

export default Store
