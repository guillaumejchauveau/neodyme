const ViewConfig       = require('./ViewConfig')
const ViewHistory      = require('./ViewHistory')
const ViewFlow         = require('./ViewFlow')


const VCS = {

  ActiveVC: new ViewConfig(),

  setNextViewConfig: function (criteria) {
    ViewHistory.addViewConfig(new ViewConfig(VCS.ActiveVC.criteriaSet, VCS.ActiveVC.criteriaType))

    VCS.ActiveVC.criteriaSet += criteria
    VCS.ActiveVC.criteriaType = ViewFlow.getNextState(VCS.ActiveVC.criteriaType)

    return VCS.ActiveVC
  },

  setPreviousViewConfig: function () {
    VCS.ActiveVC.criteriaSet  = ViewHistory.getLastViewConfig().criteriaSet
    VCS.ActiveVC.criteriaType = ViewHistory.getLastViewConfig().criteriaType

    ViewHistory.removeLastViewConfig()

    return VCS.ActiveVC
  },

  setCustomViewConfig: function (viewConfig) {

    VCS.ActiveVC.criteriaSet  = viewConfig.criteriaSet
    VCS.ActiveVC.criteriaType = viewConfig.criteriaType

    return VCS.ActiveVC

  },

  checkEmptyViewHistory: function () {
    return checkEmptyHistory()
  }

}


module.exports = VCS
