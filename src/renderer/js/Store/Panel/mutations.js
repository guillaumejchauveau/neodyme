import PanelConfig from '../../Panel/PanelConfig'

export default {
  SET_PANELCONFIG (state, panelConfig) {
    state.currentPanelConfig = panelConfig
  },

  SET_CURRENTPANELELEMENTS (state, elements) {
    state.currentPanelElements = elements
  },

  SET_CURRENTLIST (state, elements) {
    state.currentList = elements
  },

  ADD_PANELHISTORY_ENTRY (state, panelConfig) {
    state.panelHistory.push(panelConfig)
  },

  REMOVE_LAST_PANELHISTORY_ENTRY (state) {
    state.panelHistory.pop()
  },

  CLEAR_PANELHISTORY (state) {
    state.PanelHistory = []
  }
}
