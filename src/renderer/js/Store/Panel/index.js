import PanelConfig from '../../Panel/PanelConfig'
import CriteriaSet from '../../Criterion/CriteriaSet'

import getters from './getters'
import mutations from './mutations'
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
