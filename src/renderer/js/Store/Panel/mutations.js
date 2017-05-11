/**
 * @file Mutations du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

export default {

  /**
   * Set la configuration courante du panel.
   * @param {PanelConfig} panelConfig - La nouvelle configuration.
   */
  SET_PANELCONFIG (state, panelConfig) {
    state.currentPanelConfig = panelConfig
  },

  /**
   * Set les elements du panel.
   * @param {{decisiveCriteriaSets: Array<DecisiveCriteriaSet>, criteriaSets: Array<CriteriaSet>}} elements - Les
   *   elements du panel.
   */
  SET_CURRENTPANELELEMENTS (state, elements) {
    // Set les ensembles de criteres determinants du panel.
    if (elements.decisiveCriteriaSets) {
      state.currentPanelElements.decisiveCriteriaSets = elements.decisiveCriteriaSets
    }
    // Set les ensembles de criteres du panel.
    if (elements.criteriaSets) {
      state.currentPanelElements.criteriaSets = elements.criteriaSets
    }
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
    // Parcours l'historique a l'envers jusqu'a l'index.
    for (let panelConfigIndex = state.panelHistory.length; panelConfigIndex >= index; panelConfigIndex--) {
      // Efface l'entree.
      state.panelHistory.pop()
    }
  },

  /**
   * Efface l'historique.
   */
  CLEAR_PANELHISTORY (state) {
    state.panelHistory = []
  },

  /**
   * Set la valeur du type de critere de tri sur la configuration courante.
   * @param {String} newActiveSortCriterionType - Le nouveau type de critere de tri.
   */
  SET_CURRENT_PANELCONFIG_ACTIVESORTCRITERIONTYPE (state, newActiveSortCriterionType) {
    state.currentPanelConfig.activeSortCriterionType = newActiveSortCriterionType
  },

  /**
   * Active ou desactive l'inversion du tri.
   */
  TOGGLE_SORT_REVERT (state) {
    state.revertSort = !state.revertSort
  },

  /**
   * Set le titre selectionne dans la liste.
   * @param {DecisiveCriteriaSet} element - Le titre selectionne.
   */
  SET_SELECTEDLISTROW (state, element) {
    state.selectedListRow = element
  }
}
