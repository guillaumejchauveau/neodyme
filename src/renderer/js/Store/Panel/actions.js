import PanelConfig from '../../Panel/PanelConfig'
import CriteriaSet from '../../Criterion/CriteriaSet'

import settings from '../Settings'

export default {
  setNextPanelConfig (context, newCriterion) {
    const currentPanelConfig = context.state.currentPanelConfig

    const newCriteriaSet = new CriteriaSet()
    const nextCriterionType = context.getters.getNextPanelConfigCriterionType(currentPanelConfig.criterionType)

    Object.assign(newCriteriaSet.criteria, currentPanelConfig.criteriaSet.criteria)
    newCriteriaSet.add(newCriterion)
    const newPanelConfig = new PanelConfig(newCriteriaSet, nextCriterionType)
    context.commit('ADD_PANELHISTORY_ENTRY', currentPanelConfig)
    context.commit('SET_PANELCONFIG', newPanelConfig)
  },

  setPreviousPanelConfig (context) {
    context.commit('SET_PANELCONFIG', context.getters.getLastPanelConfig)
    context.commit('REMOVE_LAST_PANELHISTORY_ENTRY')
  },

  setCustomPanel (context, newPanelConfig) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', newPanelConfig)
  },

  setPanelPreset (context, preset) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', settings.state.panel.panelPresets[preset])
  },

  loadCurrentPanelElements (context) {
    context.state.currentPanelConfig
                  .criteriaSet
                  .resolveCriteriaByType(context.state.currentPanelConfig.criterionType)
                  .then(criteriaSets => {
                    context.commit('SET_CURRENTPANELELEMENTS', criteriaSets)
                  })
                  .catch(reason => {
                    throw new Error(reason)
                  })

  },
}
