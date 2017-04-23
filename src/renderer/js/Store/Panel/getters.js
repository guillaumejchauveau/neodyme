import settings from '../Settings'

export default {

  getNextPanelConfigCriterionType: state => panelConfigType => {
    const panelConfigTypeIndex = settings.state.criterion.types.indexOf(panelConfigType)
    const panelConfigFlowLevel = settings.state.panel.panelFlow.indexOf(panelConfigTypeIndex)
    return settings.state.criterion.types[settings.state.panel.panelFlow[panelConfigFlowLevel +1]]
  },

  getLastPanelConfig: state => state.panelHistory[state.panelHistory.length - 1],

  isHistoryEmpty: state => state.panelHistory.length == 0,

  //getCurrentPanelConfigCriterionType: state => state.currentPanelConfig.criterionType,

  //getCurrentPanelConfig: state => state.currentPanelConfig,
}
