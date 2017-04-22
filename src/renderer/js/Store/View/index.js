import ViewConfig from '../../View/ViewConfig'
import CriteriaSet from '../../Criterion/CriteriaSet'

module.exports = {
  namespaced: true,
  state: {
    currentViewConfig: new ViewConfig(new CriteriaSet(), 'artist'),
    viewHistory: [],
    viewPresets: {
      allAlbums: new ViewConfig(new CriteriaSet(), 'album'),
      allArtists: new ViewConfig(new CriteriaSet(), 'artist'),
      allTitles: new ViewConfig(new CriteriaSet(), 'title'),
    },
    currentViewElements: null
  },
  mutation: {
    ADD_VIEWHISTORY_ENTRY (state, viewConfig) {
      state.ViewHistory.push(viewConfig)
    },

    CLEAR_VIEWHISTORY (state) {
      state.ViewHistory = []
    },

    REMOVE_LAST_VIEWHISTORY_ENTRY (state) {
      state.viewHistory.pop()
    },

    SET_VIEWCONFIG (state, viewConfig) {
      state.currentViewConfig = viewConfig
    },

    SET_CURRENTVIEWELEMENTS (state, elements) {
      state.currentViewElements = elements
    }

  },


  actions: {
    setNextViewConfig (context, newCriterion) {
      const viewConfigTypeIndex = context.state.criterion.types.indexOf(viewConfigType)
      const viewConfigFlowLevel = context.state.view.viewFlow.indexOf(viewConfigTypeIndex)
      const newViewConfig = {
        criteriaSet:  context.state.currentViewConfig.criteriaSet.add(newCriterion),
        criterionType: context.state.criterion.types[state.view.viewFlow[viewConfigFlowLevel +1]]
      }
      context.commit('ADD_VIEWHISTORY_ENTRY', context.state.currentViewConfig)
      context.commit('SET_VIEWCONFIG', newViewConfig)
    },

    setPreviousViewConfig (context) {
      context.commit('SET_VIEWCONFIG', context.getLastViewConfig())
      context.commit('REMOVE_LAST_VIEWHISTORY_ENTRY')
    },

    setCustomView (context, newViewConfig) {
      context.commit('CLEAR_VIEWHISTORY')
      context.commit('SET_VIEWCONFIG', newViewConfig)
    },

    loadCurrentViewElements (context) {
      context.currentViewConfig
              .criteriaSet
              .resolveCriteriaByType(context.currentViewConfig.criterionType)
              .then(criteriaSets => {
                context.commit('SET_CURRENTVIEWELEMENTS', criteriaSets)
                console.log(context.currentViewElements)
              })
              .catch(reason => {
                throw new Error(reason)
              })
    }


  },


  getters: {

    getNextViewConfigCriterionType: (state, viewConfigType) => {
      const viewConfigTypeIndex = state.criterion.types.indexOf(viewConfigType)
      const viewConfigFlowLevel = state.view.viewFlow.indexOf(viewConfigTypeIndex)

      return state.criterion.types[state.view.viewFlow[viewConfigFlowLevel +1]]
    },

    getLastViewConfig: state => state.viewHistory[state.viewHistory.length - 1],

    isHistoryEmpty: state => state.viewHistory.length == 0,

    viewDisplayType: state => {
      if (state.currentViewConfig.criterionType == 'title') {
        return 'list'
      } else {
        return 'items'
      }
    },

    getCurrentViewConfigCriterionType: state => state.currentViewConfig.criterionType,

    getCurrentViewConfig: state => state.currentViewConfig
  }


}
