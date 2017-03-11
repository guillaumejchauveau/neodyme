
class ViewConfig {
  constructor (criteriaSet, criteriaType) {
    this.criteriaSet  = criteriaSet
    this.criteriaType = criteriaType
  }

  setViewConfig (criteriaSet = this.criteriaSet, criteriaType = this.criteriaType) {
    this.criteriaSet  = criteriaSet
    this.criteriaType = criteriaType
  }
}

module.exports = ViewConfig
