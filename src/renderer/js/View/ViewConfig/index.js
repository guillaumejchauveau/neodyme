const ViewFlow = require('./ViewFlow')
const ViewHistory = require('./ViewHistory')

class ViewConfig {
  constructor (criteriaSet, criteriaType) {
    this.criteriaSet = criteriaSet
    this.criteriaType = criteriaType
  }

  nextViewConfig (selectedCriteria) {
    this.criteriaSet = this.criteriaSet // (this.criteriaSet + selectedCriteria) of type = 'new_criteriaType'
    this.criteriaType = ViewFlow.getNextState(this.criteriaType)

  }

  previousViewConfig () {
    this.criteriaSet = ViewHistory.getLastViewConfig().criteriaSet
    this.criteriaType = ViewHistory.getLastViewConfig().criteriaType

  }
}

module.exports = ViewConfig
