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
    /**
     * La configuration courante du panel.
     * @type {PanelConfig}
     */
    currentPanelConfig: null,
    /**
     * Les element courants du panel.
     * @type {Object}
     */
    currentPanelElements: {
      /**
       * Les ensembles de criteres courants du panel.
       * @type {Array<CriteriaSet>}
       */
      criteriaSets: [],
      /**
       * Les ensembles de criteres determinants courants du panel.
       * @type {Array<DecisiveCriteriaSet>}
       */
      decisiveCriteriaSets: []
    },

    /**
     * L'historique des configuration du panel.
     * @type {Array<PanelConfig>}
     */
    panelHistory: [],
    /**
     * Inversion du tri.
     * @type {Boolean}
     */
    revertSort: false,
    /**
     * Le titre selectionne dans la liste du panel.
     * @type {DecisiveCriteriaSet}
     */
    selectedListRow: null
  },

  getters,
  mutations,
  actions
}
