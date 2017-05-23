/**
 * @file Module Liste des pistes du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
  namespaced: true,
  state: {
    /**
     * L'indice de l'element courant.
     * @type {Number}
     */
    currentItem: 0,
    /**
     * L'ouverture de la liste des pistes est-elle demandee ?
     * @type {Boolean}
     */
    activationRequested: false,
    /**
     * Faut-il suivre le point de repere ?
     * @type {Boolean}
     */
    waypointItemTracking: false
  },
  getters: {
    /**
     * Determine si la liste des pistes doit etre affichee.
     * @returns {Boolean}
     */
    active (state, getters, rootState, rootGetters) {
      return rootGetters['playlist/tracksCount'] && state.activationRequested
    },
    /**
     * Determine la valeur de l'element courant en prenant en compte l'option de suivi du point de repere.
     * @returns {Number}
     */
    currentItem (state, getters, rootState) {
      return state.waypointItemTracking ? rootState.playlist.currentTrackIndex : state.currentItem
    }
  },
  mutations: {
    /**
     * Ouvre la liste des pistes.
     */
    OPEN (state) {
      state.activationRequested = true
    },
    /**
     * Ferme la liste des pistes.
     */
    CLOSE (state) {
      state.activationRequested = false
    },
    /**
     * Doit etre appelle via l'action 'setCurrentItem'.
     * @constructor
     * @param {Number} index             - Le nouvel indice.
     * @param {Number} tracksCount       - Le nombre d'elements de la Liste des pistes.
     * @param {Number} currentTrackIndex - L'indice de la piste courante.
     */
    SET_CURRENT_ITEM (state, {index, tracksCount, currentTrackIndex}) {
      // Verifie que la nouvelle valeur soit possible.
      if (index < 0) {
        state.currentItem = 0
      } else if (tracksCount && index > tracksCount - 1) {
        state.currentItem = tracksCount - 1
      } else {
        state.currentItem = index
      }

      // Met a jour l'etat du suivi du point de repere.
      state.waypointItemTracking = state.currentItem === currentTrackIndex
      if (currentTrackIndex === -1) {
        state.waypointItemTracking = false
      }
    }
  },
  actions: {
    /**
     * Change d'element courant.
     * @param {Number} index - Le nouvel indice.
     */
    setCurrentItem (context, index) {
      context.commit('SET_CURRENT_ITEM', {
        index,
        tracksCount: context.rootGetters['playlist/tracksCount'],
        currentTrackIndex: context.rootState.playlist.currentTrackIndex
      })
    }
  }
}
