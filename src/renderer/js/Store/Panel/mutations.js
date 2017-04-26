/**
 * @file Mutations du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
* Classe PanelConfig.
* @type {PanelConfig}
*/
import PanelConfig from '../../Panel/PanelConfig'

export default {

  /**
   * Set un PanelConfig.
   * @param {PanelConfig} panelConfig - Le PanelConfig.
   */
  SET_PANELCONFIG (state, panelConfig) {
    state.currentPanelConfig = panelConfig
  },

  /**
   * Set les elements du panel.
   * @param {Array} criteriaSets - Les criteriaSets.
   */
  SET_CURRENTPANEL_CRITERIASETS (state, criteriaSets) {
    state.currentPanelElements.criteriaSets = criteriaSets
  },

  /**
   * Set les elements du panel.
   * @param {Array} criteriaSets - Les criteriaSets.
   */
  SET_CURRENTPANEL_DECISIVECRITERIASETS (state, decisiveCriteriaSets) {
    state.currentPanelElements.decisiveCriteriaSets = decisiveCriteriaSets
  },

  /**
   * Ajoute une PanelConfig a l'historique.
   * @param {PanelConfig} panelConfig - La PanelConfig a ajouter.
   */
  ADD_PANELHISTORY_ENTRY (state, panelConfig) {
    state.panelHistory.push(panelConfig)
  },

  /**
   * Retire la derniere entree de l'historique.
   */
  REMOVE_LAST_PANELHISTORY_ENTRY (state) {
    state.panelHistory.pop()
  },

  REMOVE_ALL_PANELHISTORY_ENTRY_BY_INDEX (state, index) {
    for (let panelConfigIndex = state.panelHistory.length ; panelConfigIndex >= index ; panelConfigIndex--) {
      state.panelHistory.pop()
    }
  },

  /**
   * Vide l'historique.
   */
  CLEAR_PANELHISTORY (state) {
    state.panelHistory = []
  }
}
