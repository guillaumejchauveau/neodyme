/**
 * @file Module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

 /**
 * Classe PanelConfig.
 * @type {PanelConfig}
 */
 import PanelConfig from '../../Panel/PanelConfig'
 /**
  * Classe CriteriaSet.
  * @type {CriteriaSet}
  */
 import CriteriaSet from '../../Criterion/CriteriaSet'

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

module.exports = {
  namespaced: true,
  state: {
    currentPanelConfig: null,
    panelHistory: [],
    currentPanelElements: null,
  },

  getters,
  mutations,
  actions
}
