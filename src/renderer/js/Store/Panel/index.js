/**
 * @file Module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Getters du module Panel.
 */
import getters from './getters'
/**
 * Mutations du module Panel.
 */
import mutations from './mutations'
/**
 * Actions du module Panel.
 */
import actions from './actions'

export default {
  namespaced: true,
  state: {
    currentPanelConfig: null,
    currentPanelElements: {
      criteriaSets: [],
      decisiveCriteriaSets: []
    },
    panelHistory: [],
    revertSort: false,
    selectedListRow: null
  },

  getters,
  mutations,
  actions
}
