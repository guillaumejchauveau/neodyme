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
<<<<<<< HEAD
   * @param {{decisiveCriteriaSets: Array<DecisiveCriteriaSet>, criteriaSets: Array<CriteriaSet>}} elements - Les elements du panel.
   */
  SET_CURRENTPANELELEMENTS (state, elements) {
    if (elements.decisiveCriteriaSets !== undefined) {
      state.currentPanelElements.decisiveCriteriaSets = elements.decisiveCriteriaSets
    }
    if (elements.criteriaSets !== undefined) {
      state.currentPanelElements.criteriaSets = elements.criteriaSets
    }
=======
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
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  },


  /**
   * Ajoute une PanelConfig a l'historique.
   * @param {PanelConfig} panelConfig - La PanelConfig a ajouter.
   */
  ADD_PANELHISTORY_ENTRY (state, panelConfig) {
    state.panelHistory.push(panelConfig)
  },

  /**
   * Efface toutes les dernieres entrees de l'historique jusqu'a un certain index.
   * @param {Number} index - index.
   */
  REMOVE_LASTS_PANELHISTORYENTRIES_TO_INDEX (state, index) {
    for (let panelConfigIndex = state.panelHistory.length ; panelConfigIndex >= index ; panelConfigIndex--) {
      state.panelHistory.pop()
    }
  },

  REMOVE_ALL_PANELHISTORY_ENTRY_BY_INDEX (state, index) {
    for (let panelConfigIndex = state.panelHistory.length ; panelConfigIndex >= index ; panelConfigIndex--) {
      state.panelHistory.pop()
    }
  },

  /**
   * Efface l'historique.
   */
  CLEAR_PANELHISTORY (state) {
    state.panelHistory = []
<<<<<<< HEAD
  },

  /**
   * Set la valeur du type de critere de tri sur la configuration courante;
   * @param {String} newActiveSortCriterionType - Le nouveau type de critere de tri.
   */
  SET_CURRENT_PANELCONFIG_ACTIVESORTCRITERIONTYPE (state, newActiveSortCriterionType) {
    state.currentPanelConfig.activeSortCriterionType = newActiveSortCriterionType
  },

  /**
   * Active ou desactive l'inversion du tri
   */
  TOGGLE_SORT_REVERT (state) {
    state.revertSort = !state.revertSort
  },

  SET_SELECTEDLISTROW (state, element) {
    state.selectedListRow = element
=======
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  }
}
